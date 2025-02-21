import { ScrollView, Text, View } from 'react-native';
import * as React from 'react';
import { SignupForm } from '~/shared/componetnts/signup-form/signup-form.component';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from '~/modules/navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect } from '~/shared/componetnts/ui/redirect/redirect';
import { styles } from './styles';

type SignupScreeProps = NativeStackScreenProps<
	RootStackParamList,
	NAVIGATION_KEYS.SIGNUP
>;
export const SignupScreen = ({ navigation }: SignupScreeProps) => {
	const handleRedirectSignin = () => {
		navigation.navigate(NAVIGATION_KEYS.LOGIN);
	};

	return (
		<SafeAreaView style={styles.outerContainer} edges={['top']}>
			<KeyboardAwareScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ flex: 1 }}
			>
				<ScrollView>
					<View style={styles.innerContainer}>
						<Text style={styles.heading}>Sign Up</Text>

						<SignupForm />

						<Redirect
							linkText="Sign In"
							redirectionText="Don’t have an account?"
							onPress={handleRedirectSignin}
						/>
					</View>
				</ScrollView>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
};
