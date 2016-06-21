export const userRatingAction = (rating, talkId) => {
  return {
    type: 'USER_RATING',
    value: { rating, talkId }
  }
}

const userRating = (state = {}, action) => {
  switch (action.type) {
    case 'USER_RATING':
      return { rating: action.value.rating, talkId: action.value.talkId }
    default:
      return state
  }
}

export default userRating
