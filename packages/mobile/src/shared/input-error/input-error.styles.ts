import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '~/shared/styles';

export const styles = StyleSheet.create({
	error: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		fontSize: 12,
		fontFamily: FONTS.inter.medium,
		color: COLORS.accentRed,
	},
});
