import * as React from 'react';
import { useAuthStore } from '~/shared/store/auth.store';
import { SuccessComponent } from '~/shared/componetnts/success/success.component';

export const ConfirmScreen = () => {
	const setIsAuth = useAuthStore((state) => state.setIsAuth);
	const handleSubmit = () => {
		setIsAuth(true);
	};
	return (
		<SuccessComponent
			onSubmit={handleSubmit}
			text="Account successfully registered!"
		/>
	);
};
