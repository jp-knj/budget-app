export default (state, action) => {
  switch (action.type) {
    case 'REGISTER_USER':
    case 'LOGIN_USER':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        users: action.payload,
      }
    default:
      return state;
  }
};
