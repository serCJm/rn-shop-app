import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Platform,
	Text,
	View,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import { RootStackParamList, RootState } from "../../App";
import OrderItem from "../../components/shop/OrderItem";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import { Colors } from "../../constants/Colots";
import * as orderActions from "../../store/actions/orders";

interface Props {
	navigation: StackNavigationProp<RootStackParamList, "Orders"> &
		DrawerNavigationProp<RootStackParamList, "Orders">;
	route: RouteProp<RootStackParamList, "Orders">;
}

const OrdersScreen = (props: Props) => {
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();
	useEffect(() => {
		const fetchOrders = async () => {
			setIsLoading(true);
			await dispatch(orderActions.fetchOrders());
			setIsLoading(false);
		};
		fetchOrders();
	}, [dispatch]);
	const orders = useSelector((state: RootState) => state.orders.orders);

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

	if (orders.length === 0) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text>No Products Found!</Text>
			</View>
		);
	}

	return (
		<FlatList
			data={orders}
			keyExtractor={(item) => item.id}
			renderItem={(itemData) => (
				<OrderItem
					amount={itemData.item.totalAmount}
					date={itemData.item.readableDate}
					items={itemData.item.items}
				></OrderItem>
			)}
		></FlatList>
	);
};

export const ordersScreenOptions = (navData: Props) => {
	return {
		headerTitle: "Your Orders",
		headerLeft: () => (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title="Menu"
					iconName={
						Platform.OS === "android" ? "md-menu" : "ios-cart"
					}
					onPress={() => navData.navigation.toggleDrawer()}
				></Item>
			</HeaderButtons>
		),
	};
};

export default OrdersScreen;
