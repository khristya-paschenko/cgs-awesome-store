import { SuccessComponent } from '~/shared/componetnts/success/success.component';
import { NavigationProp } from '@react-navigation/native';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from '~/modules/navigation/types';

type PaymentScreenProps = {
	navigation: NavigationProp<
		RootStackParamList,
		NAVIGATION_KEYS.PAYMENT_CONFIRM
	>;
};
export const PaymentScreen = ({ navigation }: PaymentScreenProps) => {
	const handleSubmit = () => {
		navigation.navigate(NAVIGATION_KEYS.TABS, {
			screen: NAVIGATION_KEYS.ORDERS,
		});
	};
	return (
		<SuccessComponent onSubmit={handleSubmit} text="Payment successful!" />
	);
};
