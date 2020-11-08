import PRODUCTS from "../../data/dummy-data";
import { ProductsState } from "../types";

const initialState: ProductsState = {
	availableProducts: PRODUCTS,
	userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

export default (state = initialState, action) => {
	return state;
};
