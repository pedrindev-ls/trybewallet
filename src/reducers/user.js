import { addEmailVariable } from '../actions';

const initialState = {
  email: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case addEmailVariable: {
    return {
      ...state,
      email: action.email,
    };
  }
  default:
    return state;
  }
};

export default user;
