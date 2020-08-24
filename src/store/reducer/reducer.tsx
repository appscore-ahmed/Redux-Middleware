import results from '../../type/AgeType';
import { actionTypes } from '../actiontypes/actiontypes';

interface Age {
  age: number;
  // name: string;
  random: results[];
  sign_status: boolean;
}

const initState: Age = {
  age: 0,
  // name: '',
  random: new Array<results>(),
  sign_status: false,
};

type ageActions =
  // | { type: actionTypes.INCREMENT/* 'INCREMENT' */; payload: Age['age'] }
  | { type: actionTypes.INCREMENT_ASYNC; payload: Age['age'] }
  | { type: actionTypes.DECREMENT; payload: Age['age'] }
  // | { type: actionTypes.NAME; payload: Age['name'] }
  | { type: actionTypes.FETCH_RANDOM_USERS; payload: Age['random'] }
  | { type: actionTypes.SIGN_IN; payload: Age['sign_status'] };

const ageReducer = (state = initState, action: ageActions): Age => {
  switch (action.type) {
    case actionTypes.INCREMENT_ASYNC:
      console.log('INCREMENT called');
      return {
        ...state,
        age: state.age + action.payload,
      };
    case actionTypes.DECREMENT:
      return {
        ...state,
        age: state.age - action.payload,
      };
    // case actionTypes.NAME: {
    //   console.log('NAME called');
    //   return { ...state, name: action.payload };
    // }
    case actionTypes.FETCH_RANDOM_USERS: {
      return { ...state, random: action.payload };
    }
    case actionTypes.SIGN_IN: {
      return { ...state, sign_status: action.payload ? true : false };
    }
    default:
      return state;
  }
};

export default ageReducer;
