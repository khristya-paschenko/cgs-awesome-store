import { Pressable, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import { styles } from './styles';

type SortButtonProps = {
	Icon: React.ReactNode;
	isPressed: boolean;
	onPress: () => void;
	extraStyles?: StyleProp<ViewStyle>;
};
export const SortButtonComponent = ({
	Icon,
	isPressed,
	onPress,
	extraStyles,
}: SortButtonProps) => {
	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => [
				styles.buttonContainer,
				extraStyles,
				isPressed && styles.pressed,
				pressed && styles.pressed,
			]}
		>
			{Icon}
		</Pressable>
	);
};
