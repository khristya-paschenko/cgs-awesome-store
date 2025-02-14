import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '~/shared/styles';

export const styles = StyleSheet.create({
	outerContainer: {
		backgroundColor: COLORS.bgBlue,
		flex: 1,
	},
	innerContainer: {
		flex: 1,
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingBottom: 30,
		paddingTop: 30,
		gap: 40,
	},
	successContainer: {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 20,
	},
	successText: {
		fontFamily: FONTS.poppins.regular,
		fontSize: 16,
		color: COLORS.text,
	},
});
