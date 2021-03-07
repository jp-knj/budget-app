export default (state, action) => {
  switch (action.type) {
    case 'REGISTER_USER':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        users: action.payload,
      }

    case 'LOGIN_ERROR':
        return {
          ...state,
          error: action.payload
        }

    default:
      return state;
  }
};
