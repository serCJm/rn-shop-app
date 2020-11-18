import CartItem from "../../models/cart-item";
import { ADD_ORDER, OrderActionTypes, OrderItems } from "../types";

export const addOrder = (
	cartItems: OrderItems[],
	totalAmount: number
): OrderActionTypes => {
	return {
		type: ADD_ORDER,
		orderData: { items: cartItems, amount: totalAmount },
	};
};
