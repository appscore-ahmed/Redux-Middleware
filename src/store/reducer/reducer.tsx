import results from '../../type/AgeType';
import { actionTypes } from '../actiontypes/actiontypes';

interface Age {
  age: number;
  // name: string;
  random: results[];
}

const initRandom = () => {
  return {
    gender: '',
    name: {
      title: '',
      first: '',
      last: '',
    },
    location: { street: { number: 0, name: '' } },
    email: '',
    picture: { large: '', medium: '', thumbnail: '' },
  };
};

const initState: Age = {
  age: 0,
  // name: '',
  random: new Array<results>(),
};

type ageActions =
  // | { type: actionTypes.INCREMENT/* 'INCREMENT' */; payload: Age['age'] }
  | { type: actionTypes.INCREMENT_ASYNC; payload: Age['age'] }
  | { type: actionTypes.DECREMENT; payload: Age['age'] }
  // | { type: actionTypes.NAME; payload: Age['name'] }
  | { type: actionTypes.FETCH_RANDOM_USERS; payload: Age['random'] };

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
    default:
      return state;
  }
};

export default ageReducer;
