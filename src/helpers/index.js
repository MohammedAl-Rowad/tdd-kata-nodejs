const COMMANDS = Object.freeze(new Set(['F', 'B', 'L', 'R']))

const cehckIfCommandsAreValid = (commands) => {
  for (const c of commands) {
    if (!COMMANDS.has(c)) {
      return false
    }
  }
  return true
}

const DIRECTIONS_MAP = Object.freeze({
  EAST: 'EAST',
  NORTH: 'NORTH',
  SOUTH: 'SOUTH',
  WEST: 'WEST',
})

// a map where the value will tell us how to move x and y
// e.g: EAST: [1, 0] which means if the head is on EAST the robot will move
// in the x axises
const DIRECTIONS = Object.freeze({
  [DIRECTIONS_MAP.EAST]: [1, 0],
  [DIRECTIONS_MAP.NORTH]: [0, 1],
  [DIRECTIONS_MAP.WEST]: [-1, 0],
  [DIRECTIONS_MAP.SOUTH]: [0, -1],
})

const calcDirection = (oldDirection, direction) => {
  const { EAST, NORTH, SOUTH, WEST } = DIRECTIONS_MAP
  if (oldDirection === EAST) {
    if (direction === 'L') {
      return NORTH
    } else {
      return SOUTH
    }
  } else if (oldDirection === NORTH) {
    if (direction === 'L') {
      return WEST
    } else {
      return EAST
    }
  } else if (oldDirection === WEST) {
    if (direction === 'L') {
      return SOUTH
    } else {
      return NORTH
    }
  } else if (oldDirection === SOUTH) {
    if (direction === 'L') {
      return EAST
    } else {
      return WEST
    }
  }
}

module.exports = {
  COMMANDS,
  cehckIfCommandsAreValid,
  DIRECTIONS,
  calcDirection,
  DIRECTIONS_MAP,
}
