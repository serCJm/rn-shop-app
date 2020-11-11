import CartItem from "../../models/cart-item";
import Product from "../../models/product";
import { ADD_TO_CART, CartActionTypes } from "../types";

export const addToCart = (product: Product): CartActionTypes => {
	return { type: ADD_TO_CART, product };
};
