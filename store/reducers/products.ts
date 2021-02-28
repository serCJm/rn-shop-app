import Product from "../../models/product";
import {
	CREATE_PRODUCT,
	DELETE_PRODUCT,
	ProductsActionTypes,
	ProductsState,
	SET_PRODUCTS,
	UPDATE_PRODUCT,
} from "../types";

const initialState: ProductsState = {
	availableProducts: [],
	userProducts: [],
};

export default (
	state = initialState,
	action: ProductsActionTypes
): ProductsState => {
	switch (action.type) {
		case SET_PRODUCTS:
			return {
				...state,
				availableProducts: action.products,
				userProducts: action.userProducts,
			};
		case CREATE_PRODUCT:
			const newProduct = new Product(
				action.productData.id,
				action.productData.ownerId,
				action.productData.title,
				action.productData.imageUrl,
				action.productData.description,
				+action.productData.price
			);
			return {
				...state,
				availableProducts: state.availableProducts.concat(newProduct),
				userProducts: state.availableProducts.concat(newProduct),
			};
		case UPDATE_PRODUCT:
			const productIndex = state.userProducts.findIndex(
				(prod) => prod.id === action.pid
			);
			const updatedProduct = new Product(
				action.pid,
				state.userProducts[productIndex].ownerId,
				action.productData.title,
				action.productData.imageUrl,
				action.productData.description,
				state.userProducts[productIndex].price
			);
			const updatedUserProducts = [...state.userProducts];
			updatedUserProducts[productIndex] = updatedProduct;
			const availableProductIndex = state.availableProducts.findIndex(
				(prod) => prod.id === action.pid
			);
			const updatedAvailableProducts = [...state.availableProducts];
			updatedAvailableProducts[availableProductIndex] = updatedProduct;
			return {
				...state,
				availableProducts: updatedAvailableProducts,
				userProducts: updatedUserProducts,
			};

		case DELETE_PRODUCT:
			return {
				...state,
				userProducts: state.userProducts.filter(
					(product) => product.id !== action.pid
				),
			};
	}
	return state;
};
