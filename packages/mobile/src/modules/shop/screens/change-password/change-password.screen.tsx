import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from '~/modules/shop/screens/change-password/styles';
import { SubmitButton } from '~/shared/componetnts/ui/submit-btn';
import { useUpdateUser } from '~/shared/hooks/useUpdateUser';
import { Input } from '~/shared/componetnts/input';

export const ChangePasswordScreen = () => {
	const { control, handleSubmit, onSubmit, isPending, watch } =
		useUpdateUser();

	return (
		<KeyboardAwareScrollView
			style={styles.outerContainer}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ flex: 1 }}
		>
			<View style={styles.innerContainer}>
				<View>
					<Input
						name="currentPassword"
						control={control}
						defaultValue=""
						label="Current Password"
					/>
					<Input
						name="password"
						control={control}
						defaultValue=""
						label="New Password"
						secure={true}
					/>
					<Input
						name="confirmPassword"
						control={control}
						defaultValue=""
						label="Confirm New Password"
						secure={true}
					/>
				</View>
				<SubmitButton
					text={isPending ? 'Submitting...' : 'Save'}
					disabled={
						!watch().currentPassword &&
						!watch().password &&
						!watch().confirmPassword
					}
					onPress={handleSubmit(onSubmit)}
				/>
			</View>
		</KeyboardAwareScrollView>
	);
};
