import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// GETs all matches for certain vet from match table
function* getCompleteMatch(action) {
  console.log("Fetch veteran matches is working");
  try {
    const response = yield axios.get(`/api/match/complete/${action.payload}`);
    const allMatches = response.data;
    const incompleteMatches = allMatches.filter(findIncompleteMatch);
    yield put({ type: "SET_VET_MATCHES", payload: allMatches });
    yield put({ type: "SET_INCOMPLETE_MATCHES", payload: incompleteMatches });
    console.log("response.data from db get complete vet matches:", allMatches);
  } catch (error) {
    console.log("error with completed vet matches fetch request", error);
  }
}

function findIncompleteMatch(match) {
  return match.approved === null;
}

// GETs all matches for certain vet, not from match table using algorithm
function* getNewMatches(action) {
  try {
    const response = yield axios.get(`/api/match/newMatches/${action.payload.id}`);
    const newMatches = response.data;
    yield put({ type: "SET_VET_MATCHES", payload: newMatches });
  } catch (error) {
    console.log("error with all vet matches fetch request", error);
  }
}

function* postNewMatch(action) {
  try {
    console.log('postNewMatch action.payload', action.payload)
    const response = yield axios.post('/api/match/postnew', action.payload)
    console.log('postNewMatch response.data', response.data)
    yield put({type: "SET_NEW_MATCH", payload: response.data})
  }
  catch(error) {
    console.log('Error in postNewMatch saga error: ', error)
}
}

function* vetMatchSaga() {
  yield takeLatest("FETCH_COMPLETE_MATCH", getCompleteMatch);
  yield takeLatest("FETCH_ALL_MATCHES", getNewMatches);
  yield takeLatest("POST_NEW_MATCH", postNewMatch);
}

export default vetMatchSaga;
