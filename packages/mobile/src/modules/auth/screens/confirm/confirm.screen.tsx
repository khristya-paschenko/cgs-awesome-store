import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SubmitButton } from '~/shared/componetnts/ui/submit-btn/submit-button.component';
import * as React from 'react';
import ConfirmSignIcon from '~/../assets/icons/ConfirmSignIcon.svg';
import { styles } from './styles';
import { useAuthStore } from '~/shared/store/auth.store';

export const ConfirmScreen = () => {
	const setIsAuth = useAuthStore((state) => state.setIsAuth);
	const handleSubmit = () => {
		setIsAuth(true);
	};
	return (
		<SafeAreaView style={styles.outerContainer} edges={['top']}>
			<View style={styles.innerContainer}>
				<View style={styles.successContainer}>
					<ConfirmSignIcon width={120} height={120} />
					<Text>Account successfully registered!</Text>
				</View>
				<SubmitButton
					text="Submit"
					disabled={false}
					onPress={handleSubmit}
				/>
			</View>
		</SafeAreaView>
	);
};
