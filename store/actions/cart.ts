import CartItem from "../../models/cart-item";
import Product from "../../models/product";
import { ADD_TO_CART, CartActionTypes, REMOVE_FROM_CART } from "../types";

export const addToCart = (product: Product): CartActionTypes => {
	return { type: ADD_TO_CART, product };
};

export const removeFromCart = (productId: string): CartActionTypes => {
	return { type: REMOVE_FROM_CART, pid: productId };
};
