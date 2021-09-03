const { Router } = require('express')
const { commandsController } = require('../controllers')

const router = Router()

const { handleCommand } = commandsController

router.post('/', (req, res) => {
  handleCommand(req, res)
})

module.exports = router
