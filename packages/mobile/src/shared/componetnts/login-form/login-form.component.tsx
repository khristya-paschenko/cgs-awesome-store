import { View } from 'react-native';
import { Input } from '~/shared/componetnts/input';
import * as React from 'react';
import { useLogin } from '~/shared/hooks/useLogin';
import { styles } from './styles';
import { SubmitButton } from "~/shared/componetnts/ui/submit-btn";

export const LoginForm = () => {
	const { isPending, onSubmit, control, handleSubmit, isDisabled } =
		useLogin();
	return (
		<View style={styles.formContainer}>
			<View>
				<Input
					name="email"
					control={control}
					defaultValue=""
					keyBoardType="email-address"
					label="Email"
				/>

				<Input
					name="password"
					control={control}
					defaultValue=""
					label="Password"
					secure={true}
				/>
			</View>

			<SubmitButton
				text={isPending ? 'Submitting...' : 'Sign In'}
				disabled={isDisabled}
				onPress={handleSubmit(onSubmit)}
			/>
		</View>
	);
};
