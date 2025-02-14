import { Pressable, View, Text } from 'react-native';
import { styles } from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ProductDetailsComponent } from '~/shared/componetnts/product-details';
import { useSingleProduct } from '~/shared/hooks/useSingleProduct';
import { SubmitButton } from '~/shared/componetnts/ui/submit-btn';
import { RouteProp } from '@react-navigation/native';
import {
	NAVIGATION_KEYS,
	RootBottomTabsParamList,
	RootStackParamList,
} from '~/modules/navigation/types';
import React from 'react';
import { useCartStore } from '~/shared/store/cart.store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS } from '~/shared/styles';

type CartItemScreenProps = {
	navigation: NativeStackScreenProps<
		RootStackParamList,
		NAVIGATION_KEYS.CART_ITEM
	>;
	route: RouteProp<RootBottomTabsParamList, NAVIGATION_KEYS.CART>;
};
export const CartItemScreen = ({ navigation, route }: CartItemScreenProps) => {
	const cart = route.params;
	const { product, getProduct, isPending } = useSingleProduct();
	const [quantity, setQuantity] = React.useState(cart.quantity);
	const { removeCartItem, setCart } = useCartStore((state) => state);

	React.useEffect(() => {
		getProduct(cart.productId);
	}, []);

	const handleRemove = () => {
		removeCartItem(cart.productId);
		navigation.goBack();
	};

	// TODO: update cart item
	const handleSave = () => {
		// setCart(cart.productId, cart.price, cart.quantity, cart.name);
		navigation.goBack();
	};

	return (
		<View style={styles.outerContainer}>
			<KeyboardAwareScrollView
				contentContainerStyle={{
					flex: 1,
				}}
			>
				<View style={styles.innerContainer}>
					{!isPending && product && (
						<View style={styles.infoContainer}>
							<ProductDetailsComponent
								product={product}
								onQuantityChange={setQuantity}
								selectedQuantity={quantity}
							/>

							<Pressable
								style={{ flex: 1 }}
								onPress={handleRemove}
							>
								<Text style={styles.removeBtn}>
									Remove from the cart
								</Text>
							</Pressable>
						</View>
					)}

					<SubmitButton
						text="Save"
						disabled={isPending}
						onPress={() => navigation.goBack()}
					/>
				</View>
			</KeyboardAwareScrollView>
		</View>
	);
};
