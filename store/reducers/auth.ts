import { AUTHENTICATE, AuthState, LOGIN, LOGOUT, SIGNUP } from "../types";
import { AuthActionTypes } from "../types";

const initialState: AuthState = {
	token: "",
	userId: "",
};

export default (state = initialState, action: AuthActionTypes) => {
	switch (action.type) {
		case AUTHENTICATE:
			return {
				token: action.token,
				userId: action.userId,
			};
		case LOGIN:
			return {
				token: action.token,
				userId: action.userId,
			};
		case SIGNUP:
			return {
				token: action.token,
				userId: action.userId,
			};
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
};
