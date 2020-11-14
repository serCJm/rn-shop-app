import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import { Platform } from "react-native";

import { Colors } from "../constants/Colots";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import { Ionicons } from "@expo/vector-icons";

const defaultNavigationOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === "android" ? Colors.PRIMARY : "",
	},
	headerTitleStyle: {
		fontFamily: "open-sans-bold",
	},
	headerBackTitleStyle: {
		fontFamily: "open-sans",
	},
	headerTintColor: Platform.OS === "android" ? "white" : Colors.PRIMARY,
};

const ProductsNavigator = createStackNavigator(
	{
		ProductsOverview: ProductsOverviewScreen,
		ProductDetail: ProductDetailScreen,
		Cart: CartScreen,
	},
	{
		navigationOptions: {
			drawerIcon: (drawerConfig: any) => (
				<Ionicons
					name={Platform.OS === "android" ? "md-list" : "ios-list"}
					size={23}
					color={drawerConfig.tintColor}
				></Ionicons>
			),
		},
		defaultNavigationOptions,
	}
);

const OrdersNavigator = createStackNavigator(
	{
		Orders: OrdersScreen,
	},
	{
		navigationOptions: {
			drawerIcon: (drawerConfig: any) => (
				<Ionicons
					name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
					size={23}
					color={drawerConfig.tintColor}
				></Ionicons>
			),
		},
		defaultNavigationOptions,
	}
);

const ShopNavigator = createDrawerNavigator(
	{
		Products: ProductsNavigator,
		Orders: OrdersNavigator,
	},
	{
		contentOptions: {
			activeTintColor: Colors.PRIMARY,
		},
	}
);

export default createAppContainer(ShopNavigator);
