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

let connectionString = process.env.POSTGRES || 'postgres://postgres:password@db:5432/postgres'
let database = new Sequelize(connectionString, {
  native: true
})


database.authenticate().catch(() => {
  console.log('Could not connect to database!')
})
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
  Event.all()
  .then((events) => {
    output(req, res, {
      events: events
    })
  })
  .catch((e) => {
    console.log(e)
    res.send('Something went wrong!')
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
