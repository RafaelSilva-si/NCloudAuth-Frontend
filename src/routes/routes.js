import React from 'react';
const DashboardPage = React.lazy(() =>
	import('screens/dashboard/DashboardPage'),
);

const ProviderPage = React.lazy(() => import('screens/providers/ProviderPage'));
const ProviderRegisterPage = React.lazy(() =>
	import('screens/providers/ProviderRegisterPage'),
);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: DashboardPage,
		permission: false,
	},
	{
		path: '/provider',
		name: 'Provedores',
		component: ProviderPage,
		permission: false,
	},
	{
		path: '/providers/adicionar',
		name: 'Provedores add',
		component: ProviderRegisterPage,
		permission: false,
	},
];

export default routes;
