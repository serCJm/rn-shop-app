import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
	NavigationStackProp,
	NavigationStackScreenComponent,
} from "react-navigation-stack";
import { useSelector } from "react-redux";
import { RootState } from "../../App";

interface Props {
	navigation: NavigationStackProp;
}

const ProductDetailScreen: NavigationStackScreenComponent = (props: Props) => {
	const productId = props.navigation.getParam("productId");
	const selectedProduct = useSelector((state: RootState) =>
		state.products.availableProducts.find((prod) => prod.id === productId)
	);
	return (
		<View>
			<Text>{selectedProduct?.title}</Text>
		</View>
	);
};

ProductDetailScreen.navigationOptions = (navData) => {
	return {
		headerTitle: navData.navigation.getParam("productTitle"),
	};
};

export default ProductDetailScreen;

const styles = StyleSheet.create({});
