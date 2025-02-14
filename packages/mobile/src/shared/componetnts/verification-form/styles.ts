import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '~/shared/styles';

export const styles = StyleSheet.create({
	formContainer: {
		flex: 1,
		justifyContent: 'space-between',
		gap: 40,
		alignItems: 'center',
	},
	verificationContainer: {
		gap: 50,
	},
	label: {
		fontFamily: FONTS.inter.medium,
		fontSize: 14,
		color: COLORS.gray,
	},
	cell: {
		width: 44,
		height: 50,
		backgroundColor: COLORS.bgWhite,
		borderColor: COLORS.border,
		borderWidth: 1,
		borderRadius: 10,
		textAlign: 'center',
		fontFamily: FONTS.poppins.regular,
		fontSize: 24,
		lineHeight: 52,
		color: COLORS.text,
	},
	focusCell: {
		borderColor: COLORS.activeBtn,
	},
	codeFieldRoot: {
		flexDirection: 'row',
		width: 196,
		alignSelf: 'center',
	},
});
