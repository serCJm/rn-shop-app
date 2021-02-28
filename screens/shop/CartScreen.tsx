import React, { useState } from "react";
import {
	ActivityIndicator,
	Button,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../App";
import CartItem from "../../components/shop/CartItem";
import Card from "../../components/UI/Card";
import { Colors } from "../../constants/Colots";
import * as cartActions from "../../store/actions/cart";
import * as ordersActions from "../../store/actions/orders";

interface Props {}

const CartScreen = (props: Props) => {
	const [isLoading, setIsLoading] = useState(false);
	const cartTotalAmount = useSelector(
		(state: RootState) => state.cart.totalAmount
	);
	const cartItems = useSelector((state: RootState) => {
		const transformedCartItems = [];
		for (const key in state.cart.items) {
			transformedCartItems.push({
				productId: key,
				productTitle: state.cart.items[key].productTitle,
				productPrice: state.cart.items[key].productPrice,
				quantity: state.cart.items[key].quantity,
				sum: state.cart.items[key].sum,
				productPushToken: state.cart.items[key].pushToken,
			});
		}
		return transformedCartItems.sort((a, b) =>
			a.productId > b.productId ? 1 : -1
		);
	});
	const dispatch = useDispatch();
	const sendOrderHandler = async () => {
		setIsLoading(true);
		await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
		setIsLoading(false);
	};

	if (isLoading) {
		return (
			<View>
				<ActivityIndicator
					size="large"
					color={Colors.PRIMARY}
				></ActivityIndicator>
			</View>
		);
	}

	return (
		<View style={styles.screen}>
			<Card style={styles.summary}>
				<Text style={styles.summaryText}>
					Total:{" "}
					<Text style={styles.amount}>
						${Math.abs(+cartTotalAmount.toFixed(2))}
					</Text>
				</Text>
				<Button
					color={Colors.ACCENT}
					title="Order Now"
					disabled={cartItems.length === 0}
					onPress={sendOrderHandler}
				/>
			</Card>
			<FlatList
				data={cartItems}
				keyExtractor={(item) => item.productId}
				renderItem={(itemData) => (
					<CartItem
						quantity={itemData.item.quantity}
						title={itemData.item.productTitle}
						amount={itemData.item.sum}
						onRemove={() =>
							dispatch(
								cartActions.removeFromCart(
									itemData.item.productId
								)
							)
						}
						deletable
					></CartItem>
				)}
			></FlatList>
		</View>
	);
};

export const cartScreenOptions = {
	headerTitle: "Your Orders",
};

export default CartScreen;

const styles = StyleSheet.create({
	screen: {
		margin: 20,
	},
	summary: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 20,
		padding: 10,
	},
	summaryText: {
		fontFamily: "open-sans-bold",
		fontSize: 18,
	},
	amount: {
		color: Colors.PRIMARY,
	},
});
