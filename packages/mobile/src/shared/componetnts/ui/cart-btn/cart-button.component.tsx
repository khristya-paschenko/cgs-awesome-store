import { Pressable } from 'react-native';
import CartIcon from '~/../assets/icons/CartIcon.svg';
import { styles } from './styles';

type CartButtonProps = {
	color: string;
	width: number;
	height: number;
	onPress: () => void;
};
export const CartButton = ({
	color,
	width,
	height,
	onPress,
}: CartButtonProps) => {
	return (
		<Pressable style={styles.button} onPress={onPress}>
			<CartIcon stroke={color} width={width} height={height} />
		</Pressable>
	);
};
