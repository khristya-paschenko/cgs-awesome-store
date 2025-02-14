import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '~/shared/styles';
export const styles = StyleSheet.create({
	outerContainer: {
		backgroundColor: COLORS.bgBlue,
		flex: 1,
	},
	innerContainer: {
		paddingHorizontal: 16,
		paddingBottom: 30,
		paddingTop: 20,
		flex: 1,
		justifyContent: 'space-between',
	},
	detailsContainer: {
		gap: 40,
	},
	amount: {
		fontFamily: FONTS.inter.bold,
		color: COLORS.text,
		fontSize: 16,
		textAlign: 'center',
	},
	noFound: {
		marginTop: 100,
		textAlign: 'center',
		fontSize: 18,
		fontFamily: FONTS.poppins.regular,
		color: COLORS.text,
	},
});
