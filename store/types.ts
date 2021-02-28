import CartItem from "../models/cart-item";
import Order from "../models/order";
import Product from "../models/product";

// PRODUCTS TYPES

export const SET_PRODUCTS = "SET_PRODUCTS";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export interface ProductsState {
	availableProducts: Product[];
	userProducts: Product[];
}

interface SetProductsAction {
	type: typeof SET_PRODUCTS;
	products: Product[];
	userProducts: Product[];
}

interface DeleteProductAction {
	type: typeof DELETE_PRODUCT;
	pid: string;
}

interface CreateProductAction {
	type: typeof CREATE_PRODUCT;
	productData: {
		id: string;
		title: string;
		description: string;
		imageUrl: string;
		price: number;
		ownerId: string;
		pushToken: string;
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
	| SetProductsAction
	| DeleteProductAction
	| CreateProductAction
	| UpdateProductAction;

// ORDERS TYPES

export const SET_ORDERS = "SET_ORDERS";
export const ADD_ORDER = "ADD_ORDER";

export interface OrdersState {
	orders: Order[];
}

export type OrderItems = {
	productId: string;
	productTitle: string;
	productPrice: number;
	quantity: number;
	productPushToken: string;
	sum: number;
};

interface SetOrderAction {
	type: typeof SET_ORDERS;
	orders: Order[];
}

interface AddOrderAction {
	type: typeof ADD_ORDER;
	orderData: {
		id: string;
		items: OrderItems[];
		amount: number;
		date: string;
	};
}

export type OrderActionTypes = AddOrderAction | SetOrderAction;

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

// AUTH
export const AUTHENTICATE = "AUTHENTICATE";
export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SET_DID_TRY_AL = "SET_DID_TRY_AL";

export interface AuthState {
	token: string;
	userId: string;
	didTryAutoLogin?: boolean;
}

interface AuthenticateAction {
	type: typeof AUTHENTICATE;
	token: string;
	userId: string;
}
interface SignUpAction {
	type: typeof SIGNUP;
	token: string;
	userId: string;
}
interface LoginAction {
	type: typeof LOGIN;
	token: string;
	userId: string;
}

interface LogoutAction {
	type: typeof LOGOUT;
}

interface SetDidTryALAction {
	type: typeof SET_DID_TRY_AL;
}

export type AuthActionTypes =
	| SignUpAction
	| LoginAction
	| AuthenticateAction
	| LogoutAction
	| SetDidTryALAction;
