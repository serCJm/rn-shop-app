import PRODUCTS from "../../data/dummy-data";
import { DELETE_PRODUCT, ProductsActionTypes, ProductsState } from "../types";

const initialState: ProductsState = {
	availableProducts: PRODUCTS,
	userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

export default (
	state = initialState,
	action: ProductsActionTypes
): ProductsState => {
	switch (action.type) {
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
