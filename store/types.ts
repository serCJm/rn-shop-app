import Product from "../models/product";

export interface ProductsState {
	availableProducts: Product[];
	userProducts: Product[];
}
