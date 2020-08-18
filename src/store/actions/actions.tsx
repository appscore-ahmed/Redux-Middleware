import { actionTypes } from '../actiontypes/actiontypes';

export const ageUpAsync = (value: number) => {
  console.log('ageUpAsync');
  return { type: actionTypes.INCREMENT, payload: value };
};

export const ageUp = (value: number) => {
  return (dispatch: any) => {
    setTimeout(() => {
      dispatch(ageUpAsync(value));
    }, 1000);
  };
};

export const ageDown = (value: number) => {
  return { type: actionTypes.DECREMENT, payload: value };
};

export const fetchRandomUsers = () => {
  //for thunk
  const page = 1;
  return (dispatch: any) => {
    fetch(`https://randomuser.me/api/?results=10&page=${page}`)
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch({
          type: actionTypes.FETCH_RANDOM_USERS,
          payload: responseJson.results,
        });
      })
      .catch((error) => {
        console.log('Error selecting random data: ' + error);
      });
  };
};
