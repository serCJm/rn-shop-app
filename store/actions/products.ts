import {
	CREATE_PRODUCT,
	DELETE_PRODUCT,
	ProductsActionTypes,
	UPDATE_PRODUCT,
} from "../types";

export const deleteProduct = (productId: string): ProductsActionTypes => {
	return { type: DELETE_PRODUCT, pid: productId };
};

export const createProduct = (
	title: string,
	description: string,
	imageUrl: string,
	price: number
): ProductsActionTypes => {
	return {
		type: CREATE_PRODUCT,
		productData: {
			title,
			description,
			imageUrl,
			price,
		},
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
