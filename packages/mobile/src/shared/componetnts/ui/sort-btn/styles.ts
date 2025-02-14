import { StyleSheet } from 'react-native';
import { COLORS } from '~/shared/styles';

export const styles = StyleSheet.create({
	buttonContainer: {
		width: 44,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.bgWhite,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: COLORS.border,
	},
	pressed: {
		borderColor: COLORS.activeBtn,
	},
});
