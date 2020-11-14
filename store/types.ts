import CartItem from "../models/cart-item";
import Order from "../models/order";
import Product from "../models/product";

export interface ProductsState {
	availableProducts: Product[];
	userProducts: Product[];
}

// ORDERS TYPES

export const ADD_ORDER = "ADD_ORDER";

export interface OrdrersState {
	orders: Order[];
}

interface AddOrderAction {
	type: typeof ADD_ORDER;
	orderData: {
		items: CartItem[];
		amount: number;
	};
}

export type OrderActionTypes = AddOrderAction;

// CART TYPES

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

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

interface RemoveFromCartAction {
	type: typeof REMOVE_FROM_CART;
	pid: string;
}

export type CartActionTypes =
	| AddToCartAction
	| RemoveFromCartAction
	| AddOrderAction;
