import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '~/shared/styles';
export const styles = StyleSheet.create({
	container: {
		padding: 10,
		borderWidth: 1,
		borderColor: COLORS.gray,
		borderRadius: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 20,
		marginBottom: 15,
		alignItems: 'center',
	},
	infoContainer: {
		flexDirection: 'row',
		gap: 15,
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
