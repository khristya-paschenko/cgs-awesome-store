import React from 'react';
import { Modal, View } from 'react-native';
import { styles } from '~/shared/componetnts/ui/alert/styles';

type AlertProps = {
	children: React.ReactNode;
	visible: boolean;
};
export const Alert = ({ children, visible }: AlertProps) => {
	return (
		<Modal visible={visible} animationType="slide" transparent>
			<View style={styles.overlay}>
				<View style={styles.container}>{children}</View>
			</View>
		</Modal>
	);
};
