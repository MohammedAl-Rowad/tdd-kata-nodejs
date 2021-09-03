const express = require('express')
const { json, urlencoded } = require('body-parser')
const app = express()
const { commandsRoutes } = require('./routes')

app.use(urlencoded({ extended: true }))
app.use(json())
app.use('/commands', commandsRoutes)

module.exports = app
