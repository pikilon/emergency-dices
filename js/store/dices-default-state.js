import {SIDES_TYPES} from '../constants/index.js'

export default {
  'six-sided': {
    title: 'Six sided',
    sides: [
      {content: 1, type: SIDES_TYPES.NUMBER},
      {content: 2, type: SIDES_TYPES.NUMBER},
      {content: 3, type: SIDES_TYPES.NUMBER},
      {content: 4, type: SIDES_TYPES.NUMBER},
      {content: 5, type: SIDES_TYPES.NUMBER},
      {content: 6, type: SIDES_TYPES.NUMBER},
    ]
  },
  'king-of-tokyo': {
    title: 'King of Tokyo',
    sides: [
      {content: 1, type: SIDES_TYPES.NUMBER},
      {content: 2, type: SIDES_TYPES.NUMBER},
      {content: 3, type: SIDES_TYPES.NUMBER},
      {content: '💗', type: SIDES_TYPES.STRING},
      {content: '💥', type: SIDES_TYPES.STRING},
      {content: '💲', type: SIDES_TYPES.STRING},
    ]
  }
}