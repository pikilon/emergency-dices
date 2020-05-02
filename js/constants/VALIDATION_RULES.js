export const VALIDATION_RULES = {
  REQUIRED: value => !!value.length || 'This field is required',
  MINIMUM_FOUR: value => value.length >= 4 || 'Need to be over 4 chars',
  MAX_FOUR: value => value.length <= 4 || '4 Chars tops',
}