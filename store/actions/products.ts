import { Action } from "redux";
import Constants from "expo-constants";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../App";
import Product from "../../models/product";
import {
	CREATE_PRODUCT,
	DELETE_PRODUCT,
	ProductsActionTypes,
	SET_PRODUCTS,
	UPDATE_PRODUCT,
} from "../types";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

export const fetchProducts = (): ThunkAction<
	void,
	RootState,
	unknown,
	ProductsActionTypes
> => async (dispatch, getState) => {
	try {
		const resp = await fetch(
			"https://rn-shop-app-57f83.firebaseio.com/products.json"
		);

		if (!resp.ok) {
			throw new Error("Something went wrong!");
		}
		const respData = await resp.json();

		const loadedProducts = [];
		if (respData) {
			for (const key in respData) {
				loadedProducts.push(
					new Product(
						key,
						respData[key].ownerId,
						respData[key].title,
						respData[key].imageUrl,
						respData[key].description,
						respData[key].price
					)
				);
			}
		}
		return dispatch({
			type: SET_PRODUCTS,
			products: loadedProducts,
			userProducts: loadedProducts.filter(
				(prod) => prod.ownerId === getState().auth.userId
			),
		});
	} catch (err) {
		// send to custom analytics server
		throw err;
	}
};

export const deleteProduct = (
	productId: string
): ThunkAction<void, RootState, unknown, ProductsActionTypes> => {
	return async (dispatch, getState) => {
		try {
			const resp = await fetch(
				`https://rn-shop-app-57f83.firebaseio.com/products/${productId}.json?auth=${
					getState().auth.token
				}`,
				{
					method: "DELETE",
				}
			);

			if (resp.ok) {
				return dispatch({
					type: DELETE_PRODUCT,
					pid: productId,
				});
			} else {
				throw new Error("Something went wrong with delete!");
			}
		} catch (err) {
			throw err;
		}
	};
};

export const createProduct = (
	title: string,
	description: string,
	imageUrl: string,
	price: number
): ThunkAction<void, RootState, unknown, ProductsActionTypes> => {
	return async (dispatch, getState) => {
		let respData;
		try {
			let pushToken;
			if (Constants.isDevice) {
				const {
					status: existingStatus,
				} = await Notifications.getPermissionsAsync();
				let finalStatus = existingStatus;
				if (existingStatus !== "granted") {
					const {
						status,
					} = await Notifications.requestPermissionsAsync();
					finalStatus = status;
				}
				if (finalStatus !== "granted") {
					alert("Failed to get push token for push notification!");
					return;
				}
				pushToken = (await Notifications.getExpoPushTokenAsync()).data;
				console.log(pushToken);
			} else {
				alert("Must use physical device for Push Notifications");
			}
			const resp = await fetch(
				`https://rn-shop-app-57f83.firebaseio.com/products.json?auth=${
					getState().auth.token
				}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						title,
						description,
						imageUrl,
						price,
						ownerId: getState().auth.userId,
						ownerPushToken: pushToken,
					}),
				}
			);
			respData = await resp.json();
		} catch (e) {
			console.log(e);
		}

		if (!respData.error) {
			dispatch({
				type: CREATE_PRODUCT,
				productData: {
					id: respData.name,
					title,
					description,
					imageUrl,
					price,
					ownerId: getState().auth.userId,
				},
			});
		} else {
			console.log(respData);
		}
	};
};

export const updateProduct = (
	id: string,
	title: string,
	description: string,
	imageUrl: string
): ThunkAction<void, RootState, unknown, ProductsActionTypes> => {
	return async (dispatch, getState) => {
		try {
			const resp = await fetch(
				`https://rn-shop-app-57f83.firebaseio.com/products/${id}.json?auth=${
					getState().auth.token
				}`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						title,
						description,
						imageUrl,
					}),
				}
			);
			if (resp.ok) {
				return dispatch({
					type: UPDATE_PRODUCT,
					pid: id,
					productData: {
						title,
						description,
						imageUrl,
					},
				});
			} else {
				throw new Error("Something went wrong!");
			}
		} catch (err) {
			throw err;
		}
	};
};
