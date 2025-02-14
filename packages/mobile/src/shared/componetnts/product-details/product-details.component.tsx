import { Pressable, Text, View } from 'react-native';
import { styles } from './styles';
import { Product } from '~/modules/services/products';
import { useState } from 'react';
import MinusIcon from '~/../assets/icons/MinusIcon.svg';
import PlusIcon from '~/../assets/icons/PlusIcon.svg';
import { COLORS } from '~/shared/styles';

type ProductDetailsProps = {
	product: Product;
	onQuantityChange: (quantity: number) => void;
	selectedQuantity?: number;
};
export const ProductDetailsComponent = ({
	product,
	onQuantityChange,
	selectedQuantity,
}: ProductDetailsProps) => {
	const [quantity, setQuantity] = useState(() => {
		if (selectedQuantity > 0) {
			return selectedQuantity;
		}
		return product.stock > 0 ? 1 : 0;
	});
	const handleIncrease = () => {
		if (quantity < product.stock) {
			const newQuantity = quantity + 1;
			setQuantity(newQuantity);
			onQuantityChange(newQuantity);
		}
	};

	const handleDecrease = () => {
		if (quantity > 1) {
			const newQuantity = quantity - 1;
			setQuantity(newQuantity);
			onQuantityChange(newQuantity);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.infoContainer}>
				<View>
					<Text style={styles.heading}>Name:</Text>
					<Text style={styles.text}>{product.name}</Text>
				</View>
				<View>
					<Text style={styles.heading}>Description:</Text>
					<Text style={styles.text}>{product.description}</Text>
				</View>
				<View>
					<Text style={styles.heading}>In Stock:</Text>
					<Text style={styles.text}>{product.stock}</Text>
				</View>
				<View>
					<Text style={styles.heading}>Price:</Text>
					<Text style={styles.text}>${product.price}</Text>
				</View>
				<View>
					<Text style={styles.heading}>Category:</Text>
					<Text style={styles.text}>{product.category}</Text>
				</View>
			</View>

			<View style={{ gap: 20 }}>
				<Text style={styles.heading}>Amount:</Text>
				<View style={styles.btnContainer}>
					<Pressable
						style={[
							styles.commonBtn,
							quantity <= 1
								? styles.disabledBtn
								: styles.activeBtn,
						]}
						onPress={handleDecrease}
						disabled={quantity === 1}
					>
						<MinusIcon width={8} height={4} fill={COLORS.bgWhite} />
					</Pressable>

					<Text style={styles.input}>{quantity}</Text>

					<Pressable
						disabled={quantity === product.stock}
						style={[
							styles.commonBtn,
							quantity === product.stock
								? styles.disabledBtn
								: styles.activeBtn,
						]}
						onPress={handleIncrease}
					>
						<PlusIcon
							width={14}
							height={14}
							fill={COLORS.bgWhite}
						/>
					</Pressable>
				</View>
			</View>
		</View>
	);
};
