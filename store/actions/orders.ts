import CartItem from "../../models/cart-item";
import { ADD_ORDER, OrderActionTypes } from "../types";

export const addOrder = (
	cartItems: CartItem[],
	totalAmount: number
): OrderActionTypes => {
	return {
		type: ADD_ORDER,
		orderData: { items: cartItems, amount: totalAmount },
	};
};
