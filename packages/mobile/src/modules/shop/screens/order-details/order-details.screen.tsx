import { FlatList, Text, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import {
	NAVIGATION_KEYS,
	RootBottomTabsParamList,
} from '~/modules/navigation/types';
import { useSingleOrder } from '~/shared/hooks/useSingleOrder';
import { styles } from './styles';
import { SubmitButton } from '~/shared/componetnts/ui/submit-btn';
import CardIcon from '~/../assets/icons/CardIcon.svg';
import { COLORS } from '~/shared/styles';
import React from 'react';
import { CartItemComponent } from '~/shared/componetnts/cart-item';
import { PaymentStatus } from '~/modules/services/orders';
import { useUpdateOrder } from '~/shared/hooks/useUpdateOrder';

type OrderDetailsScreenProps = {
	route: RouteProp<RootBottomTabsParamList, NAVIGATION_KEYS.ORDERS>;
};
export const OrderDetailsScreen = ({ route }: OrderDetailsScreenProps) => {
	const { id } = route.params;
	const { order, getOrder, isPending } = useSingleOrder();
	const { updateOrder, isPending: updateOrderIsPending } = useUpdateOrder();

	React.useEffect(() => {
		if (isPending) return;
		getOrder(id);
	}, [updateOrderIsPending]);
	const handleSubmit = () => {
		//TODO: implement pay
	};

	const onDelete = (detailId: string) => {
		updateOrder(order.id, {
			orderDetails: [{ id: detailId, quantity: 0 }],
		});
	};
	return (
		<View style={styles.outerContainer}>
			{!isPending && order && (
				<View style={styles.innerContainer}>
					<View style={styles.detailsContainer}>
						<Text style={styles.amount}>
							Total Amount: ${order.total}
						</Text>

						<FlatList
							data={order.orderDetails}
							renderItem={(detail) => (
								<CartItemComponent
									name={detail.item.product.name}
									disabled={true}
									price={detail.item.priceAtPurchase}
									quantity={detail.item.quantity}
									onDelete={() => onDelete(detail.item.id)}
								/>
							)}
							keyExtractor={(item) => item.id}
							showsVerticalScrollIndicator={false}
							ListEmptyComponent={
								<Text style={styles.noFound}>
									No products found.
								</Text>
							}
						/>
					</View>
					{order.paymentStatus !== PaymentStatus.COMPLETE && (
						<SubmitButton
							text="Pay"
							disabled={isPending}
							onPress={handleSubmit}
							Icon={
								<CardIcon
									width={20}
									height={16}
									fill={COLORS.bgWhite}
								/>
							}
						/>
					)}
				</View>
			)}
		</View>
	);
};
