const express = require('express')
const { json, urlencoded } = require('body-parser')
const app = express()

app.use(urlencoded({ extended: true }))
app.use(json())

module.exports = app
