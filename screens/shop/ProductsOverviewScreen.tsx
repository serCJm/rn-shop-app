import React from "react";
import {
	NavigationStackProp,
	NavigationStackScreenComponent,
} from "react-navigation-stack";
import { FlatList, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../App";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";

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

ProductsOverviewScreen.navigationOptions = (navData) => {
	return {
		headerTitle: "All Products",
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title="Cart"
					iconName={
						Platform.OS === "android" ? "md-cart" : "ios-cart"
					}
					onPress={() => navData.navigation.navigate("Cart")}
				></Item>
			</HeaderButtons>
		),
	};
};

export default ProductsOverviewScreen;
