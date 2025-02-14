import { Pressable, View } from 'react-native';
import FilterArrow from '~/../assets/icons/FilterArrow.svg';
import CrossIcon from '~/../assets/icons/CrossIcon.svg';
import { COLORS } from '~/shared/styles';
import { styles } from './styles';
import { SortButtonComponent } from 'shared/componetnts/ui/sort-btn';
import { useState } from 'react';
import { useProductsStore } from '~/shared/store/products.store';
import { useProducts } from '~/shared/hooks/useProducts';

enum SortOptions {
	desc = 'desc',
	acs = 'asc',
	cancel = '',
}
export const SortComponent = () => {
	const [button, setButton] = useState<SortOptions>('');
	const { refreshProducts } = useProducts();

	const handleDescPress = () => {
		setButton(SortOptions.desc);
		refreshProducts({ sort: SortOptions.desc });
	};

	const handleAcsPress = () => {
		setButton(SortOptions.acs);
		refreshProducts({ sort: SortOptions.acs });
	};

	const handleCancel = () => {
		setButton(SortOptions.cancel);
		refreshProducts({ sort: undefined });
	};
	return (
		<View style={styles.container}>
			<View style={styles.filterContainer}>
				<SortButtonComponent
					Icon={
						<FilterArrow
							height={10}
							width={16}
							fill={COLORS.activeBtn}
						/>
					}
					isPressed={button === SortOptions.desc}
					onPress={handleDescPress}
				/>

				<SortButtonComponent
					Icon={
						<FilterArrow
							height={10}
							width={16}
							fill={COLORS.activeBtn}
						/>
					}
					isPressed={button === SortOptions.acs}
					onPress={handleAcsPress}
					extraStyles={{ transform: [{ rotate: '180deg' }] }}
				/>
			</View>

			<SortButtonComponent
				Icon={
					<CrossIcon height={16} width={16} fill={COLORS.activeBtn} />
				}
				isPressed={false}
				onPress={handleCancel}
			/>
		</View>
	);
};
