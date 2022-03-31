import { fork } from 'redux-saga/effects';
import watchUserAuthentication from '../ducks/auth/sagas';
import watchUsers from '../ducks/users/sagas';
import watchGroups from '../ducks/groups/sagas';
import watchEnterprise from '../ducks/enterprise/sagas';
import watchGenerics from '../ducks/generics/sagas';
import watchBusinessGroup from '../ducks/businessGroup/sagas';

export default function* startForman() {
	yield fork(watchUserAuthentication);
	yield fork(watchUsers);
	yield fork(watchGroups);
	yield fork(watchEnterprise);
	yield fork(watchGenerics);
	yield fork(watchBusinessGroup);
}
