import {
	NAVIGATION_KEYS,
	RootBottomTabsParamList,
	RootNavigation,
} from '~/modules/navigation/types';
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProductsScreen } from '~/modules/shop/screens/products/products.screen';
import { useMemo } from 'react';
import { OrdersScreen } from '~/modules/shop/screens/orders/orders.screen';
import { SettingsScreen } from '~/modules/shop/screens/settings/settings.screen';
import { CartButton } from '~/shared/componetnts/ui/cart-btn/cart-button.component';
import { COLORS, FONTS } from '~/shared/styles';
import ProductsIcon from '~/../assets/icons/ProductsIcon.svg';
import OrderIcon from '~/../assets/icons/OrdersIcon.svg';
import SettingsIcon from '~/../assets/icons/SettingsIcon.svg';

const BottomTabs = createBottomTabNavigator<RootBottomTabsParamList>();

export const BottomTabsNavigator = () => {
	const screens = useMemo(() => {
		return (
			<>
				<BottomTabs.Screen
					name={NAVIGATION_KEYS.PRODUCTS}
					component={ProductsScreen}
					options={{
						title: 'Products',
						tabBarIcon: ({ color }) => (
							<ProductsIcon width={20} height={21} fill={color} />
						),
					}}
				/>
				<BottomTabs.Screen
					name={NAVIGATION_KEYS.ORDERS}
					component={OrdersScreen}
					options={{
						title: 'Orders',
						tabBarIcon: ({ color }) => (
							<OrderIcon width={20} height={24} fill={color} />
						),
					}}
				/>
				<BottomTabs.Screen
					name={NAVIGATION_KEYS.SETTINGS}
					component={SettingsScreen}
					options={{
						title: 'Settings',
						tabBarIcon: ({ color }) => (
							<SettingsIcon
								width={20}
								height={21}
								stroke={color}
							/>
						),
					}}
				/>
			</>
		);
	}, []);
	return (
		<BottomTabs.Navigator
			screenOptions={({
				navigation,
			}: {
				navigation: RootNavigation;
			}) => ({
				headerRight: () => (
					<CartButton
						color={COLORS.iconDarkBlue}
						width={26}
						height={25}
						onPress={() =>
							navigation.navigate(NAVIGATION_KEYS.CART)
						}
					/>
				),
				headerShown: true,
				tabBarLabelStyle: {
					fontFamily: FONTS.poppins.regular,
					fontSize: 16,
				},
				tabBarActiveTintColor: COLORS.activeBtn,
				tabBarInactiveTintColor: COLORS.text,
				headerTitleStyle: {
					fontFamily: FONTS.poppins.bold,
					fontSize: 24,
					color: COLORS.text,
				},
				headerStyle: {
					backgroundColor: COLORS.bgBlue,
					shadowColor: 'transparent',
				},
				tabBarStyle: {
					backgroundColor: COLORS.bgWhite,
					shadowColor: 'transparent',
				},
			})}
		>
			{screens}
		</BottomTabs.Navigator>
	);
};
