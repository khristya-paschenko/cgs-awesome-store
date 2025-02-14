import { Pressable } from 'react-native';
import HeaderBackIcon from '~/../assets/icons/HeaderBackIcon.svg';

type BackButtonProps = {
	onPress: () => void;
};
export const BackButton = ({ onPress }: BackButtonProps) => {
	return (
		<Pressable onPress={onPress}>
			<HeaderBackIcon width={16} height={28.5} />
		</Pressable>
	);
};
