import { Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

type SubmitButtonProps = {
	Icon?: React.ReactNode;
	text: string;
	disabled: boolean;
	onPress: () => void;
};
export const SubmitButton = ({
	Icon,
	text,
	disabled,
	onPress,
}: SubmitButtonProps) => {
	return (
		<TouchableOpacity
			disabled={disabled}
			onPress={onPress}
			style={[styles.button, disabled ? styles.disabled : styles.active]}
		>
			{Icon ? Icon : null}
			<Text style={styles.text}>{text}</Text>
		</TouchableOpacity>
	);
};
