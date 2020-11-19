import React, { useCallback, useEffect, useState } from "react";
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
import * as productActions from "../../store/actions/products";

interface Props {
	navigation: NavigationStackProp;
}
type Params = {};
type ScreenProps = {};

const EditProductScreen: NavigationScreenComponent<Params, ScreenProps> = (
	props: Props
) => {
	const prodId = props.navigation.getParam("productId");

	const editedProduct = useSelector((state: RootState) =>
		state.products.userProducts.find((prod) => prod.id === prodId)
	);
	const [title, setTitle] = useState(
		editedProduct ? editedProduct.title : ""
	);
	const [titleIsValid, setTitleIsValid] = useState(false);
	const [imageUrl, setImageUrl] = useState(
		editedProduct ? editedProduct.imageUrl : ""
	);
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState(
		editedProduct ? editedProduct.description : ""
	);

	const dispatch = useDispatch();
	const submitHandler = useCallback(() => {
		if (!titleIsValid) {
			Alert.alert("Wrong input!", "Plesae check the erros in the form", [
				{ text: "OK" },
			]);
			return;
		}
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
	}, [dispatch, prodId, title, description, imageUrl, price]);

	useEffect(() => {
		props.navigation.setParams({ submit: submitHandler });
	}, [submitHandler]);

	const titleChangeHandler = (text: string) => {
		if (text.trim().length !== 0) {
			setTitleIsValid(true);
		}
		setTitle(text);
	};

	return (
		<ScrollView>
			<View style={styles.form}>
				<View style={styles.formControl}>
					<Text style={styles.label}>Title</Text>
					<TextInput
						style={styles.input}
						value={title}
						onChangeText={titleChangeHandler}
						autoCapitalize="words"
						returnKeyType="next"
					></TextInput>
					{!titleIsValid && <Text>Please enter a valid title!</Text>}
				</View>
				<View style={styles.formControl}>
					<Text style={styles.label}>Image URL</Text>
					<TextInput
						style={styles.input}
						value={imageUrl}
						onChangeText={(text) => setImageUrl(text)}
					></TextInput>
				</View>

				{editedProduct ? null : (
					<View style={styles.formControl}>
						<Text style={styles.label}>Price</Text>
						<TextInput
							style={styles.input}
							value={price}
							onChangeText={(text) => setPrice(text)}
							keyboardType="decimal-pad"
						></TextInput>
					</View>
				)}

				<View style={styles.formControl}>
					<Text style={styles.label}>Description</Text>
					<TextInput
						style={styles.input}
						value={description}
						onChangeText={(text) => setDescription(text)}
					></TextInput>
				</View>
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
});
