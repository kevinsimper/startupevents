import express from 'express'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import Layout from './components/Layout'
import renderStatic from './renderStatic'
import bodyParser from 'body-parser'
import Helmet from 'react-helmet'
import cookieParser from 'cookie-parser'
import Sequelize from 'sequelize'
import { get } from 'axios'
import EventModel from './Models/Event'
import UserModel from './Models/User'
import moment from 'moment'
import axios from 'axios'
import Promise from 'bluebird'

let connectionString = process.env.POSTGRES || 'postgres://postgres:password@db:5432/postgres'
let database = new Sequelize(connectionString, {
  native: true
})


database.authenticate().catch(() => {
  console.log('Could not connect to database!')
})
let User = database.define(UserModel.name, UserModel.props)
let Event = database.define(EventModel.name, EventModel.props)
let production = process.env.NODE_ENV === 'production'
if(!production) {
  database.sync().then(() => {
    console.log('done sync')
  })
}

let router = express.Router()
router.use(bodyParser.json())
router.use(cookieParser(process.env.COOKIE_SECRET))

router.get('/api/import', (req, res) => {
  get('https://clients6.google.com/calendar/v3/calendars/startupdigest.com_p61vqdc6m1nvsaertntq2ehp5g@group.calendar.google.com/events?calendarId=startupdigest.com_p61vqdc6m1nvsaertntq2ehp5g%40group.calendar.google.com&singleEvents=true&timeZone=Europe%2FCopenhagen&maxAttendees=1&maxResults=250&sanitizeHtml=true&timeMin=2016-08-29T00%3A00%3A00%2B02%3A00&timeMax=2016-11-03T00%3A00%3A00%2B02%3A00&key=AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs')
  .then((_res) => {
    let allEvents = _res.data.items.map((item) => {
      return Event.findOne({
        where: {
          externalId: item.id
        }
      }).then((event) => {
        if(!event) {
          return Event.create({
            title: item.summary,
            description: item.description,
            type: 'startupdigest',
            externalId: item.id,
            start: item.start.dateTime,
            end: item.end.dateTime,
            location: item.location
          })
        }
      })
    })

    return Promise.all(allEvents).then(() => {
      res.send('ok')
    })
  })
  .catch((e) => {
    console.log(e)
    res.send('Something went wrong!')
  })
})

router.get('/', (req, res) => {
  let today = moment().add(2, 'hours')
  let end = today.clone().add(7, 'days')
  database.query(`SELECT * FROM EVENTS WHERE start BETWEEN '${today.format('YYYY-MM-DD')}'::DATE AND '${end.format('YYYY-MM-DD')}'::DATE ORDER BY start ASC`)
  .then((results) => {
    output(req, res, {
      events: results[0],
      start: today
    })
  })
  .catch((e) => {
    console.log(e)
    res.send('Something went wrong!')
  })
})

router.get('/date/:year/:month/:day', (req, res) => {
  const { year, month, day } = req.params
  let start = moment(`${year}-${month}-${day}`)
  let end = start.clone().add(7, 'days')
  database.query(`SELECT * FROM EVENTS WHERE start BETWEEN '${start.format('YYYY-MM-DD')}'::DATE AND '${end.format('YYYY-MM-DD')}'::DATE ORDER BY start ASC`)
  .then((results) => {
    output(req, res, {
      events: results[0],
      start: start
    })
  })
  .catch((e) => {
    console.log(e)
    res.send('Something went wrong!')
  })
})

router.get('/login', (req, res) => {
  output(req, res, {
    appId: process.env.FACEBOOK_ACCESS.split('|')[0]
  })
})

router.post('/checklogin', (req, res) => {
  let { accessToken } = req.body
  let appId = process.env.FACEBOOK_ACCESS.split('|')[0]
  let checkToken = `https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${process.env.FACEBOOK_ACCESS}`
  let checkRes = axios.get(checkToken).then((response) => {
    const { is_valid, app_id } = response.data.data
    if(is_valid && app_id === appId) {
      return response
    } else {
      throw new Error('Not a correct Access token!')
    }
  })

  let userProfle = checkRes.then((response) => {
    const { user_id } = response.data.data
    res.cookie('user_id', user_id, { httpOnly: true, signed: true })
    res.cookie('fb_token', accessToken, { httpOnly: true, signed: true })
    return axios.get(`https://graph.facebook.com/${user_id}?access_token=${process.env.FACEBOOK_ACCESS}&fields=name,email`).then((res) => {
      return res.data
    })
  })

  Promise.all([checkRes, userProfle]).spread((response, userProfle) => {
    const { user_id } = response.data.data

    return User.findOne({
      where: { facebookId: user_id }
    }).then((user) => {
      if(!user) {
        return User.create({
          email: userProfle.email,
          facebookId: user_id
        })
      }
    })
  }).then(() => {
    res.send({
      status: 'success'
    })
  })
})

function checkAdmin(req, res, next) {
  const { user_id } = req.signedCookies
  User.findOne({
    where: { facebookId: user_id }
  }).then((user) => {
    if(!user) {
      return res.sendStatus(500)
    }
    if(user.admin) {
      next()
    } else {
      res.sendStatus(401)
    }
  })
}

router.get('/admin', checkAdmin, (req, res) => {
  let today = moment().add(2, 'hours')
  let end = today.clone().add(7, 'days')
  database.query(`SELECT * FROM EVENTS WHERE start BETWEEN '${today.format('YYYY-MM-DD')}'::DATE AND '${end.format('YYYY-MM-DD')}'::DATE ORDER BY start ASC`).then((results) => {

    output(req, res, {
      events: results[0]
    })
  })
})

router.get('/admin/events/:id', checkAdmin, (req, res) => {
  const { id } = req.params
  Event.findById(id).then((event) => {
    output(req, res, {
      event
    })
  })
})


router.get('*', (req, res) => {
  output(req, res, {})
})

let defaultState = {}
function output(req, res, state) {
  state = Object.assign({}, defaultState, state)
  renderStatic(req, res, state, (output, initialState) => {
    let head = Helmet.rewind();
    let html = (
      <Layout assets={global.assets} title={head.title}>
        <div dangerouslySetInnerHTML={{__html: output}} />
        <script dangerouslySetInnerHTML={{__html: `window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}`}}>
        </script>
      </Layout>
    )
    let fullOutput = renderToStaticMarkup(html)
    res.send(fullOutput)
  })
}

export default router
