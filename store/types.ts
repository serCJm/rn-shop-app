import CartItem from "../models/cart-item";
import Product from "../models/product";

export interface ProductsState {
	availableProducts: Product[];
	userProducts: Product[];
}

export const ADD_TO_CART = "ADD_TO_CART";

export interface CartState {
	items: {
		[key: string]: CartItem;
	};
	totalAmount: number;
}

interface AddToCartAction {
	type: typeof ADD_TO_CART;
	product: Product;
}

// interface ISetFilters {
// 	type: typeof SET_FILTERS;
// 	filters: IFilterSettings;
// }

export type CartActionTypes = AddToCartAction;
