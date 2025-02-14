import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '~/shared/styles';

export const styles = StyleSheet.create({
	outerContainer: {
		backgroundColor: COLORS.bgBlue,
		flex: 1,
	},
	innerContainer: {
		flex: 1,
		paddingHorizontal: 16,
		paddingBottom: 30,
		gap: 40,
	},

	heading: {
		fontFamily: FONTS.poppins.bold,
		color: COLORS.text,
		alignSelf: 'center',
		fontSize: 16,
	},
});
