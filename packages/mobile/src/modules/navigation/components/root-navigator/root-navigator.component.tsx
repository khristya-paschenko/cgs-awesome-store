import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavContainer } from '../nav-container/nav-container.component';
import {
	NAVIGATION_KEYS,
	RootNavigation,
	RootStackParamList,
} from '~/modules/navigation/types';
import { LoginScreen } from '~/modules/auth/screens/login/login.screen';
import { BottomTabsNavigator } from '~/modules/navigation/components/nav-bottom-tabs/nav-bottom-tabs-container.component';
import { CartScreen } from '~/modules/shop/screens/cart/cart.screen';
import { SCREEN_OPTIONS } from '~/modules/navigation/constants/screen-options';
import { SignupScreen } from '~/modules/auth/screens/signup/signup.screen';
import { EmailVerificationScreen } from '~/modules/auth/screens/email-verification/email-verification.screen';
import { ConfirmScreen } from '~/modules/auth/screens/confirm/confirm.screen';
import { useAuthStore } from '~/shared/store';
import { ProductScreen } from '~/modules/shop/screens/product/product.screen';
import { COLORS, FONTS } from '~/shared/styles';
import { BackButton } from '~/shared/componetnts/ui/back-btn';
import { CartItemScreen } from '~/modules/shop/screens/cart-item/cart-item.screen';
import { OrderDetailsScreen } from '~/modules/shop/screens/order-details/order-details.screen';
import { EditOrderScreen } from '~/modules/shop/screens/edit-order/edit-order.screen';
import { PaymentScreen } from '~/modules/shop/screens/payment/payment.screen';

const Stack = createNativeStackNavigator<RootStackParamList>();
export const RootNavigator = () => {
	const isAuth = useAuthStore((state) => state.isAuth);
	const publicScreens = React.useMemo(() => {
		return (
			<>
				<Stack.Screen
					name={NAVIGATION_KEYS.LOGIN}
					component={LoginScreen}
					options={SCREEN_OPTIONS}
				/>

				<Stack.Screen
					name={NAVIGATION_KEYS.SIGNUP}
					component={SignupScreen}
					options={SCREEN_OPTIONS}
				/>

				<Stack.Screen
					name={NAVIGATION_KEYS.VERIFY}
					component={EmailVerificationScreen}
					options={SCREEN_OPTIONS}
				/>

				<Stack.Screen
					name={NAVIGATION_KEYS.CONFIRM}
					component={ConfirmScreen}
					options={SCREEN_OPTIONS}
				/>
			</>
		);
	}, []);

	const privateScreens = React.useMemo(() => {
		return (
			<>
				<Stack.Screen
					name={NAVIGATION_KEYS.TABS}
					component={BottomTabsNavigator}
					options={SCREEN_OPTIONS}
				/>

				<Stack.Screen
					name={NAVIGATION_KEYS.CART}
					component={CartScreen}
					options={{
						title: 'Cart',
					}}
				/>

				<Stack.Screen
					name={NAVIGATION_KEYS.PRODUCT}
					component={ProductScreen}
					options={{
						title: 'Product Information',
					}}
				/>

				<Stack.Screen
					name={NAVIGATION_KEYS.CART_ITEM}
					component={CartItemScreen}
					options={{
						title: 'Edit Cart Item',
					}}
				/>

				<Stack.Screen
					name={NAVIGATION_KEYS.ORDER_DETAILS}
					component={OrderDetailsScreen}
					options={{ title: 'Order Details' }}
				/>

				<Stack.Screen
					name={NAVIGATION_KEYS.EDIT_ORDER}
					component={EditOrderScreen}
					options={{ title: 'Edit Order Item' }}
				/>

				<Stack.Screen
					name={NAVIGATION_KEYS.PAYMENT_CONFIRM}
					component={PaymentScreen}
					options={SCREEN_OPTIONS}
				/>
			</>
		);
	}, []);

	return (
		<NavContainer>
			<Stack.Navigator
				screenOptions={({
					navigation,
				}: {
					navigation: RootNavigation;
				}) => ({
					headerLeft: () => (
						<BackButton onPress={navigation.goBack} />
					),
					headerTitleStyle: {
						fontFamily: FONTS.poppins.bold,
						fontSize: 24,
						color: COLORS.text,
					},
					headerBackVisible: false,
					headerStyle: {
						backgroundColor: COLORS.bgBlue,
					},
					headerShadowVisible: false,
				})}
			>
				{isAuth ? privateScreens : publicScreens}
			</Stack.Navigator>
		</NavContainer>
	);
};
