import { TouchableOpacity, Text, View } from 'react-native';
import { styles } from '~/modules/shop/screens/settings/styles';
import { COLORS } from '~/shared/styles';
import {
	NAVIGATION_KEYS,
	RootBottomTabsParamList,
} from '~/modules/navigation/types';
import { NavigationProp } from '@react-navigation/native';
import { useLogout } from '~/shared/hooks/useLogout';

type SettingsScreenProps = {
	navigation: NavigationProp<
		RootBottomTabsParamList,
		NAVIGATION_KEYS.SETTINGS
	>;
};
export const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
	const { onLogout } = useLogout();
	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() =>
					navigation.navigate(NAVIGATION_KEYS.PERSONAL_INFO)
				}
			>
				<Text style={styles.btn}>Personal info</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() =>
					navigation.navigate(NAVIGATION_KEYS.CHANGE_PASSWORD)
				}
			>
				<Text style={styles.btn}>Change password</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => navigation.navigate(NAVIGATION_KEYS.FAQ)}
			>
				<Text style={styles.btn}>FAQ</Text>
			</TouchableOpacity>
			<TouchableOpacity>
				<Text style={styles.btn}>Terms & Conditions</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={onLogout}>
				<Text style={[styles.btn, { color: COLORS.accentRed }]}>
					Logout
				</Text>
			</TouchableOpacity>
		</View>
	);
};
