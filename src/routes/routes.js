import React from 'react';
const DashboardPage = React.lazy(() =>
	import('screens/dashboard/DashboardPage'),
);

const ProviderPage = React.lazy(() => import('screens/providers/ProviderPage'));
const ProviderRegisterPage = React.lazy(() =>
	import('screens/providers/ProviderRegisterPage'),
);

const ApplicationPage = React.lazy(() =>
	import('screens/application/ApplicationPage'),
);
const ApplicationRegisterPage = React.lazy(() =>
	import('screens/application/ApplicationRegisterPage'),
);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: DashboardPage,
		permission: false,
	},
	//APPLICATIONS
	{
		path: '/applications',
		name: 'Aplicação',
		component: ApplicationPage,
		permission: false,
	},
	{
		path: '/applications/adicionar',
		name: 'Aplicação add',
		component: ApplicationRegisterPage,
		permission: false,
	},
	{
		path: '/applications/editar/:id',
		name: 'Aplicação edit',
		component: ApplicationRegisterPage,
		permission: false,
	},
	//PROVIDERS
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
	{
		path: '/providers/editar/:id',
		name: 'Provedores edit',
		component: ProviderRegisterPage,
		permission: false,
	},
];

export default routes;
