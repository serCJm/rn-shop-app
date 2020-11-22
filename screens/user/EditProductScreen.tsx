import React, { useCallback, useEffect, useReducer, useState } from "react";
import { Alert, Platform, StyleSheet, Text, View } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { NavigationScreenComponent } from "react-navigation";
import { NavigationDrawerScreenProps } from "react-navigation-drawer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import {
	NavigationStackProp,
	NavigationStackScreenProps,
} from "react-navigation-stack";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../App";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import Input from "../../components/UI/Input";
import * as productActions from "../../store/actions/products";

interface Props {
	navigation: NavigationStackProp;
}
type Params = {};
type ScreenProps = {};

export enum InputUpdateIds {
	title = "title",
	imageUrl = "imageUrl",
	desc = "description",
	price = "price",
}

enum FormReducerActions {
	REDUCER_UPDATE = "UPDATE",
}

interface IUpdateFormReducer {
	type: typeof FormReducerActions.REDUCER_UPDATE;
	value: string;
	isValid: boolean;
	input: InputUpdateIds;
}

type FormReducerActionTypes = IUpdateFormReducer;

interface IReducerState {
	inputValues: {
		title: string;
		imageUrl: string;
		description: string;
		price: string;
	};
	inputValidities: {
		title: boolean;
		imageUrl: boolean;
		description: boolean;
		price: boolean;
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
		for (let val of Object.values(updatedValidities)) {
			formIsValid = formIsValid && val;
		}
		return {
			inputValues: updatedValues,
			inputValidities: updatedValidities,
			formIsValid,
		};
	}
	return state;
};

const EditProductScreen: NavigationScreenComponent<Params, ScreenProps> = (
	props: Props
) => {
	const prodId = props.navigation.getParam("productId");

	const editedProduct = useSelector((state: RootState) =>
		state.products.userProducts.find((prod) => prod.id === prodId)
	);

	const dispatch = useDispatch();

	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			title: editedProduct ? editedProduct.title : "",
			imageUrl: editedProduct ? editedProduct.imageUrl : "",
			description: editedProduct ? editedProduct.description : "",
			price: "",
		},
		inputValidities: {
			title: editedProduct ? true : false,
			imageUrl: editedProduct ? true : false,
			description: editedProduct ? true : false,
			price: editedProduct ? true : false,
		},
		formIsValid: editedProduct ? true : false,
	});

	const submitHandler = useCallback(() => {
		if (!formState.formIsValid) {
			Alert.alert("Wrong input!", "Please check the errors in the form", [
				{ text: "OK" },
			]);
			return;
		}
		const { title, description, imageUrl, price } = formState.inputValues;
		if (editedProduct) {
			dispatch(
				productActions.updateProduct(
					prodId,
					title,
					description,
					imageUrl
				)
			);
		} else {
			dispatch(
				productActions.createProduct(
					title,
					description,
					imageUrl,
					+price
				)
			);
		}
		props.navigation.goBack();
	}, [dispatch, prodId, formState]);

	useEffect(() => {
		props.navigation.setParams({ submit: submitHandler });
	}, [submitHandler]);

	const inputChangeHandler = useCallback(
		(
			inputIdentifier: InputUpdateIds,
			inputValue: string,
			inputValidity: boolean
		) => {
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
		<ScrollView>
			<View style={styles.form}>
				<Input
					id={InputUpdateIds.title}
					label="Title"
					errorText="Please enter a valid title!"
					autoCapitalize="words"
					returnKeyType="next"
					onInputChange={inputChangeHandler}
					initialValue={editedProduct ? editedProduct.title : ""}
					initiallyValid={!!editedProduct}
					required
				></Input>
				<Input
					id={InputUpdateIds.imageUrl}
					label="Image URL"
					errorText="Please enter a valid image URL!"
					returnKeyType="next"
					onInputChange={inputChangeHandler}
					initialValue={editedProduct ? editedProduct.imageUrl : ""}
					initiallyValid={!!editedProduct}
					required
				></Input>

				{editedProduct ? null : (
					<Input
						id={InputUpdateIds.price}
						label="Price"
						errorText="Please enter a valid image price!"
						onInputChange={inputChangeHandler}
						initialValue={""}
						initiallyValid={!!editedProduct}
						keyboardType="decimal-pad"
						min={0.1}
					></Input>
				)}
				<Input
					id={InputUpdateIds.desc}
					label="Description"
					errorText="Please enter a valid description!"
					onInputChange={inputChangeHandler}
					initialValue={
						editedProduct ? editedProduct.description : ""
					}
					initiallyValid={!!editedProduct}
					autoCorrect
					multiline
					numberOfLines={5}
					required
					minLength={5}
				></Input>
			</View>
		</ScrollView>
	);
};

type navOptions = NavigationStackScreenProps & NavigationDrawerScreenProps;

EditProductScreen.navigationOptions = (navData: navOptions) => {
	const submitFn = navData.navigation.getParam("submit");
	return {
		headerTitle: navData.navigation.getParam("productId")
			? "Edit Product"
			: "Add Product",
		headerLeft: () => (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title="Menu"
					iconName={
						Platform.OS === "android" ? "md-menu" : "ios-cart"
					}
					onPress={() => navData.navigation.toggleDrawer()}
				></Item>
			</HeaderButtons>
		),
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title="Save"
					iconName={
						Platform.OS === "android"
							? "md-checkmark"
							: "ios-checkmark"
					}
					onPress={submitFn}
				></Item>
			</HeaderButtons>
		),
	};
};

export default EditProductScreen;

const styles = StyleSheet.create({
	form: {
		margin: 20,
	},
});
