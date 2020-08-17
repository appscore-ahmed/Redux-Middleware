interface Age {
  age: number;
  name: string;
}

const initState: Age = { age: 0, name: '' };

type ageActions =
  | { type: 'INCREMENT'; payload: Age['age'] }
  | { type: 'DECREMENT'; payload: Age['age'] }
  | { type: 'NAME'; payload: Age['name'] };

const ageReducer = (state = initState, action: ageActions): Age => {
  switch (action.type) {
    case 'INCREMENT':
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
    case 'NAME': {
      console.log('NAME called');
      return { ...state, name: action.payload };
    }
    default:
      return state;
  }
};

export default ageReducer;
