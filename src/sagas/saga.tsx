import { delay, takeLatest, put, take } from 'redux-saga/effects';

interface actionable {
  type: string;
  payload: any;
}

/* ageUpAsync must have a action parameter, otherwise it wont work. */
function* ageUpAsync(action: actionable) {
  yield delay(4000);
  yield console.log(action.type);
  yield put({ type: 'INCREMENT_ASYNC', payload: action.payload });
}

export function* watchAgeUp() {
  yield takeLatest('INCREMENT', ageUpAsync); 
/* redux automatically pass type and payload to delegated method
here ageUpAsync will receive them.  */
}
