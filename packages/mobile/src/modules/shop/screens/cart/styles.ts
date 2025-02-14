import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '~/shared/styles';

export const styles = StyleSheet.create({
	outerContainer: {
		flex: 1,
		backgroundColor: COLORS.bgBlue,
	},
	innerContainer: {
		paddingHorizontal: 16,
		paddingTop: 20,
		paddingBottom: 30,
		flex: 1,
		justifyContent: 'space-between',
	},
	cartsContainer: {
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
