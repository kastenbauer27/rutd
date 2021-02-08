import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import categorySaga from './category.saga';
import matchSaga from './match.saga'
import acctType from './acctType.saga';
import demographicSaga from './demographic.saga'
import serviceSaga from './service.saga'
import compensationSaga from './compensation.saga'
import maladySaga from './malady.saga'
import emailSaga from './email.saga';
import vetSaga from './vet.saga';
import vetMatchSaga from './vetMatch.saga';
import vetSearchSaga from './vetSearch.saga'
import details from './details.saga';
import resourceDetails from './resourceDetails.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    categorySaga(),
    matchSaga(),
    acctType(),
    demographicSaga(),
    serviceSaga(),
    compensationSaga(),
    maladySaga(),
    vetSaga(),
    vetMatchSaga(),
    vetSearchSaga(),
    details(),
    resourceDetails(),
    emailSaga(),
    details()
  ]);
}
