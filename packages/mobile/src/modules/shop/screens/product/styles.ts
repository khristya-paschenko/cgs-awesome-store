import { StyleSheet } from 'react-native';
import { COLORS } from '~/shared/styles';

export const styles = StyleSheet.create({
	outerContainer: {
		backgroundColor: COLORS.bgBlue,
		flex: 1,
	},
	innerContainer: {
		paddingHorizontal: 28,
		paddingBottom: 30,
		paddingTop: 20,
		flex: 1,
		justifyContent: 'space-between',
		gap: 40,
	},
});
