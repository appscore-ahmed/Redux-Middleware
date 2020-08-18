import results from '../../type/AgeType';

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
  // | { type: 'INCREMENT'; payload: Age['age'] }
  | { type: 'INCREMENT_ASYNC'; payload: Age['age'] }
  | { type: 'DECREMENT'; payload: Age['age'] }
  // | { type: 'NAME'; payload: Age['name'] }
  | { type: 'FETCH_RANDOM_USERS'; payload: Age['random'] };

const ageReducer = (state = initState, action: ageActions): Age => {
  switch (action.type) {
    case 'INCREMENT_ASYNC':
      console.log('INCREMENT called');
      return {
        ...state,
        age: state.age + action.payload,
      };
    case 'DECREMENT':
      return {
        ...state,
        age: state.age - action.payload,
      };
    // case 'NAME': {
    //   console.log('NAME called');
    //   return { ...state, name: action.payload };
    // }
    case 'FETCH_RANDOM_USERS': {
      return { ...state, random: action.payload };
    }
    default:
      return state;
  }
};

export default ageReducer;
