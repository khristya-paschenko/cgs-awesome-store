import { Pressable, Text } from 'react-native';
import { styles } from './styles';
import ConfirmSignIcon from '~/../assets/icons/ConfirmSignIcon.svg';

type FilterDrawerOptionProps = {
	label: string;
	isSelected: boolean;
	onPress: () => void;
};
export const FilterDrawerOption = ({
	label,
	isSelected,
	onPress,
}: FilterDrawerOptionProps) => {
	return (
		<Pressable style={styles.optionContainer} onPress={onPress}>
			<Text style={[styles.text, isSelected && styles.accent]}>
				{label}
			</Text>
			{isSelected && <ConfirmSignIcon width={20} height={20} />}
		</Pressable>
	);
};
