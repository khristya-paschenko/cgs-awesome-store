import { Pressable, Text } from 'react-native';
import { styles } from './styles';
import { Order } from '~/modules/services/orders';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from '~/modules/navigation/types';

type OrderItemProps = {
	order: Order;
};
export const OrderItemComponent = ({ order }: OrderItemProps) => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();

	const handlePress = () => {
		navigation.navigate(NAVIGATION_KEYS.ORDER_DETAILS, { id: order.id });
	};
	return (
		<Pressable style={styles.container} onPress={handlePress}>
			<Text style={styles.heading}>
				Date:{' '}
				<Text style={styles.text}>
					{new Date(order.createdAt).toLocaleDateString()}
				</Text>
			</Text>
			<Text style={styles.heading}>
				ID: <Text style={styles.text}>{order.id}</Text>
			</Text>
			<Text style={styles.heading}>
				Payment Status:{' '}
				<Text style={[styles.text, { textTransform: 'capitalize' }]}>
					{order.paymentStatus}
				</Text>
			</Text>
			<Text style={styles.heading}>
				Delivery Status:{' '}
				<Text style={[styles.text, { textTransform: 'capitalize' }]}>
					{order.deliveryStatus}
				</Text>
			</Text>
			<Text style={styles.heading}>
				Total: <Text style={styles.text}>${order.total}</Text>
			</Text>
		</Pressable>
	);
};
