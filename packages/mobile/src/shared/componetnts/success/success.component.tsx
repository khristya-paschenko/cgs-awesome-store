import { styles } from '~/shared/componetnts/success/styles';
import { Text, View } from 'react-native';
import ConfirmSignIcon from '../../../../assets/icons/ConfirmSignIcon.svg';
import { SubmitButton } from '~/shared/componetnts/ui/submit-btn';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as React from 'react';

type SuccessProps = {
	onSubmit: () => void;
	text: string;
};
export const SuccessComponent = ({ onSubmit, text }: SuccessProps) => {
	return (
		<SafeAreaView style={styles.outerContainer} edges={['top']}>
			<View style={styles.innerContainer}>
				<View style={styles.successContainer}>
					<ConfirmSignIcon width={120} height={120} />
					<Text>{text}</Text>
				</View>
				<SubmitButton
					text="Submit"
					disabled={false}
					onPress={onSubmit}
				/>
			</View>
		</SafeAreaView>
	);
};
