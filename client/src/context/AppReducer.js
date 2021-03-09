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
    case 'UPDATE_USER':
      const { success, user } = action.payload;
      return {
        ...state,
        users: { success, user },
      }
    case 'LOAD_USER':
      const token = localStorage.getItem('token');
      return {
        ...state,
        token,
        loading: false,
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
    case 'GET_TRANSACTIONS':
      return {
        ...state,
        loading: false,
        transactions: action.payload,
      }
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case 'UPDATE_TRANSACTION':
      const { _id, amount, text, date } = action.payload;
      state.transactions.forEach(transaction => {
        if (transaction._id === _id) {
          transaction.amount = amount;
          transaction.text = text;
          transaction.date = date;
        }
      });
      return {
        ...state,
        transactions: [...state.transactions],
      };
    case 'RESET_TRANSACTION':
      return {
        ...state,
        loading: true,
        transactions: []
      };
    case 'TRANSACTION_ERROR':
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
};
