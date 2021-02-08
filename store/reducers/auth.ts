import {
	AUTHENTICATE,
	AuthState,
	LOGIN,
	LOGOUT,
	SET_DID_TRY_AL,
	SIGNUP,
} from "../types";
import { AuthActionTypes } from "../types";

const initialState: AuthState = {
	token: "",
	userId: "",
	didTryAutoLogin: false,
};

export default (state = initialState, action: AuthActionTypes): AuthState => {
	switch (action.type) {
		case AUTHENTICATE:
			return {
				token: action.token,
				userId: action.userId,
				didTryAutoLogin: true,
			};
		case SET_DID_TRY_AL:
			return {
				...state,
				didTryAutoLogin: true,
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
			return { ...initialState, didTryAutoLogin: true };
		default:
			return state;
	}
};
