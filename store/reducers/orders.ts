import Order from "../../models/order";
import { ADD_ORDER, OrderActionTypes, OrdrersState } from "../types";

const initialState: OrdrersState = {
	orders: [],
};

export default (
	state = initialState,
	action: OrderActionTypes
): OrdrersState => {
	switch (action.type) {
		case ADD_ORDER:
			const newOrder = new Order(
				new Date().toString(),
				action.orderData.items,
				action.orderData.amount,
				new Date()
			);
			return {
				...state,
				orders: state.orders.concat(newOrder),
			};
	}
	return state;
};