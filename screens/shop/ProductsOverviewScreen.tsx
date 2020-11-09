import React from "react";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { FlatList, Text } from "react-native";
import { useSelector } from "react-redux";

import { RootState } from "../../App";

interface Props {}

const ProductsOverviewScreen: NavigationStackScreenComponent = (
	props: Props
) => {
	const products = useSelector(
		(state: RootState) => state.products.availableProducts
	);

	return (
		<FlatList
			data={products}
			renderItem={(itemData) => <Text>{itemData.item.title}</Text>}
		></FlatList>
	);
};

ProductsOverviewScreen.navigationOptions = {
	headerTitle: "All Products",
};

export default ProductsOverviewScreen;
