import { delay, takeLatest, put, take } from 'redux-saga/effects';
import { actionTypes } from '../store/actiontypes/actiontypes';
import { fetchRandomUsers } from '../store/actions/actions';

interface actionable {
  type: string;
  payload: any;
}

/* ageUpAsync must have a action parameter, otherwise it wont work. */
function* ageUpAsync(action: actionable) {
  yield delay(4000);
  yield console.log(action.type);
  yield put({ type: actionTypes.INCREMENT_ASYNC, payload: action.payload });
}

/* redux automatically pass type and payload to delegated method
here ageUpAsync will receive them.  */
export function* watchAgeUp() {
  yield takeLatest(actionTypes.INCREMENT, ageUpAsync);
}

