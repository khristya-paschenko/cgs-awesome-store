import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '~modules/auth/pages';
import { ROUTER_KEYS } from '~shared/keys';

export const publicRoutes = (
	<Routes>
		<Route path={ROUTER_KEYS.LOGIN} element={<LoginPage />} />
		<Route
			path={ROUTER_KEYS.ALL_MATCH}
			element={<Navigate to={ROUTER_KEYS.LOGIN} />}
		/>
	</Routes>
);

export const privateRoutes = <>// PRIVATE_ROUTES</>;
