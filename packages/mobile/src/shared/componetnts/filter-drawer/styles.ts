import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '~/shared/styles';

export const styles = StyleSheet.create({
	container: {
		paddingTop: 15,
		paddingBottom: 10,
		paddingHorizontal: 26,
		gap: 15,
	},
	optionContainer: {
		flexDirection: 'row',
		gap: 15,
		alignItems: 'center',
	},
	heading: {
		fontFamily: FONTS.poppins.bold,
		color: COLORS.text,
		fontSize: 16,
		textAlign: 'center',
	},
	text: {
		fontFamily: FONTS.poppins.regular,
		fontSize: 16,
		color: COLORS.text,
	},
	accent: {
		color: COLORS.accentGreen,
	},
});
