import * as React from 'react';
import { View } from 'react-native';
import Logo from '~/../assets/icons/Logo.svg';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from '~/modules/navigation/types';
import { LoginForm } from '~/shared/componetnts/login-form/login-form.component';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect } from '~/shared/componetnts/ui/redirect/redirect';
import { styles } from './styles';

type LoginScreeProps = NativeStackScreenProps<
	RootStackParamList,
	NAVIGATION_KEYS.LOGIN
>;

export const LoginScreen = ({ navigation }: LoginScreeProps) => {
	const handleRedirectSignup = () => [
		navigation.navigate(NAVIGATION_KEYS.SIGNUP),
	];

	return (
		<SafeAreaView style={styles.outerContainer} edges={['top']}>
			<KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
				<View style={styles.innerContainer}>
					<View style={styles.loginContainer}>
						<Logo
							style={{ alignSelf: 'center' }}
							width={245}
							height={116}
						/>
						<LoginForm />
					</View>

					<Redirect
						redirectionText="Don’t have an account?"
						linkText="Sign Up"
						onPress={handleRedirectSignup}
					/>
				</View>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
};
