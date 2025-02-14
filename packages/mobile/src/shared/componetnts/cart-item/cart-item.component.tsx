import { Product } from '~/modules/services/products';
import { Pressable, Text, View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { useCartStore } from '~/shared/store/cart.store';
import DeleteIcon from '~/../assets/icons/DeleteIcon.svg';
import { COLORS } from '~/shared/styles';

type CartItemProps = {
	name: string;
	price: number;
	quantity: number;
	onPress?: () => void;
	disabled: boolean;
	onDelete: () => void;
};
export const CartItemComponent = ({
	name,
	price,
	quantity,
	onDelete,
	onPress,
	disabled,
}: CartItemProps) => {
	const removeCartItem = useCartStore((state) => state.removeCartItem);

	return (
		<Pressable
			disabled={disabled}
			style={styles.container}
			onPress={onPress ? onPress : () => {}}
		>
			<View>
				<Text style={styles.text}>{name}</Text>
				<View style={styles.infoContainer}>
					<Text style={styles.heading}>
						Total: {''}
						<Text style={styles.text}>${price * quantity}</Text>
					</Text>
					<Text style={styles.heading}>
						Amount: {''}
						<Text style={styles.text}>{quantity}</Text>
					</Text>
				</View>
			</View>
			<Pressable onPress={onDelete}>
				<DeleteIcon fill={COLORS.lightRed} width={20} height={20} />
			</Pressable>
		</Pressable>
	);
};
