import "dotenv/config";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../App";
import { SIGNUP, SignUpActionTypes } from "../types";

export const signup = (
	email: string,
	password: string
): ThunkAction<void, RootState, unknown, SignUpActionTypes> => {
	return async (dispatch) => {
		try {
			const response = await fetch(
				`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.FIREBASE_API}`,
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
				throw new Error("Something went wrong!");
			}
			const respData = await response.json();
			return dispatch({ type: SIGNUP });
		} catch (e) {
			console.log(e);
		}
	};
};
