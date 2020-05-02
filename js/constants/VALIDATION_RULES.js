export const VALIDATION_RULES = {
  REQUIRED: value => !value || 'This field is required',
  REQUIRED: value => value.length >= 4 || 'Need to be over 4 chars',
  MINIMUM_FOUR: value => value.length >= 4 || 'Need to be over 4 chars',
  MAX_FOUR: value => value.length <= 4 || '4 Chars tops',
}