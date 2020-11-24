import Order from "../../models/order";
import { ADD_ORDER, OrderActionTypes, OrdersState } from "../types";

const initialState: OrdersState = {
	orders: [],
};

export default (
	state = initialState,
	action: OrderActionTypes
): OrdersState => {
	switch (action.type) {
		case ADD_ORDER:
			const newOrder = new Order(
				action.orderData.id,
				action.orderData.items,
				action.orderData.amount,
				action.orderData.date
			);
			return {
				...state,
				orders: state.orders.concat(newOrder),
			};
	}
	return state;
};
