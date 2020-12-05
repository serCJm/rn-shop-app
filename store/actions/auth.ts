import { ThunkAction } from "redux-thunk";
import { RootState } from "../../App";
import { LOGIN, SIGNUP, AuthActionTypes } from "../types";
// @ts-ignore
import { FIREBASE_API } from "@env";

export const signup = (
	email: string,
	password: string
): ThunkAction<void, RootState, unknown, AuthActionTypes> => {
	return async (dispatch) => {
		try {
			const response = await fetch(
				`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email,
						password,
						returnSecureToken: true,
					}),
				}
			);
			if (!response.ok) {
				const errorResData = await response.json();
				const errorId = errorResData.error.message;
				let message = "Something went wrong";
				console.log(errorId);
				if (errorId === "EMAIL_EXISTS") {
					message = "Try another email address";
				}
				throw new Error(message);
			}
			const respData = await response.json();
			return dispatch({
				type: SIGNUP,
				token: respData.idToken,
				userId: respData.localId,
			});
		} catch (e) {
			throw new Error(e.message || "Something is wrong!");
		}
	};
};

export const login = (
	email: string,
	password: string
): ThunkAction<void, RootState, unknown, AuthActionTypes> => {
	return async (dispatch) => {
		try {
			const response = await fetch(
				`https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${FIREBASE_API}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email,
						password,
						returnSecureToken: true,
					}),
				}
			);
			if (!response.ok) {
				const errorResData = await response.json();
				const errorId = errorResData.error.message;
				let message = "Something went wrong";
				console.log(errorId);
				if (errorId === "EMAIL_NOT_FOUND") {
					message = "This email could not be found";
				} else if (errorId === "INVALID_PASSWORD") {
					message = "Check your login info";
				} else if (errorId === "MISSING_CUSTOM_TOKEN") {
					message = "Incorrect login info";
				}
				throw new Error(message);
			}
			const respData = await response.json();
			return dispatch({
				type: LOGIN,
				token: respData.idToken,
				userId: respData.localId,
			});
		} catch (e) {
			throw new Error(e.message || "Something is wrong!");
		}
	};
};
