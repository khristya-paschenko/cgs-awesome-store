import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '~/shared/styles';

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		padding: 10,
		borderWidth: 1,
		borderColor: COLORS.gray,
		borderRadius: 10,
		marginBottom: 15,
	},
	productContainer: {
		gap: 10,
	},
	text: {
		fontFamily: FONTS.poppins.regular,
		fontSize: 16,
		color: COLORS.text,
	},
	heading: {
		fontFamily: FONTS.poppins.bold,
		fontSize: 16,
		color: COLORS.text,
	},
});
