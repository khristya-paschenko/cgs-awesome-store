import { Pressable, Text, View } from 'react-native';
import * as React from 'react';
import { styles } from './styles';

type RedirectProps = {
	linkText: string;
	redirectionText: string;
	onPress: () => void;
};
export const Redirect = ({
	linkText,
	redirectionText,
	onPress,
}: RedirectProps) => {
	return (
		<View style={styles.container}>
			<Text style={styles.option}>{redirectionText} </Text>
			<Pressable onPress={onPress}>
				<Text style={styles.redirect}>{linkText}</Text>
			</Pressable>
		</View>
	);
};
