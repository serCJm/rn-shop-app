import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
	createDrawerNavigator,
	DrawerItemList,
} from "@react-navigation/drawer";
import { Button, Platform, View } from "react-native";
import SafeAreaView from "react-native-safe-area-view";

import { Colors } from "../constants/Colots";
import ProductsOverviewScreen, {
	productsOverviewScreenOptions,
} from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen, {
	productDetailScreenOptions,
} from "../screens/shop/ProductDetailScreen";
import CartScreen, { cartScreenOptions } from "../screens/shop/CartScreen";
import OrdersScreen, {
	ordersScreenOptions,
} from "../screens/shop/OrdersScreen";
import { Ionicons } from "@expo/vector-icons";
import UserProductsScreen, {
	userProductsScreenOptions,
} from "../screens/user/UserProductsScreen";
import EditProductScreen, {
	editProductScreenOptions,
} from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";
import { RootStackParamList } from "../App";

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

const ProductsStackNavigator = createStackNavigator<RootStackParamList>();

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
				options={productDetailScreenOptions}
			></ProductsStackNavigator.Screen>
			<ProductsStackNavigator.Screen
				name="Cart"
				component={CartScreen}
				options={cartScreenOptions}
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

const OrdersStackNavigator = createStackNavigator<RootStackParamList>();

export const OrdersNavigator = () => (
	<OrdersStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
		<OrdersStackNavigator.Screen
			name="Orders"
			component={OrdersScreen}
			options={ordersScreenOptions}
		></OrdersStackNavigator.Screen>
	</OrdersStackNavigator.Navigator>
);

// const OrdersNavigator = createStackNavigator(
// 	{
// 		Orders: OrdersScreen,
// 	},
// 	{
// 		navigationOptions: {
// 			drawerIcon: (drawerConfig: any) => (
// 				<Ionicons
// 					name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
// 					size={23}
// 					color={drawerConfig.tintColor}
// 				></Ionicons>
// 			),
// 		},
// 		defaultNavigationOptions,
// 	}
// );

const AdminStackNavigator = createStackNavigator<RootStackParamList>();

export const AdminNavigator = () => (
	<AdminStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
		<AdminStackNavigator.Screen
			name="UserProducts"
			component={UserProductsScreen}
			options={userProductsScreenOptions}
		></AdminStackNavigator.Screen>
		<AdminStackNavigator.Screen
			name="EditProduct"
			component={EditProductScreen}
			options={editProductScreenOptions}
		></AdminStackNavigator.Screen>
	</AdminStackNavigator.Navigator>
);

// const AdminNavigator = createStackNavigator(
// 	{
// 		UserProducts: UserProductsScreen,
// 		EditProduct: EditProductScreen,
// 	},
// 	{
// 		navigationOptions: {
// 			drawerIcon: (drawerConfig: any) => (
// 				<Ionicons
// 					name={
// 						Platform.OS === "android" ? "md-create" : "ios-create"
// 					}
// 					size={23}
// 					color={drawerConfig.tintColor}
// 				></Ionicons>
// 			),
// 		},
// 		defaultNavigationOptions,
// 	}
// );

const ShopDrawerNavigator = createDrawerNavigator<RootStackParamList>();

const ShopNavigator = (
	<ShopDrawerNavigator.Navigator
		drawerContent={(props) => {
			const dispatch = useDispatch();

			return (
				<View style={{ flex: 1, padding: 20 }}>
					<SafeAreaView
						forceInset={{ top: "always", horizontal: "never" }}
					>
						<DrawerItemList {...props}></DrawerItemList>
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
		}}
		drawerContentOptions={{
			activeTintColor: Colors.PRIMARY,
		}}
	>
		<ShopDrawerNavigator.Screen
			name="Products"
			component={ProductsNavigator}
			options={{
				drawerIcon: (props) => (
					<Ionicons
						name={
							Platform.OS === "android" ? "md-list" : "ios-list"
						}
						size={23}
						color={props.color}
					></Ionicons>
				),
			}}
		></ShopDrawerNavigator.Screen>
		<ShopDrawerNavigator.Screen
			name="Orders"
			component={OrdersNavigator}
			options={{
				drawerIcon: (props) => (
					<Ionicons
						name={
							Platform.OS === "android" ? "md-cart" : "ios-cart"
						}
						size={23}
						color={props.color}
					></Ionicons>
				),
			}}
		></ShopDrawerNavigator.Screen>
		<ShopDrawerNavigator.Screen
			name="Admin"
			component={AdminNavigator}
			options={{
				drawerIcon: (props) => (
					<Ionicons
						name={
							Platform.OS === "android"
								? "md-create"
								: "ios-create"
						}
						size={23}
						color={props.color}
					></Ionicons>
				),
			}}
		></ShopDrawerNavigator.Screen>
	</ShopDrawerNavigator.Navigator>
);

// const ShopNavigator = createDrawerNavigator(
// 	{
// 		Products: ProductsNavigator,
// 		Orders: OrdersNavigator,
// 		Admin: AdminNavigator,
// 	},
// 	{
// 		contentOptions: {
// 			activeTintColor: Colors.PRIMARY,
// 		},
// 		contentComponent: (props) => {
// 			const dispatch = useDispatch();
// 			return (
// 				<View style={{ flex: 1, padding: 20 }}>
// 					<SafeAreaView
// 						forceInset={{ top: "always", horizontal: "never" }}
// 					>
// 						<DrawerItems {...props}></DrawerItems>
// 						<Button
// 							title="Logout"
// 							color={Colors.PRIMARY}
// 							onPress={() => {
// 								dispatch(authActions.logout());
// 								// props.navigation.navigate("Auth");
// 							}}
// 						></Button>
// 					</SafeAreaView>
// 				</View>
// 			);
// 		},
// 	}
// );

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
