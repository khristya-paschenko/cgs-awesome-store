import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '~/shared/styles';

export const styles = StyleSheet.create({
	container: {
		gap: 20,
	},
	heading: {
		fontFamily: FONTS.poppins.bold,
		color: COLORS.text,
		fontSize: 16,
	},
	btnContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 15,
		alignItems: 'flex-start',
	},
	category: {
		fontFamily: FONTS.poppins.bold,
		color: COLORS.text,
		fontSize: 16,
	},
	text: {
		fontFamily: FONTS.poppins.regular,
		fontSize: 16,
		color: COLORS.text,
		textTransform: 'capitalize',
		minWidth: 80,
	},
	accent: {
		color: COLORS.accentGreen,
	},
});
