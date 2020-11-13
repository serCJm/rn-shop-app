import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { RootState } from "../../App";
import CartItem from "../../components/shop/CartItem";
import { Colors } from "../../constants/Colots";

interface Props {}

const CartScreen = (props: Props) => {
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
			});
		}
		return transformedCartItems;
	});
	return (
		<View style={styles.screen}>
			<View style={styles.summary}>
				<Text style={styles.summaryText}>
					Total:{" "}
					<Text style={styles.amount}>
						${cartTotalAmount.toFixed(2)}
					</Text>
				</Text>
				<Button
					color={Colors.ACCENT}
					title="Order Now"
					disabled={cartItems.length === 0}
					onPress={() => {}}
				/>
			</View>
			<FlatList
				data={cartItems}
				keyExtractor={(item) => item.productId}
				renderItem={(itemData) => (
					<CartItem
						quantity={itemData.item.quantity}
						title={itemData.item.productTitle}
						amount={itemData.item.sum}
						onRemove={() => {}}
					></CartItem>
				)}
			></FlatList>
		</View>
	);
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
		shadowColor: "black",
		shadowOpacity: 0.26,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowRadius: 8,
		elevation: 5,
		borderRadius: 10,
		backgroundColor: "white",
	},
	summaryText: {
		fontFamily: "open-sans-bold",
		fontSize: 18,
	},
	amount: {
		color: Colors.PRIMARY,
	},
});
