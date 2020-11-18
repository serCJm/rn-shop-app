import { DELETE_PRODUCT, ProductsActionTypes } from "../types";

export const deleteProduct = (productId: string): ProductsActionTypes => {
	return { type: DELETE_PRODUCT, pid: productId };
};
