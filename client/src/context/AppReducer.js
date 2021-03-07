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
    case 'LOGOUT_USER':
      localStorage.removeItem("token");
      window.location = '/login';
      return {
        ...state,
        token: null,
        users: null,
        loading: false,
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
