import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum NAVIGATION_KEYS {
	LOGIN = 'LOGIN',
	SIGNUP = 'SIGNUP',
	VERIFY = 'VERIFY',
	CONFIRM = 'CONFIRM',
	PRODUCTS = 'PRODUCTS',
	PRODUCT = 'PRODUCT',
	TABS = 'TABS',
	ORDERS = 'ORDERS',
	ORDER_DETAILS = 'ORDER_DETAILS',
	EDIT_ORDER = 'EDIT_ORDER',
	SETTINGS = 'SETTINGS',
	PERSONAL_INFO = 'PERSONAL_INFO',
	CHANGE_PASSWORD = 'CHANGE_PASSWORD',
	FAQ = 'FAQ',
	CART = 'CART',
	CART_ITEM = 'CART_ITEM',
	PAYMENT_CONFIRM = 'PAYMENT_COMPLETE',
}

export type RootStackParamList = {
	[NAVIGATION_KEYS.LOGIN]: undefined;
	[NAVIGATION_KEYS.SIGNUP]: undefined;
	[NAVIGATION_KEYS.VERIFY]: { email: string };
	[NAVIGATION_KEYS.CONFIRM]: undefined;
	[NAVIGATION_KEYS.CART]: undefined;
	[NAVIGATION_KEYS.TABS]: undefined;
	[NAVIGATION_KEYS.PRODUCT]: { id: string };
	[NAVIGATION_KEYS.CART_ITEM]: {
		productId: string;
		quantity: number;
		price: number;
		name: string;
	};
	[NAVIGATION_KEYS.ORDER_DETAILS]: { id: string };
	[NAVIGATION_KEYS.EDIT_ORDER]: { id: string };
	[NAVIGATION_KEYS.PAYMENT_CONFIRM]: undefined;
	[NAVIGATION_KEYS.PERSONAL_INFO]: undefined;
	[NAVIGATION_KEYS.CHANGE_PASSWORD]: undefined;
	[NAVIGATION_KEYS.FAQ]: undefined;
};

export type RootBottomTabsParamList = {
	[NAVIGATION_KEYS.PRODUCTS]: undefined;
	[NAVIGATION_KEYS.ORDERS]: undefined;
	[NAVIGATION_KEYS.SETTINGS]: undefined;
};

export type RootNavigation =
	NativeStackScreenProps<RootStackParamList>['navigation'];
