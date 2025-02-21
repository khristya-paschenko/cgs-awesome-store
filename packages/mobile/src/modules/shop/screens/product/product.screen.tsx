import { View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import {
	NAVIGATION_KEYS,
	RootBottomTabsParamList,
	RootStackParamList,
} from '~/modules/navigation/types';
import React from 'react';
import { useSingleProduct } from '~/shared/hooks/useSingleProduct';
import { styles } from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SubmitButton } from '~/shared/componetnts/ui/submit-btn';
import { ProductDetailsComponent } from '~/shared/componetnts/product-details';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCartStore } from '~/shared/store/cart.store';

type ProductScreenProps = {
	navigation: NativeStackScreenProps<
		RootStackParamList,
		NAVIGATION_KEYS.PRODUCT
	>;
	route: RouteProp<RootBottomTabsParamList, NAVIGATION_KEYS.PRODUCTS>;
};
export const ProductScreen = ({ navigation, route }: ProductScreenProps) => {
	const { id } = route.params;
	const { product, getProduct, isPending } = useSingleProduct();
	const { setCart, cart } = useCartStore((state) => state);
	const [quantity, setQuantity] = React.useState(1);
	React.useEffect(() => {
		if (isPending) return;
		getProduct(id);
	}, []);

	const handleSubmit = () => {
		setCart(product.id, product.price, quantity, product.name);
		navigation.navigate(NAVIGATION_KEYS.CART);
	};

	return (
		<View style={styles.outerContainer}>
			<KeyboardAwareScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ flex: 1 }}
			>
				{!isPending && product && (
					<View style={styles.innerContainer}>
						<ProductDetailsComponent
							product={product}
							onQuantityChange={setQuantity}
						/>
						<SubmitButton
							text="Add to Cart"
							disabled={product.stock === 0}
							onPress={handleSubmit}
						/>
					</View>
				)}
			</KeyboardAwareScrollView>
		</View>
	);
};
