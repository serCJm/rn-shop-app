import CartItem from "../models/cart-item";
import Order from "../models/order";
import Product from "../models/product";

// PRODUCTS TYPES

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export interface ProductsState {
	availableProducts: Product[];
	userProducts: Product[];
}

interface DeleteProductAction {
	type: typeof DELETE_PRODUCT;
	pid: string;
}

interface CreateProductActon {
	type: typeof CREATE_PRODUCT;
	productData: {
		title: string;
		description: string;
		imageUrl: string;
		price: number;
	};
}

interface UpdateProductAction {
	type: typeof UPDATE_PRODUCT;
	pid: string;
	productData: {
		title: string;
		description: string;
		imageUrl: string;
	};
}

export type ProductsActionTypes =
	| DeleteProductAction
	| CreateProductActon
	| UpdateProductAction;

// ORDERS TYPES

export const ADD_ORDER = "ADD_ORDER";

export interface OrdersState {
	orders: Order[];
}

export type OrderItems = {
	productId: string;
	productTitle: string;
	productPrice: number;
	quantity: number;
	sum: number;
};

interface AddOrderAction {
	type: typeof ADD_ORDER;
	orderData: {
		items: OrderItems[];
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
