import React, { useEffect } from "react";
import {
	ActivityIndicator,
	AsyncStorage,
	StyleSheet,
	View,
} from "react-native";
import { useDispatch } from "react-redux";
import { Colors } from "../constants/Colots";
import * as authActions from "../store/actions/auth";
import { AUTHENTICATE } from "../store/types";

interface Props {}

const StartupScreen = (props: Props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		const tryLogin = async () => {
			try {
				const userData = await AsyncStorage.getItem("userData");
				if (!userData) {
					// props.navigation.navigate("Auth");
					dispatch(authActions.setDidTryAL());
					return;
				}
				const transformedData = JSON.parse(userData);
				const { token, userId, expiryDate } = transformedData;
				const expirationDate = new Date(expiryDate);
				if (expirationDate <= new Date() || !token || !userId) {
					// props.navigation.navigate("Auth");
					dispatch(authActions.setDidTryAL());
					return;
				}
				const expirationTime =
					expirationDate.getTime() - new Date().getTime();
				// props.navigation.navigate("Shop");

				dispatch(
					authActions.authenticate(
						AUTHENTICATE,
						userId,
						token,
						expirationTime
					)
				);
			} catch (e) {
				console.log(e);
			}
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
