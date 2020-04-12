import {SIDES_TYPES} from '../constants/index.js'

export default {
  'six-sided': {
    title: 'Six sided',
    sides: [
      {content: '1-6', type: SIDES_TYPES.NUMBER_INTERVAL},
    ]
  },
  'king-of-tokyo': {
    title: 'King of Tokyo',
    sides: [
      {content: '1-3', type: SIDES_TYPES.NUMBER_INTERVAL},
      {content: '💗💥💲', type: SIDES_TYPES.SYMBOL},
    ]
  },
  'alphabet': {
    title: 'Alphabet',
    sides: [
      {content: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', type: SIDES_TYPES.SYMBOL},
    ]
  },
  'vocals': {
    title: 'Vocals',
    sides: [
      {content: 'AEIOU', type: SIDES_TYPES.SYMBOL},
    ]
  },
  'consonants': {
    title: 'Consonants',
    sides: [
      {content: 'BCDFGHJKLMNPQRSTVWXYZ', type: SIDES_TYPES.SYMBOL},
    ]
  },
}