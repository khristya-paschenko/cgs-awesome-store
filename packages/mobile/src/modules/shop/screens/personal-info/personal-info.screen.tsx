import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '~/modules/shop/screens/personal-info/styles';
import { useUpdateUser } from '~/shared/hooks/useUpdateUser';
import { Input } from '~/shared/componetnts/input';
import { useAuthStore } from '~/shared/store';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SubmitButton } from '~/shared/componetnts/ui/submit-btn';
import { useDeleteUser } from '~/shared/hooks/useDeleteUser';
import { Alert } from '~/shared/componetnts/ui/alert';
import React from 'react';

export const PersonalInfoScreen = () => {
	const user = useAuthStore((state) => state.user);
	const { control, handleSubmit, onSubmit, isPending } = useUpdateUser();
	const [isVisible, setIsVisible] = React.useState<boolean>(false);
	const { handleDelete } = useDeleteUser();

	const handlePressDelete = () => {
		setIsVisible(true);
	};
	const handleConfirmDelete = () => {
		handleDelete();
		setIsVisible(false);
	};
	return (
		<KeyboardAwareScrollView
			style={styles.outerContainer}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ flex: 1 }}
		>
			<View style={styles.innerContainer}>
				<View>
					<Input
						name="email"
						control={control}
						defaultValue={user?.email}
						keyBoardType="email-address"
						label="Email"
						disabled={true}
					/>
					<Input
						name="name"
						control={control}
						defaultValue={user?.name}
						label="Fill name"
					/>
					<Input
						name="phone"
						control={control}
						defaultValue={user?.phone}
						label="Phone number"
					/>
					<Input
						name="address"
						control={control}
						defaultValue={user?.address}
						label="Shipping address"
					/>
				</View>
				<TouchableOpacity
					style={styles.deleteBtnContainer}
					onPress={handlePressDelete}
				>
					<Text style={styles.deleteBtn}>Delete Account</Text>
				</TouchableOpacity>
				<SubmitButton
					text={isPending ? 'Submitting...' : 'Save'}
					disabled={false}
					onPress={handleSubmit(onSubmit)}
				/>
			</View>
			<Alert visible={isVisible}>
				<View style={styles.alertContainer}>
					<Text style={styles.question}>
						Are you sure you want to delete your account?
					</Text>
					<View style={styles.btnContainer}>
						<TouchableOpacity
							onPress={() => setIsVisible(false)}
							style={[styles.btnNo, styles.btnOption]}
						>
							<Text style={styles.btnText}>No</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={handleConfirmDelete}
							style={[styles.btnYes, styles.btnOption]}
						>
							<Text style={styles.btnText}>Yes</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Alert>
		</KeyboardAwareScrollView>
	);
};
