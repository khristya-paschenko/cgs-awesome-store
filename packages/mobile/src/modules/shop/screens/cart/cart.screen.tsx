import { FlatList, Text, View } from 'react-native';
import { styles } from './styles';
import { SubmitButton } from '~/shared/componetnts/ui/submit-btn';
import { useCartStore } from '~/shared/store/cart.store';
import { CartItemComponent } from '~/shared/componetnts/cart-item';
import React from 'react';
import { useCreateOrder } from '~/shared/hooks/useCreateOrder';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from '~/modules/navigation/types';

type CartScreenProps = {
	navigation: NativeStackScreenProps<
		RootStackParamList,
		NAVIGATION_KEYS.CART
	>;
};
export const CartScreen = ({ navigation }: CartScreenProps) => {
	const { cart, total, removeCartItem } = useCartStore((state) => state);
	const { isPending, onSubmit } = useCreateOrder();

	const handleSubmit = () => {
		onSubmit({
			orderDetails: cart.map(({ productId, quantity }) => ({
				productId,
				quantity,
			})),
		});
	};

	const handlePress = (productId, quantity, price, name) => {
		navigation.navigate(NAVIGATION_KEYS.CART_ITEM, {
			productId,
			quantity,
			price,
			name,
		});
	};
	return (
		<View style={styles.outerContainer}>
			<View style={styles.innerContainer}>
				<View style={styles.cartsContainer}>
					<Text style={styles.amount}>Total Amount: ${total}</Text>

					<FlatList
						data={cart}
						renderItem={(cart) => (
							<CartItemComponent
								name={cart.item.name}
								price={cart.item.price}
								quantity={cart.item.quantity}
								disabled={false}
								onPress={() =>
									handlePress(
										cart.item.productId,
										cart.item.quantity,
										cart.item.price,
										cart.item.name,
									)
								}
								onDelete={() =>
									removeCartItem(cart.item.productId)
								}
							/>
						)}
						keyExtractor={(item) => item.productId}
						showsVerticalScrollIndicator={false}
						ListEmptyComponent={
							<Text style={styles.noFound}>
								No products found.
							</Text>
						}
					/>
				</View>
				<SubmitButton
					text={isPending ? 'Creating Order...' : 'Create Order'}
					disabled={cart.length === 0 || isPending}
					onPress={handleSubmit}
				/>
			</View>
		</View>
	);
};
