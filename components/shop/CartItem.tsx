import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

interface Props {
	title: string;
	quantity: number;
	amount: number;
	onRemove?: () => void;
	deletable: boolean;
}

const CartItem = (props: Props) => {
	return (
		<View style={styles.cartItem}>
			<View style={styles.itemData}>
				<Text style={styles.quantity}>{props.quantity} </Text>
				<Text style={styles.mainText}>{props.title}</Text>
			</View>
			<View style={styles.itemData}>
				<Text style={styles.mainText}>${props.amount.toFixed(2)}</Text>
				{props.deletable && (
					<TouchableOpacity
						onPress={props.onRemove}
						style={styles.deleteButton}
					>
						<Ionicons
							name={
								Platform.OS === "android"
									? "md-trash"
									: "ios-trash"
							}
							size={27}
							color="red"
						></Ionicons>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

export default CartItem;

const styles = StyleSheet.create({
	cartItem: {
		// padding: 20,
		paddingHorizontal: 10,
		backgroundColor: "white",
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: 20,
		marginBottom: 30,
	},
	itemData: {
		flexDirection: "row",
		alignItems: "center",
	},
	quantity: {
		fontFamily: "open-sans",
		color: "#888",
		fontSize: 16,
	},
	mainText: {
		fontFamily: "open-sans-bold",
		fontSize: 16,
	},
	deleteButton: {
		marginLeft: 20,
		padding: 20,
	},
});
