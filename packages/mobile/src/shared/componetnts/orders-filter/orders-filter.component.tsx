import { Pressable, Text, View } from 'react-native';
import { styles } from './styles';
import { useOrders } from '~/shared/hooks/useOrders';
import React from 'react';
import { BottomSheetContext } from '~/shared/context/bottom-sheet.context';
import { DateSorting, DeliveryStatus } from '~/modules/services/orders';

export const OrdersFilterComponent = () => {
	const { showDrawer, paymentFilter, deliveryFilter, dateSorting } =
		React.useContext<BottomSheetContext>(BottomSheetContext);
	const { refreshOrders } = useOrders();

	React.useEffect(() => {
		refreshOrders({
			paymentStatus: paymentFilter,
			deliveryStatus: deliveryFilter,
			sort: dateSorting,
		});
	}, [paymentFilter, deliveryFilter, dateSorting]);
	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Filter By</Text>
			<View style={styles.btnContainer}>
				<Pressable onPress={() => showDrawer!('payment')}>
					<Text style={styles.category}>Payment:</Text>
					<Text style={[styles.text, styles.accent]}>
						{paymentFilter || 'All'}
					</Text>
				</Pressable>

				<Pressable onPress={() => showDrawer!('delivery')}>
					<Text style={styles.category}>Delivery:</Text>
					<Text style={[styles.text, styles.accent]}>
						{(deliveryFilter === DeliveryStatus.IN_TRANSIT &&
							'In Transit') ||
							deliveryFilter ||
							'All'}
					</Text>
				</Pressable>

				<Pressable onPress={() => showDrawer!('date')}>
					<Text style={styles.category}>Date:</Text>
					<Text style={[styles.text, styles.accent]}>
						{(dateSorting === DateSorting.ASC && 'Asc > Des') ||
							(dateSorting === DateSorting.DESC && 'Des > Asc') ||
							'Unset'}
					</Text>
				</Pressable>
			</View>
		</View>
	);
};
