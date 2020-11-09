import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { Platform } from "react-native";

import { Colors } from "../constants/Colots";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";

const ProductsNavigator = createStackNavigator(
	{
		ProductsOverview: ProductsOverviewScreen,
	},
	{
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor:
					Platform.OS === "android" ? Colors.PRIMARY : "",
			},
			headerTintColor:
				Platform.OS === "android" ? "white" : Colors.PRIMARY,
		},
	}
);

export default createAppContainer(ProductsNavigator);
