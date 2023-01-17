import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as providers from '../../../api/appApi/provider';
import { navigate } from '../../../lib/utils/navigation';
import { notificationActions } from '../notification';
import * as actions from './actions';
import { apiActions, apiSelectors } from '../api';
import * as types from './types';

export function* getListProvider(payload) {
	yield put(apiActions.apiStart());

	let query = '?status=true';

	if (payload.query !== '') {
		query += `&${payload.query}`;
	}

	yield put(apiActions.setQueryFilter(payload.query));

	try {
		const response = yield call(providers.get, query);

		yield put(actions.setListProviders(response.data));
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao buscar Provedores.',
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
}

export function* addProvider(payload) {
	yield put(apiActions.apiSubmitStart());

	const data = payload.provider;

	try {
		const response = yield call(providers.register, data);
		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Provedor cadastrado com sucesso!',
					'success',
				),
			);
			setTimeout(() => {
				navigate('/provider');
			}, 1200);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao cadastrar provedor.',
				'error',
			),
		);
	}

	yield put(apiActions.apiSubmitEnd());
}

export function* editProvider(payload) {
	yield put(apiActions.apiSubmitStart());

	const data = payload.provider;

	const { id } = payload;

	try {
		const response = yield call(providers.edit, data, id);
		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Provedor editado com sucesso!',
					'success',
				),
			);
			setTimeout(() => {
				navigate('/provider');
			}, 1200);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao editar grupo.',
				'error',
			),
		);
	}

	yield put(apiActions.apiSubmitEnd());
}

export function* getProviderById(payload) {
	yield put(apiActions.apiStart());

	const id = payload.provider;

	try {
		const response = yield call(providers.getById, id);

		yield put(actions.setProvider(response.data));
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao buscar provedor.',
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
}

export function* deleteProvider(payload) {
	yield put(apiActions.apiStart());

	const id = payload.provider;

	try {
		const response = yield call(providers.remove, id);

		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Provedor deletado com sucesso!',
					'success',
				),
			);
			yield put(apiActions.toogleModal());
			const query = yield select(apiSelectors.getQuery);
			yield put(actions.getListProviders(query));
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao deletar provedor.',
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
}

export default function* watchProvider() {
	yield takeLatest(types.GET_LIST_PROVIDER, getListProvider);
	yield takeLatest(types.ADD_PROVIDER, addProvider);
	yield takeLatest(types.GET_PROVIDER, getProviderById);
	yield takeLatest(types.EDIT_PROVIDER, editProvider);
	yield takeLatest(types.DELETE_PROVIDER, deleteProvider);
}
