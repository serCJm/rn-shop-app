import React from "react";
import {
	Button,
	FlatList,
	Platform,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { NavigationScreenComponent } from "react-navigation";
import { NavigationDrawerScreenProps } from "react-navigation-drawer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { useSelector } from "react-redux";
import { RootState } from "../../App";
import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import { Colors } from "../../constants/Colots";

interface Props {}
type Params = {};
type ScreenProps = {};

const UserProductsScreen: NavigationScreenComponent<Params, ScreenProps> = (
	props: Props
) => {
	const userProducts = useSelector(
		(state: RootState) => state.products.userProducts
	);
	return (
		<FlatList
			data={userProducts}
			keyExtractor={(item) => item.id}
			renderItem={(itemData) => (
				<ProductItem
					image={itemData.item.imageUrl}
					title={itemData.item.title}
					price={itemData.item.price}
					onSelect={() => {}}
				>
					<Button
						color={Colors.PRIMARY}
						title="Edit"
						onPress={() => {}}
					></Button>
					<Button
						color={Colors.ACCENT}
						title="Delete"
						onPress={() => {}}
					></Button>
				</ProductItem>
			)}
		></FlatList>
	);
};

type navOptions = NavigationStackScreenProps & NavigationDrawerScreenProps;

UserProductsScreen.navigationOptions = (navData: navOptions) => {
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
	};
};

export default UserProductsScreen;

const styles = StyleSheet.create({});
