import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { Platform } from "react-native";

import { Colors } from "../constants/Colots";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";

const ProductsNavigator = createStackNavigator(
	{
		ProductsOverview: ProductsOverviewScreen,
		ProductDetail: ProductDetailScreen,
	},
	{
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor:
					Platform.OS === "android" ? Colors.PRIMARY : "",
			},
			headerTitleStyle: {
				fontFamily: "open-sans-bold",
			},
			headerBackTitleStyle: {
				fontFamily: "open-sans",
			},
			headerTintColor:
				Platform.OS === "android" ? "white" : Colors.PRIMARY,
		},
	}
);

export default createAppContainer(ProductsNavigator);
