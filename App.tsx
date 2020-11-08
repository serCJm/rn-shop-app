import React from "react";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";

import productsReducer from "./store/reducers/products";

const rootReducer = combineReducers({
	products: productsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default function App() {
	return <Provider store={store}></Provider>;
}
