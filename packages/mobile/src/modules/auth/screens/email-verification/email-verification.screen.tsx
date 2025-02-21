import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as React from 'react';
import { VerificationFormComponent } from '~/shared/componetnts/verification-form/verification-form.component';
import { RouteProp } from '@react-navigation/native';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from '~/modules/navigation/types';
import { styles } from './styles';

type EmailVerificationScreenProps = {
	route: RouteProp<RootStackParamList, NAVIGATION_KEYS.VERIFY>;
};
export const EmailVerificationScreen = ({
	route,
}: EmailVerificationScreenProps) => {
	const { email } = route.params;
	return (
		<SafeAreaView style={styles.outerContainer} edges={['top']}>
			<KeyboardAwareScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ flex: 1 }}
			>
				<View style={styles.innerContainer}>
					<Text style={styles.heading}>Email Verification</Text>

					<VerificationFormComponent numCells={4} email={email} />
				</View>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
};
