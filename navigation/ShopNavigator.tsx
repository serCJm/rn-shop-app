import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Button, Platform, View } from "react-native";

import { Colors } from "../constants/Colots";
import ProductsOverviewScreen, {
	productsOverviewScreenOptions,
} from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import { Ionicons } from "@expo/vector-icons";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

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

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
	return (
		<ProductsStackNavigator.Navigator
			screenOptions={defaultNavigationOptions}
		>
			<ProductsStackNavigator.Screen
				name="ProductsOverview"
				component={ProductsOverviewScreen}
				options={productsOverviewScreenOptions}
			></ProductsStackNavigator.Screen>
			<ProductsStackNavigator.Screen
				name="ProductDetail"
				component={ProductDetailScreen}
			></ProductsStackNavigator.Screen>
			<ProductsStackNavigator.Screen
				name="Cart"
				component={CartScreen}
			></ProductsStackNavigator.Screen>
		</ProductsStackNavigator.Navigator>
	);
};

// const ProductsNavigator = createStackNavigator(
// 	{
// 		ProductsOverview: ProductsOverviewScreen,
// 		ProductDetail: ProductDetailScreen,
// 		Cart: CartScreen,
// 	},
// 	{
// 		navigationOptions: {
// 			drawerIcon: (drawerConfig: any) => (
// 				<Ionicons
// 					name={Platform.OS === "android" ? "md-list" : "ios-list"}
// 					size={23}
// 					color={drawerConfig.tintColor}
// 				></Ionicons>
// 			),
// 		},
// 		defaultNavigationOptions,
// 	}
// );

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

const AdminNavigator = createStackNavigator(
	{
		UserProducts: UserProductsScreen,
		EditProduct: EditProductScreen,
	},
	{
		navigationOptions: {
			drawerIcon: (drawerConfig: any) => (
				<Ionicons
					name={
						Platform.OS === "android" ? "md-create" : "ios-create"
					}
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
		Admin: AdminNavigator,
	},
	{
		contentOptions: {
			activeTintColor: Colors.PRIMARY,
		},
		contentComponent: (props) => {
			const dispatch = useDispatch();
			return (
				<View style={{ flex: 1, padding: 20 }}>
					<SafeAreaView
						forceInset={{ top: "always", horizontal: "never" }}
					>
						<DrawerItems {...props}></DrawerItems>
						<Button
							title="Logout"
							color={Colors.PRIMARY}
							onPress={() => {
								dispatch(authActions.logout());
								// props.navigation.navigate("Auth");
							}}
						></Button>
					</SafeAreaView>
				</View>
			);
		},
	}
);

const AuthNavigator = createStackNavigator(
	{
		Auth: AuthScreen,
	},
	{
		defaultNavigationOptions,
	}
);

const MainNavigator = createSwitchNavigator({
	Startup: StartupScreen,
	Auth: AuthNavigator,
	Shop: ShopNavigator,
});

type NavContainerParams = {};

type NavContainerProps = {
	ref: React.RefObject<NavigationContainerComponent> | null;
};

export default createAppContainer<NavContainerParams, NavContainerProps>(
	MainNavigator
);
