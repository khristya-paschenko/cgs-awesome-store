import { View } from 'react-native';
import { Input } from '~/shared/componetnts/input';
import { SubmitButton } from '~/shared/componetnts/ui/submit-btn/submit-button.component';
import * as React from 'react';
import { useSignup } from '~/shared/hooks/useSignup';

export const SignupForm = () => {
	const { control, handleSubmit, isPending, isDisabled, onSubmit } =
		useSignup();
	return (
		<View style={{ gap: 28 }}>
			<View>
				<Input
					name="email"
					control={control}
					defaultValue=""
					keyBoardType="email-address"
					label="Email"
				/>
				<Input
					name="name"
					control={control}
					defaultValue=""
					label="Full Name"
				/>

				<Input
					name="phone"
					control={control}
					defaultValue=""
					keyBoardType="phone-pad"
					label="Phone Number"
				/>

				<Input
					name="address"
					control={control}
					defaultValue=""
					label="Shipping Address"
				/>

				<Input
					name="password"
					control={control}
					defaultValue=""
					label="Password"
					secure={true}
				/>

				<Input
					name="confirmPassword"
					control={control}
					defaultValue=""
					label="Confirm Password"
					secure={true}
				/>
			</View>
			<SubmitButton
				text={isPending ? 'Submitting...' : 'Sign Up'}
				disabled={isDisabled}
				onPress={handleSubmit(onSubmit)}
			/>
		</View>
	);
};
