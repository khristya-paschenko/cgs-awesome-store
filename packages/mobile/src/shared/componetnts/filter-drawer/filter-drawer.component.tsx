import { BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react';
import {
	BottomSheetContext,
	BottomSheetOption,
} from '~/shared/context/bottom-sheet.context';
import {
	DateSorting,
	DeliveryStatus,
	PaymentStatus,
} from '~/modules/services/orders';
import { FilterDrawerOption } from '~/shared/componetnts/filter-drawer/filter-drawer-option.component';
import { Text } from 'react-native';
import { styles } from './styles';

const getDrawerTitle = (content: BottomSheetOption | undefined) => {
	switch (content) {
		case 'payment':
			return 'Payment Status';
		case 'delivery':
			return 'Delivery Status';
		case 'date':
			return 'Order by Date';
		default:
			return 'Options';
	}
};

export const FilterDrawer = () => {
	const {
		drawerContent,

		paymentFilter,
		setPaymentFilter,

		deliveryFilter,
		setDeliveryFilter,

		dateSorting,
		setDateSorting,

		setPage,
	} = React.useContext<BottomSheetContext>(BottomSheetContext);

	const renderOptions = () => {
		switch (drawerContent) {
			case 'payment':
				return [
					{ label: 'All', value: PaymentStatus.ALL },
					{ label: 'Pending', value: PaymentStatus.PENDING },
					{ label: 'Complete', value: PaymentStatus.COMPLETE },
					{ label: 'Failed', value: PaymentStatus.FAILED },
				].map(({ label, value }) => (
					<FilterDrawerOption
						key={label}
						label={label}
						isSelected={paymentFilter === value}
						onPress={() => {
							setPage?.(1);
							setPaymentFilter?.(value);
						}}
					/>
				));
			case 'delivery':
				return [
					{ label: 'All', value: DeliveryStatus.ALL },
					{ label: 'Pending', value: DeliveryStatus.PENDING },
					{ label: 'In Transit', value: DeliveryStatus.IN_TRANSIT },
					{ label: 'Delivered', value: DeliveryStatus.DELIVERED },
				].map(({ label, value }) => (
					<FilterDrawerOption
						key={label}
						label={label}
						isSelected={deliveryFilter === value}
						onPress={() => {
							setPage?.(1);
							setDeliveryFilter?.(value);
						}}
					/>
				));
			case 'date':
				return [
					{ label: 'Descending', value: DateSorting.DESC },
					{ label: 'Ascending', value: DateSorting.ASC },
					{ label: 'Unset', value: DateSorting.UNSET },
				].map(({ label, value }) => (
					<FilterDrawerOption
						key={label}
						label={label}
						isSelected={dateSorting === value}
						onPress={() => {
							setPage?.(1);
							setDateSorting?.(value);
						}}
					/>
				));
			default:
				return null;
		}
	};

	return (
		<BottomSheetView style={styles.container}>
			<Text style={styles.heading}>{getDrawerTitle(drawerContent)}</Text>
			{renderOptions()}
		</BottomSheetView>
	);
};
