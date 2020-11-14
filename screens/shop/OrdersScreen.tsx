import React from "react";
import { FlatList, Platform, StyleSheet, Text } from "react-native";
import { NavigationScreenComponent } from "react-navigation";
import { NavigationDrawerScreenProps } from "react-navigation-drawer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { useSelector } from "react-redux";
import { RootState } from "../../App";
import OrderItem from "../../components/shop/OrderItem";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";

interface Props {}
type Params = {};
type ScreenProps = {};

const OrdersScreen: NavigationScreenComponent<Params, ScreenProps> = (
	props: Props
) => {
	const orders = useSelector((state: RootState) => state.orders.orders);
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

type navOptions = NavigationStackScreenProps & NavigationDrawerScreenProps;

OrdersScreen.navigationOptions = (navData: navOptions) => {
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

const styles = StyleSheet.create({});
