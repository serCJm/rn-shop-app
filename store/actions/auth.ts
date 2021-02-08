import { ThunkAction } from "redux-thunk";
import { RootState } from "../../App";
import {
	LOGIN,
	SIGNUP,
	AuthActionTypes,
	AUTHENTICATE,
	LOGOUT,
	SET_DID_TRY_AL,
} from "../types";
// @ts-ignore
import { FIREBASE_API } from "@env";
import { AsyncStorage } from "react-native";

export const authenticate = (
	type: "SIGNUP" | "LOGIN" | "AUTHENTICATE" | "LOGOUT",
	userId: string,
	token: string,
	expiaryTime: number
): ThunkAction<void, RootState, unknown, AuthActionTypes> => {
	return (dispatch) => {
		dispatch(setLogoutTimer(expiaryTime));
		dispatch({ type, userId, token });
	};
};

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
			const expirationDate = new Date(
				new Date().getTime() + +respData.expiresIn * 1000
			);
			saveDataToStorage(
				respData.idToken,
				respData.localId,
				expirationDate
			);
			return dispatch(
				authenticate(
					SIGNUP,
					respData.idToken,
					respData.localId,
					+respData.expiresIn * 1000
				)
			);
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
				`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API}`,
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
			const expirationDate = new Date(
				new Date().getTime() + +respData.expiresIn * 1000
			);
			saveDataToStorage(
				respData.idToken,
				respData.localId,
				expirationDate
			);
			return dispatch(
				authenticate(
					LOGIN,
					respData.idToken,
					respData.localId,
					+respData.expiresIn * 1000
				)
			);
		} catch (e) {
			throw new Error(e.message || "Something is wrong!");
		}
	};
};

export const logout = (): AuthActionTypes => {
	clearLogoutTimer();
	AsyncStorage.removeItem("userData");
	return { type: LOGOUT };
};

let timer: NodeJS.Timeout;
const setLogoutTimer = (
	expirationTime: number
): ThunkAction<void, RootState, unknown, AuthActionTypes> => {
	return async (dispatch) => {
		timer = setTimeout(() => dispatch(logout()), expirationTime);
	};
};
const clearLogoutTimer = () => {
	if (timer) clearTimeout(timer);
};

const saveDataToStorage = (
	token: string,
	userId: string,
	expirationDate: Date
) => {
	AsyncStorage.setItem(
		"userDate",
		JSON.stringify({
			token,
			userId,
			expiryDate: expirationDate.toISOString(),
		})
	);
};

export const setDidTryAL = () => {
	return { type: SET_DID_TRY_AL };
};
