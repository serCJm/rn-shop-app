import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colots";
import { OrderItems } from "../../store/types";
import CartItem from "./CartItem";

interface Props {
	amount: number;
	date: string;
	items: OrderItems[];
}

const OrderItem = (props: Props) => {
	const [showDetails, setShowDetails] = useState(false);
	return (
		<View style={styles.orderItem}>
			<View style={styles.summary}>
				<Text style={styles.totalAmount}>
					${props.amount.toFixed(2)}
				</Text>
				<Text style={styles.date}>{props.date}</Text>
			</View>
			<Button
				// style={styles.button}
				color={Colors.PRIMARY}
				title={showDetails ? "Hide Details" : "Show Details"}
				onPress={() => setShowDetails((prevState) => !prevState)}
			></Button>
			{showDetails && (
				<View style={styles.detailItems}>
					{props.items.map((cartItem) => (
						<CartItem
							key={cartItem.productId}
							quantity={cartItem.quantity}
							amount={cartItem.sum}
							title={cartItem.productTitle}
							deletable={false}
						></CartItem>
					))}
				</View>
			)}
		</View>
	);
};

export default OrderItem;

const styles = StyleSheet.create({
	orderItem: {
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
		margin: 20,
		padding: 10,
		alignItems: "center",
	},
	summary: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		marginBottom: 25,
	},
	totalAmount: {
		fontFamily: "open-sans-bold",
		fontSize: 16,
	},
	date: {
		fontSize: 16,
		fontFamily: "open-sans",
		color: "#888",
	},
	detailItems: {
		width: "100%",
		marginTop: 25,
	},
});
