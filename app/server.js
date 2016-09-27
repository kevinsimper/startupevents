import express from 'express'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import Layout from './components/Layout'
import renderStatic from './renderStatic'
import bodyParser from 'body-parser'
import Helmet from 'react-helmet'
import cookieParser from 'cookie-parser'
import Sequelize from 'sequelize'

let connectionString = process.env.POSTGRES || 'postgres://postgres:password@db:5432/postgres'
let database = new Sequelize(connectionString, {
  native: true
})
database.authenticate().catch(() => {
  console.log('Could not connect to database!')
})
let production = process.env.NODE_ENV === 'production'
if(!production) {
  database.sync().then(() => {
    console.log('done sync')
  })
}

let router = express.Router()
router.use(bodyParser.json())
router.use(cookieParser(process.env.COOKIE_SECRET))

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
