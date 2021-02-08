import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../App";
import StartupScreen from "../screens/StartupScreen";
import { AuthNavigator, ShopNavigator } from "./ShopNavigator";

interface Props {}

const AppNavigator = (props: Props) => {
	const isAuth = useSelector((state: RootState) => !!state.auth.token);
	const didTryAutoLogin = useSelector(
		(state: RootState) => !!state.auth.didTryAutoLogin
	);

	return (
		<NavigationContainer>
			{isAuth && <ShopNavigator></ShopNavigator>}
			{!isAuth && didTryAutoLogin && <AuthNavigator></AuthNavigator>}
			<StartupScreen></StartupScreen>
		</NavigationContainer>
	);
};

export default AppNavigator;
