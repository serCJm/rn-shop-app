import React from "react";
import {
	NavigationStackOptions,
	NavigationStackProp,
	NavigationStackScreenComponent,
	NavigationStackScreenProps,
} from "react-navigation-stack";
import { FlatList, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../App";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import { NavigationDrawerScreenProps } from "react-navigation-drawer";
import { NavigationScreenComponent } from "react-navigation";

interface Props {
	navigation: NavigationStackProp;
}
type Params = {};
type ScreenProps = {};

const ProductsOverviewScreen: NavigationScreenComponent<Params, ScreenProps> = (
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

type navOptions = NavigationStackScreenProps & NavigationDrawerScreenProps;

ProductsOverviewScreen.navigationOptions = (navData: navOptions) => {
	return {
		headerTitle: "All Products",
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
