import React from "react";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { FlatList, Text } from "react-native";
import { useSelector } from "react-redux";

import { RootState } from "../../App";
import ProductItem from "../../components/shop/ProductItem";

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
			renderItem={(itemData) => (
				<ProductItem
					title={itemData.item.title}
					image={itemData.item.imageUrl}
					price={itemData.item.price}
					onViewDetail={() => {}}
					onAddToCard={() => {}}
				></ProductItem>
			)}
		></FlatList>
	);
};

ProductsOverviewScreen.navigationOptions = {
	headerTitle: "All Products",
};

export default ProductsOverviewScreen;
