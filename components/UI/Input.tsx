import React, { useEffect, useReducer } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	TextInputProps,
	View,
} from "react-native";
import { InputUpdateIds } from "../../screens/user/EditProductScreen";

interface Props extends TextInputProps {
	id: InputUpdateIds;
	label: string;
	errorText: string;
	initialValue: string;
	initiallyValid: boolean;
	required?: boolean;
	email?: boolean;
	min?: number;
	max?: number;
	minLength?: number;
	onInputChange: (
		inputIdentifier: InputUpdateIds,
		value: string,
		isValid: boolean
	) => void;
}

interface IInputReducer {
	value: string;
	isValid: boolean;
	touched: boolean;
}

enum ActionTypesEnum {
	inputChange = "INPUT_CHANGE",
	inputBlur = "INPUT_BLUR",
}

interface IInputChangeAction {
	type: typeof ActionTypesEnum.inputChange;
	value: string;
	isValid: boolean;
}
interface IBlurChangeAction {
	type: typeof ActionTypesEnum.inputBlur;
}

type InputReducerActionTypes = IInputChangeAction | IBlurChangeAction;

const inputReducer = (
	state: IInputReducer,
	action: InputReducerActionTypes
): IInputReducer => {
	switch (action.type) {
		case ActionTypesEnum.inputChange:
			return {
				...state,
				value: action.value,
				isValid: action.isValid,
			};
		case ActionTypesEnum.inputBlur:
			return {
				...state,
				touched: true,
			};
		default:
			return state;
	}
};

const Input = (props: Props) => {
	const [inputState, dispatchInputState] = useReducer(inputReducer, {
		value: props.initialValue || "",
		isValid: props.initiallyValid,
		touched: false,
	});

	const { onInputChange, id } = props;

	useEffect(() => {
		if (inputState.touched) {
			onInputChange(id, inputState.value, inputState.isValid);
		}
	}, [inputState, onInputChange, id]);

	const textChangeHandler = (text: string) => {
		const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		let isValid = true;
		if (props.required && text.trim().length === 0) {
			isValid = false;
		}
		if (props.email && !emailRegex.test(text.toLowerCase())) {
			isValid = false;
		}
		if (props.min != null && +text < props.min) {
			isValid = false;
		}
		if (props.max != null && +text > props.max) {
			isValid = false;
		}
		if (props.minLength != null && text.length < props.minLength) {
			isValid = false;
		}
		dispatchInputState({
			type: ActionTypesEnum.inputChange,
			value: text,
			isValid,
		});
	};

	const lostFocusHandler = () => {
		dispatchInputState({ type: ActionTypesEnum.inputBlur });
	};

	return (
		<View style={styles.formControl}>
			<Text style={styles.label}>{props.label}</Text>
			<TextInput
				{...props}
				style={styles.input}
				value={inputState.value}
				onChangeText={textChangeHandler}
				onBlur={lostFocusHandler}
			></TextInput>
			{inputState.touched && !inputState.isValid && (
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>{props.errorText}</Text>
				</View>
			)}
		</View>
	);
};

export default Input;

const styles = StyleSheet.create({
	formControl: {
		width: "100%",
	},
	label: {
		fontFamily: "open-sans-bold",
		marginVertical: 8,
	},
	input: {
		paddingHorizontal: 2,
		paddingVertical: 5,
		borderBottomColor: "#ccc",
		borderBottomWidth: 1,
	},
	errorContainer: {
		marginVertical: 5,
	},
	errorText: {
		fontFamily: "open-sans",
		color: "red",
		fontSize: 14,
	},
});
