/**
 * @typedef { import('express').Request } ExprRequest
 * @typedef { import('express').Response } ExprResponse
 */

const {
  cehckIfCommandsAreValid,
  DIRECTIONS,
  calcDirection,
} = require('../helpers')

/**
 *
 * @param {ExprRequest} req
 * @param {ExprResponse} res
 */
const handleCommand = (req, res) => {
  const { commands, x, y, direction, obstacles } = req.body

  if (!commands || !x || !y || !direction) {
    res.sendStatus(400)
  } else if (!cehckIfCommandsAreValid(commands)) {
    res.sendStatus(400)
  } else {
    let resX = x
    let resY = y
    let resDir = direction
    let obstaclesMap = {}
    if (obstacles && obstacles.length) {
      obstaclesMap = obstacles.reduce(
        (prev, [oX, oY]) => ({ ...prev, [`${oX}:${oY}`]: true }),
        {}
      )
    }

    for (const c of commands) {
      if (c === 'F' || c === 'B') {
        const [toX, toY] = DIRECTIONS[resDir]
        resX += c === 'B' ? -1 * toX : toX
        resY += c === 'B' ? -1 * toY : toY
        const key = `${resX}:${resY}`
        if (key in obstaclesMap) {
          resX -= c === 'B' ? -1 * toX : toX
          resY -= c === 'B' ? -1 * toY : toY
          res.send({ x: resX, y: resY, direction: resDir, status: 'STOPPED' })
        }
      } else {
        resDir = calcDirection(resDir)(c)
      }
    }
    res.send({ x: resX, y: resY, direction: resDir })
  }
}

module.exports = { handleCommand }
