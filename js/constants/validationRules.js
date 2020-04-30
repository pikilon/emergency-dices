export const VALIDATION_RULES = {
  REQUIRED: value => value.length >= 4 || 'The title has to be over 4 chars',
}