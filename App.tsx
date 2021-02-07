import React, { useState } from "react";
import { combineReducers, createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import ordersReducer from "./store/reducers/orders";
import authReducer from "./store/reducers/auth";
import ShopNavigator from "./navigation/ShopNavigator";
import AppNavigator from "./navigation/AppNavigator";

const rootReducer = combineReducers({
	products: productsReducer,
	cart: cartReducer,
	orders: ordersReducer,
	auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type RootStackParamList = {
	ProductsOverview: undefined;
	ProductDetail:
		| {
				productId: string;
				productTitle: string;
		  }
		| undefined;
	Cart: undefined;
	Orders: undefined;
	UserProducts: undefined;
	EditProduct:
		| { productId: string; submit?: () => void | undefined }
		| undefined;
};

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
	return Font.loadAsync({
		"open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
		"open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
	});
};

export default function App() {
	const [fontLoaded, setFontLoaded] = useState(false);

	if (!fontLoaded)
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setFontLoaded(true)}
			></AppLoading>
		);
	return (
		<Provider store={store}>
			<AppNavigator></AppNavigator>
		</Provider>
	);
}
