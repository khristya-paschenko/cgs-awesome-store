import { Text, View } from 'react-native';
import { CodeField } from 'react-native-confirmation-code-field';
import React from 'react';
import { SubmitButton } from '~/shared/componetnts/ui/submit-btn/submit-button.component';
import { useVerify } from '~/shared/hooks/useVerify';
import { styles } from './styles';

type VerificationCodeInputProps = {
	numCells: number;
	email: string;
};
export const VerificationFormComponent = ({
	email,
	numCells,
}: VerificationCodeInputProps) => {
	const [value, setValue] = React.useState<string>('');

	const { handleSubmit } = useVerify(email, numCells);

	return (
		<View style={styles.formContainer}>
			<View style={styles.verificationContainer}>
				<Text style={styles.label}>
					Please type the code from the email
				</Text>

				<CodeField
					rootStyle={styles.codeFieldRoot}
					keyboardType="number-pad"
					cellCount={numCells}
					value={value}
					onChangeText={(value) => setValue(value)}
					renderCell={({ index, symbol, isFocused }) => (
						<Text
							key={index}
							style={[styles.cell, isFocused && styles.focusCell]}
						>
							{symbol || (isFocused ? '|' : null)}
						</Text>
					)}
				/>
			</View>
			<SubmitButton
				text="Submit"
				disabled={value.length !== numCells}
				onPress={() => handleSubmit(value, email)}
			/>
		</View>
	);
};
