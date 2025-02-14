import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { PortalProvider } from '@blueprintjs/core';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './shared/styles/global-styles.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import App from '~modules/app/app.module';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Infinity,
		},
	},
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<PortalProvider portalClassName="my-custom-class">
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</PortalProvider>
	</QueryClientProvider>,
);
