import React, { useCallback, useEffect, useState } from "react";
import {
	View,
	ActivityIndicator,
	Button,
	FlatList,
	Platform,
	Text,
	StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { RootStackParamList, RootState } from "../../App";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import * as productActions from "../../store/actions/products";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import { Colors } from "../../constants/Colots";
import { StackNavigationProp } from "@react-navigation/stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";

interface Props {
	navigation: StackNavigationProp<RootStackParamList, "ProductsOverview"> &
		DrawerNavigationProp<RootStackParamList, "ProductsOverview">;
}
type Params = {};
type ScreenProps = {};

const ProductsOverviewScreen = (props: Props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);

	const [error, setError] = useState();
	const products = useSelector(
		(state: RootState) => state.products.availableProducts
	);
	const dispatch = useDispatch();

	const loadProducts = useCallback(async () => {
		setError(undefined);
		setIsRefreshing(true);
		try {
			await dispatch(productActions.fetchProducts());
		} catch (err) {
			setError(err.message);
		}
		setIsRefreshing(false);
	}, [dispatch, setIsLoading, setError, setIsLoading]);

	useEffect(() => {
		const willFocusSub = props.navigation.addListener(
			"focus",
			loadProducts
		);
		return willFocusSub;
	}, [loadProducts]);

	useEffect(() => {
		const fetchProducts = async () => {
			setIsLoading(true);

			await loadProducts();
			setIsLoading(false);
		};
		fetchProducts();
	}, [loadProducts]);

	const selectItemHandler = (id: string, title: string) => {
		props.navigation.navigate("ProductDetail", {
			productId: id,
			productTitle: title,
		});
	};

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator
					size="large"
					color={Colors.PRIMARY}
				></ActivityIndicator>
			</View>
		);
	}

	if (error) {
		return (
			<View style={styles.centered}>
				<Text style={styles.text}>Ooops, something went wrong.</Text>
				<Button
					title="Try Again"
					onPress={loadProducts}
					color={Colors.PRIMARY}
				></Button>
			</View>
		);
	}

	if (!isLoading && products.length === 0) {
		return (
			<View style={styles.centered}>
				<Text style={styles.text}>No Products Found.</Text>
			</View>
		);
	}

	return (
		<FlatList
			onRefresh={loadProducts}
			refreshing={isRefreshing}
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

export const productsOverviewScreenOptions = (navData: Props) => {
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

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: "center",
		alignContent: "center",
	},
	text: {
		textAlign: "center",
	},
});
