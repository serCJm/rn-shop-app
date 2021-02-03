import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../App";
import { ProductsNavigator } from "./ShopNavigator";

interface Props {}

const AppNavigator = (props: Props) => {
	const isAuth = useSelector((state: RootState) => !!state.auth.token);

	return (
		<NavigationContainer>
			<ProductsNavigator></ProductsNavigator>
		</NavigationContainer>
	);
};

export default AppNavigator;
