import React from "react";
import {
	Button,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import {
	NavigationStackProp,
	NavigationStackScreenComponent,
} from "react-navigation-stack";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../App";
import { Colors } from "../../constants/Colots";
import * as cartActions from "../../store/actions/cart";

interface Props {
	navigation: NavigationStackProp;
}

const ProductDetailScreen: NavigationStackScreenComponent = (props: Props) => {
	const productId = props.navigation.getParam("productId");
	const selectedProduct = useSelector((state: RootState) =>
		state.products.availableProducts.find((prod) => prod.id === productId)
	);
	const dispatch = useDispatch();
	return (
		<ScrollView>
			<Image
				style={styles.image}
				source={{ uri: selectedProduct?.imageUrl }}
			/>
			<View style={styles.actions}>
				<Button
					color={Colors.PRIMARY}
					title="Add to Cart"
					onPress={() => {
						if (selectedProduct)
							dispatch(cartActions.addToCart(selectedProduct));
					}}
				></Button>
			</View>
			<Text style={styles.price}>
				${selectedProduct?.price.toFixed(2)}
			</Text>
			<Text style={styles.description}>
				{selectedProduct?.description}
			</Text>
		</ScrollView>
	);
};

ProductDetailScreen.navigationOptions = (navData) => {
	return {
		headerTitle: navData.navigation.getParam("productTitle"),
	};
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
	image: {
		width: "100%",
		height: 300,
	},
	actions: {
		marginVertical: 20,
		alignItems: "center",
	},
	price: {
		fontSize: 20,
		color: "#888",
		textAlign: "center",
		marginVertical: 20,
		fontFamily: "open-sans-bold",
	},
	description: {
		fontFamily: "open-sans",
		fontSize: 14,
		textAlign: "center",
		marginHorizontal: 20,
	},
});
