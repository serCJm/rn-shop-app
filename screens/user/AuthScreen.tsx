import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useReducer } from "react";
import {
	Button,
	KeyboardAvoidingView,
	ScrollView,
	StyleSheet,
	View,
} from "react-native";
import { NavigationScreenComponent } from "react-navigation";
import { NavigationStackProp } from "react-navigation-stack";
import { useDispatch } from "react-redux";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import { Colors } from "../../constants/Colots";
import * as authActions from "../../store/actions/auth";

interface Props {
	navigation: NavigationStackProp;
}
type Params = {};
type ScreenProps = {};

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

const AuthScreen: NavigationScreenComponent<Params, ScreenProps> = (
	props: Props
) => {
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

	const signupHandler = () => {
		dispatch(
			authActions.signup(
				formState.inputValues.email,
				formState.inputValues.password
			)
		);
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
								onPress={signupHandler}
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