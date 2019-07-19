import {GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL} from 'actions/userInfo';

const initState = {
	isLoading: false,
	userInfo: {},
	errorMsg: ''
};

export default function reducer(state = initState, action) {
	switch (action.type) {
		case GET_USER_INFO_REQUEST:
			return {
				...state,
				isLoading: true,
				userInfo: {},
				errorMsg: ''
			};
		case GET_USER_INFO_SUCCESS:
			return {
				...state,
				isLoading: false,
				userInfo: action.userInfo,
				errorMsg: ''
			};
		case GET_USER_INFO_FAIL:
			return {
				...state,
				isLoading: false,
				userInfo: {},
				errorMsg: '请求错误'
			};
		default:
			return state;
	}
}

export function getUserInfo() {
	return function (dispatch) {
		dispatch(getUserInfoRequest());

		return fetch('http://localhost:8080/api/user.json')
			.then((response => {
				return response.json()
			}))
			.then((json) => {
				dispatch(getUserInfoSuccess(json))
			}).catch(
				() => {
					dispatch(getUserInfoFail());
				}
			)
	}
}