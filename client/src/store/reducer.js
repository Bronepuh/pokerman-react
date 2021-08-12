import { ActionType } from './action';
import { AuthorizationStatus } from '../const';

const initialState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  id: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION: {
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    }
    case ActionType.LOGOUT: {
      console.log('logout');
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer };
