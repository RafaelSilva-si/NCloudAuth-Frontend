import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PageSpinner from '../Page/PageSpinner';
import Page404 from '../Page/Page404';
import routes from '../../../routes/routes';

const RenderRoutes = () => {
	return (
		<React.Suspense fallback={<PageSpinner />}>
			{routes.length > 0 ? (
				<Switch>
					{routes.map(route => (
						<Route
							exact
							path={route.path}
							key={route.path}
							component={route.component}
						/>
					))}
					<Route component={Page404} />
				</Switch>
			) : (
				<PageSpinner />
			)}
		</React.Suspense>
	);
};

export default RenderRoutes;
