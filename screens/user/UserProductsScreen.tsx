import { DrawerNavigationProp } from "@react-navigation/drawer";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Button, FlatList, Platform, Alert, View, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import { RootStackParamList, RootState } from "../../App";
import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import { Colors } from "../../constants/Colots";
import * as productActions from "../../store/actions/products";

interface Props {
	navigation: StackNavigationProp<RootStackParamList, "UserProducts"> &
		DrawerNavigationProp<RootStackParamList, "UserProducts">;
}

const UserProductsScreen = (props: Props) => {
	const userProducts = useSelector(
		(state: RootState) => state.products.userProducts
	);
	const dispatch = useDispatch();
	const editProductHandler = (id: string) => {
		props.navigation.navigate("EditProduct", { productId: id });
	};
	const deleteHandler = (id: string) => {
		Alert.alert("Are you sure?", "Do you really want to delete?", [
			{ text: "No", style: "default" },
			{
				text: "Yes",
				style: "destructive",
				onPress: () => {
					dispatch(productActions.deleteProduct(id));
				},
			},
		]);
	};

	if (userProducts.length === 0) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text>No Products Found!</Text>
			</View>
		);
	}

	return (
		<FlatList
			data={userProducts}
			keyExtractor={(item) => item.id}
			renderItem={(itemData) => (
				<ProductItem
					image={itemData.item.imageUrl}
					title={itemData.item.title}
					price={itemData.item.price}
					onSelect={() => editProductHandler(itemData.item.id)}
				>
					<Button
						color={Colors.PRIMARY}
						title="Edit"
						onPress={() => editProductHandler(itemData.item.id)}
					></Button>
					<Button
						color={Colors.ACCENT}
						title="Delete"
						onPress={() => deleteHandler(itemData.item.id)}
					></Button>
				</ProductItem>
			)}
		></FlatList>
	);
};

export const userProductsScreenOptions = (navData: Props) => {
	return {
		headerTitle: "Your Products",
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
					title="Menu"
					iconName={
						Platform.OS === "android" ? "md-create" : "ios-create"
					}
					onPress={() => navData.navigation.navigate("EditProduct")}
				></Item>
			</HeaderButtons>
		),
	};
};

export default UserProductsScreen;
