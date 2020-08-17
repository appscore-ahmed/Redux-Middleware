
interface Age {
  age: number;
}

const initState: Age = { age: 0 };

type ageActions =
  | { type: 'INCREMENT'; payload: Age }
  | { type: 'DECREMENT'; payload: Age };

const ageReducer = (state = initState, action: ageActions): Age => {
  switch (action.type) {
    case 'INCREMENT':
      console.log('INCREMENT called');
      return {
        ...state,
        age: action.payload.age + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        age: action.payload.age - 1,
      };
    default:
      return state;
  }
};

export default ageReducer;
