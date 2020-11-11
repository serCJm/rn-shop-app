import React from "react";
import {
	NavigationStackProp,
	NavigationStackScreenComponent,
} from "react-navigation-stack";
import { FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../App";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";

interface Props {
	navigation: NavigationStackProp;
}

const ProductsOverviewScreen: NavigationStackScreenComponent = (
	props: Props
) => {
	const products = useSelector(
		(state: RootState) => state.products.availableProducts
	);
	const dispatch = useDispatch();

	return (
		<FlatList
			data={products}
			renderItem={(itemData) => (
				<ProductItem
					title={itemData.item.title}
					image={itemData.item.imageUrl}
					price={itemData.item.price}
					onViewDetail={() => {
						props.navigation.navigate("ProductDetail", {
							productId: itemData.item.id,
							productTitle: itemData.item.title,
						});
					}}
					onAddToCard={() =>
						dispatch(cartActions.addToCart(itemData.item))
					}
				></ProductItem>
			)}
		></FlatList>
	);
};

ProductsOverviewScreen.navigationOptions = {
	headerTitle: "All Products",
};

export default ProductsOverviewScreen;
