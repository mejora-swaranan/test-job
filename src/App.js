import React from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import "./assets/scss/admin.scss";

import { CustomRoute } from './route/CustomRoute';
import { BaseUrlProvider } from './route/BaseUrlContext';
import { routes } from './route/Routes';

const App = () => {
	const location = useLocation();
    const { pathname } = location;
    return (
		<BaseUrlProvider>
			<React.Fragment>				
				{routes.map((route, index) => (
					<CustomRoute key={index} {...route} />
				))}
			</React.Fragment>
		</BaseUrlProvider>
    );
}

export default App;
