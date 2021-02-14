import { DrawerNavigationProp } from "@react-navigation/drawer";
import { StackNavigationProp } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useReducer, useState, useEffect } from "react";
import {
	ActivityIndicator,
	Alert,
	Button,
	KeyboardAvoidingView,
	ScrollView,
	StyleSheet,
	View,
} from "react-native";
import { useDispatch } from "react-redux";
import { RootStackParamList } from "../../App";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import { Colors } from "../../constants/Colots";
import * as authActions from "../../store/actions/auth";

interface Props {
	navigation: StackNavigationProp<RootStackParamList, "Auth"> &
		DrawerNavigationProp<RootStackParamList, "Auth">;
}

enum FormReducerActions {
	REDUCER_UPDATE = "UPDATE",
}

interface IUpdateFormReducer {
	type: typeof FormReducerActions.REDUCER_UPDATE;
	value: string;
	isValid: boolean;
	input: string;
}

type FormReducerActionTypes = IUpdateFormReducer;

interface IReducerState {
	inputValues: {
		email: string;
		password: string;
	};
	inputValidities: {
		email: boolean;
		password: boolean;
	};
	formIsValid: boolean;
}

const formReducer = (
	state: IReducerState,
	action: FormReducerActionTypes
): IReducerState => {
	if (action.type === FormReducerActions.REDUCER_UPDATE) {
		const updatedValues = {
			...state.inputValues,
			[action.input]: action.value,
		};
		const updatedValidities = {
			...state.inputValidities,
			[action.input]: action.isValid,
		};
		let formIsValid = true;
		for (const val of Object.values(updatedValidities)) {
			formIsValid = formIsValid && !!val;
		}
		return {
			inputValues: updatedValues,
			inputValidities: updatedValidities,
			formIsValid,
		};
	}
	return state;
};

const AuthScreen = (props: Props) => {
	const [loading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const [isSignUp, setIsSignUp] = useState(false);
	const dispatch = useDispatch();
	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			email: "",
			password: "",
		},
		inputValidities: {
			email: false,
			password: false,
		},
		formIsValid: false,
	});

	useEffect(() => {
		if (error) {
			Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
		}
	}, [error]);

	const authHandler = async () => {
		let action;
		setError(undefined);
		setIsLoading(true);
		if (isSignUp) {
			action = authActions.signup(
				formState.inputValues.email,
				formState.inputValues.password
			);
		} else {
			action = authActions.login(
				formState.inputValues.email,
				formState.inputValues.password
			);
		}
		try {
			await dispatch(action);
			// props.navigation.navigate("Shop");
		} catch (e) {
			setError(e.message);
			setIsLoading(false);
		}
	};

	const inputChangeHandler = useCallback(
		(
			inputIdentifier: string,
			inputValue: string,
			inputValidity: boolean
		) => {
			// note, will run after leave focus
			// so won't update state if trying to save
			// before triggering finishing input
			// will need to change
			dispatchFormState({
				type: FormReducerActions.REDUCER_UPDATE,
				value: inputValue,
				isValid: inputValidity,
				input: inputIdentifier,
			});
		},
		[dispatchFormState]
	);

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
							onInputChange={inputChangeHandler}
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
							onInputChange={inputChangeHandler}
							initialValue=""
							initiallyValid={true}
						></Input>
						<View style={styles.buttonContainer}>
							{loading ? (
								<ActivityIndicator
									size="small"
									color={Colors.PRIMARY}
								></ActivityIndicator>
							) : (
								<Button
									title={isSignUp ? "SIGNUP" : "LOGIN"}
									color={Colors.PRIMARY}
									onPress={authHandler}
								></Button>
							)}
						</View>
						<View style={styles.buttonContainer}>
							<Button
								title={`Switch to ${
									isSignUp ? "LOGIN" : "SIGNUP"
								}`}
								color={Colors.ACCENT}
								onPress={() =>
									setIsSignUp((prevState) => !prevState)
								}
							></Button>
						</View>
					</ScrollView>
				</Card>
			</LinearGradient>
		</KeyboardAvoidingView>
	);
};

export const authScreenOptions = {
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
