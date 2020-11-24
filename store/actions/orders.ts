import { ThunkAction } from "redux-thunk";
import { RootState } from "../../App";
import Order from "../../models/order";
import { ADD_ORDER, OrderActionTypes, OrderItems, SET_ORDERS } from "../types";

export const fetchOrders = (): ThunkAction<
	void,
	RootState,
	unknown,
	OrderActionTypes
> => async (dispatch) => {
	try {
		const resp = await fetch(
			"https://rn-shop-app-57f83.firebaseio.com/orders/u1.json"
		);

		if (!resp.ok) {
			throw new Error("Something went wrong!");
		}
		const respData = await resp.json();

		const loadedOrders = [];
		if (respData) {
			for (const key in respData) {
				loadedOrders.push(
					new Order(
						key,
						respData[key].cartItems,
						respData[key].totalAmount,
						new Date(respData[key].date).toISOString()
					)
				);
			}
		}
		return dispatch({ type: SET_ORDERS, orders: loadedOrders });
	} catch (err) {
		// send to custom analytics server
		throw err;
	}
};

export const addOrder = (
	cartItems: OrderItems[],
	totalAmount: number
): ThunkAction<void, RootState, unknown, OrderActionTypes> => async (
	dispatch
) => {
	try {
		const date = new Date().toISOString();
		const resp = await fetch(
			"https://rn-shop-app-57f83.firebaseio.com/orders/u1.json",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					cartItems,
					totalAmount,
					date,
				}),
			}
		);

		if (!resp.ok) {
			throw new Error("Something went wrong!");
		}
		const respData = await resp.json();

		return dispatch({
			type: ADD_ORDER,
			orderData: {
				id: respData.name,
				items: cartItems,
				amount: totalAmount,
				date,
			},
		});
	} catch (err) {
		// send to custom analytics server
		throw err;
	}
};
