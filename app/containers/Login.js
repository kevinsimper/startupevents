import React, { Component } from 'react'
import { connect } from 'react-redux'
import { post } from 'axios'

class Login extends Component {
  componentDidMount() {
    const { appId } = this.props
    window.fbAsyncInit = function() {
       FB.init({
         appId      : appId,
         xfbml      : true,
         version    : 'v2.7'
       });
     };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
  getLoginStatus(res) {
    if(res.status === 'connected') {
      this.testApi(res)
    } else if (res.status === 'not_authorized') {

    } else {

    }
  }
  testApi(res) {
    post('/checklogin', {
      accessToken: res.authResponse.accessToken
    }).then((res) => {
      if(res.data.status === 'success') {
        window.location = '/admin'
      }
    })
  }
  onClickLogin() {
    FB.login(this.getLoginStatus.bind(this), {scope: 'email'})
  }
  render() {
    return (
      <div>
        <h1>Login</h1>
        <button onClick={this.onClickLogin.bind(this)}>Login with Facebook</button>
      </div>
    )
  }
}

function mapState(state) {
  return {
    appId: state.appId
  }
}

export default connect(mapState)(Login)
