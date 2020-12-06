import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
	NavigationActions,
	NavigationContainerComponent,
} from "react-navigation";
import { useSelector } from "react-redux";
import { RootState } from "../App";
import ShopNavigator from "./ShopNavigator";

interface Props {}

const NavigationContainer = (props: Props) => {
	const isAuth = useSelector((state: RootState) => !!state.auth.token);
	const navRef: React.RefObject<NavigationContainerComponent> | null = useRef() as React.RefObject<NavigationContainerComponent> | null;
	useEffect(() => {
		if (!isAuth && navRef) {
			navRef?.current?.dispatch(
				NavigationActions.navigate({ routeName: "Auth" })
			);
		}
	}, [isAuth]);
	return <ShopNavigator ref={navRef}></ShopNavigator>;
};

export default NavigationContainer;

const styles = StyleSheet.create({});
