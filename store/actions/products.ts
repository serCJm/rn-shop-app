import { Action } from "redux";
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

export const fetchProducts = (): ThunkAction<
	void,
	RootState,
	unknown,
	ProductsActionTypes
> => async (dispatch) => {
	let respData;
	try {
		const resp = await fetch(
			"https://rn-shop-app-57f83.firebaseio.com/products.json"
		);
		respData = await resp.json();
	} catch (e) {
		console.log(e);
	}

	let loadedProducts = [];
	if (respData) {
		for (const key in respData) {
			loadedProducts.push(
				new Product(
					key,
					"u1",
					respData[key].title,
					respData[key].imageUrl,
					respData[key].description,
					respData[key].price
				)
			);
		}
	}
	return dispatch({ type: SET_PRODUCTS, products: loadedProducts });
};

export const deleteProduct = (productId: string): ProductsActionTypes => {
	return { type: DELETE_PRODUCT, pid: productId };
};

export const createProduct = (
	title: string,
	description: string,
	imageUrl: string,
	price: number
): ThunkAction<void, RootState, unknown, ProductsActionTypes> => {
	return async (dispatch) => {
		let respData;
		try {
			const resp = await fetch(
				"https://rn-shop-app-57f83.firebaseio.com/products.json",
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
					}),
				}
			);
			respData = await resp.json();
		} catch (e) {
			console.log(e);
		}

		if (respData)
			dispatch({
				type: CREATE_PRODUCT,
				productData: {
					id: respData.name,
					title,
					description,
					imageUrl,
					price,
				},
			});
	};
};

export const updateProduct = (
	id: string,
	title: string,
	description: string,
	imageUrl: string
): ProductsActionTypes => {
	return {
		type: UPDATE_PRODUCT,
		pid: id,
		productData: {
			title,
			description,
			imageUrl,
		},
	};
};
