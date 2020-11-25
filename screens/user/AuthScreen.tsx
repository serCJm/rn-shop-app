import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
	Button,
	KeyboardAvoidingView,
	ScrollView,
	StyleSheet,
	View,
} from "react-native";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import { Colors } from "../../constants/Colots";

interface Props {}

const AuthScreen = (props: Props) => {
	return (
		<KeyboardAvoidingView
			behavior="padding"
			keyboardVerticalOffset={50}
			style={styles.screen}
		>
			<LinearGradient
				colors={["#ffedff", "#ffe3ff"]}
				style={styles.gradient}
			>
				<Card style={styles.authContainer}>
					<ScrollView>
						<Input
							id="email"
							label="Email"
							keyboardType="email-address"
							required
							email
							autoCapitalize="none"
							errorText="Please enter a valid email address!"
							onInputChange={() => {}}
							initialValue=""
							initiallyValid={true}
						></Input>
						<Input
							id="password"
							label="Password"
							keyboardType="default"
							secureTextEntry
							minLength={8}
							required
							autoCapitalize="none"
							errorText="Please enter a valid password!"
							onInputChange={() => {}}
							initialValue=""
							initiallyValid={true}
						></Input>
						<View style={styles.buttonContainer}>
							<Button
								title="Login"
								color={Colors.PRIMARY}
								onPress={() => {}}
							></Button>
						</View>
						<View style={styles.buttonContainer}>
							<Button
								title="Switch To Sign Up"
								color={Colors.ACCENT}
								onPress={() => {}}
							></Button>
						</View>
					</ScrollView>
				</Card>
			</LinearGradient>
		</KeyboardAvoidingView>
	);
};

AuthScreen.navigationOptions = {
	headerTitle: "Login",
};

export default AuthScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	gradient: {
		flex: 1,
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	authContainer: {
		width: "80%",
		maxWidth: 400,
		maxHeight: 400,
		padding: 20,
	},
	buttonContainer: {
		marginTop: 20,
	},
});
