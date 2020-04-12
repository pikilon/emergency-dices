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
      {content: '💗', type: SIDES_TYPES.STRING},
      {content: '💥', type: SIDES_TYPES.STRING},
      {content: '💲', type: SIDES_TYPES.STRING},
    ]
  }
}