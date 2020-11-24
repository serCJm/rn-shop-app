import React, { useEffect } from "react";
import {
	NavigationStackProp,
	NavigationStackScreenProps,
} from "react-navigation-stack";
import { Button, FlatList, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../App";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import * as productActions from "../../store/actions/products";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import { NavigationDrawerScreenProps } from "react-navigation-drawer";
import { NavigationScreenComponent } from "react-navigation";
import { Colors } from "../../constants/Colots";

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

	useEffect(() => {
		dispatch(productActions.fetchProducts());
	}, [dispatch]);

	const selectItemHandler = (id: string, title: string) => {
		props.navigation.navigate("ProductDetail", {
			productId: id,
			productTitle: title,
		});
	};

	return (
		<FlatList
			data={products}
			renderItem={(itemData) => (
				<ProductItem
					title={itemData.item.title}
					image={itemData.item.imageUrl}
					price={itemData.item.price}
					onSelect={() =>
						selectItemHandler(itemData.item.id, itemData.item.title)
					}
				>
					<Button
						color={Colors.PRIMARY}
						title="View Details"
						onPress={() =>
							selectItemHandler(
								itemData.item.id,
								itemData.item.title
							)
						}
					></Button>
					<Button
						color={Colors.ACCENT}
						title="To Cart"
						onPress={() =>
							dispatch(cartActions.addToCart(itemData.item))
						}
					></Button>
				</ProductItem>
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
