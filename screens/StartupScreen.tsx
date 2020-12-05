import React, { useEffect } from "react";
import {
	ActivityIndicator,
	AsyncStorage,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { useDispatch } from "react-redux";
import { Colors } from "../constants/Colots";
import * as authActions from "../store/actions/auth";

interface Props {
	navigation: NavigationStackProp;
}

const StartupScreen = (props: Props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		const tryLogin = async () => {
			const userData = await AsyncStorage.getItem("userData");
			if (!userData) {
				props.navigation.navigate("Auth");
				return;
			}
			const transformedData = JSON.parse(userData);
			const { token, userId, expiryDate } = transformedData;
			const expirationDate = new Date(expiryDate);
			if (expirationDate <= new Date() || !token || !userId) {
				props.navigation.navigate("Auth");
				return;
			}
			props.navigation.navigate("Shop");
			dispatch(authActions.authenticate(userId, token));
		};
		tryLogin();
	}, [dispatch]);
	return (
		<View style={styles.screen}>
			<ActivityIndicator size="large" color={Colors.PRIMARY} />
		</View>
	);
};

export default StartupScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
