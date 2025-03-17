import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '~/shared/styles';

export const styles = StyleSheet.create({
	accordion: {
		width: '100%',
		backgroundColor: COLORS.disabled,
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	container: {
		width: '100%',
	},
	btnContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	title: {
		fontFamily: FONTS.poppins.semiBold,
		fontSize: 16,
		color: COLORS.text,
		lineHeight: 26,
	},
	text: {
		fontFamily: FONTS.poppins.regular,
		fontSize: 16,
		color: COLORS.text,
	},
	arrowClosed: {
		transform: [{ rotate: '180deg' }],
	},
	arrowOpened: {
		transform: [{ rotate: '270deg' }],
	},
	animatedView: {
		width: '100%',
		overflow: 'hidden',
	},
	content: {
		position: 'absolute',
		display: 'flex',
		alignItems: 'center',
	},
});
