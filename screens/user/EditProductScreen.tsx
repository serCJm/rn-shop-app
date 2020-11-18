import React, { useCallback, useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { NavigationScreenComponent } from "react-navigation";
import { NavigationDrawerScreenProps } from "react-navigation-drawer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import {
	NavigationStackProp,
	NavigationStackScreenProps,
} from "react-navigation-stack";
import { useSelector } from "react-redux";
import { RootState } from "../../App";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";

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
	const [imageUrl, setImageUrl] = useState(
		editedProduct ? editedProduct.imageUrl : ""
	);
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState(
		editedProduct ? editedProduct.description : ""
	);

	const submitHandler = useCallback(() => {
		console.log("Submitting!");
	}, []);

	useEffect(() => {
		props.navigation.setParams({ submit: submitHandler });
	}, [submitHandler]);

	return (
		<ScrollView>
			<View style={styles.form}>
				<View style={styles.formControl}>
					<Text style={styles.label}>Title</Text>
					<TextInput
						style={styles.input}
						value={title}
						onChangeText={(text) => setTitle(text)}
					></TextInput>
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
