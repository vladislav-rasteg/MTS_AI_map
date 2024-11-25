import {Navigate, Route, Routes} from 'react-router-dom';
import {authorizedRoutes, nonAuthorizedRoutes, authorizationRoutes} from './routes';
import { MAIN_ROUTE, LOGIN_ROUTE } from 'shared/utils/consts';
import { RichLayout } from '../layouts/RichLayout';
import { SimpleLayout } from '../layouts/SimpleLayout';
import { useAppSelector } from '../hooks/redux';
import { CityLayout } from '../layouts/CityLayout';
import { ThemeProvider } from '../layouts/ThemeProvider';


const Router = () => {
	const { isAuthorized } = useAppSelector(state => state.ProfileReducer);

	return (
		<Routes>
			{
				nonAuthorizedRoutes.map(({path, Component, isCity, isTheme}) =>
					<Route key={path} path={path} element={
						<ThemeProvider required={isTheme}>
							<RichLayout>
								<CityLayout required={isCity}>
									<Component/>
								</CityLayout>
							</RichLayout>
						</ThemeProvider>
					}/>
				)
			}
			{
				authorizationRoutes.map(({path, Component}) =>
					<Route key={path} path={path} element={
						<ThemeProvider required={false}>
							<SimpleLayout>
								<Component/>
							</SimpleLayout>
						</ThemeProvider>
					}/>
				)
			}
			{
				//@ts-ignore
				isAuthorized && authorizedRoutes.map(({path, Component, subRoutes}) =>
					!subRoutes ?
						<Route key={path} path={path} element={
							<ThemeProvider required={false}>
								<RichLayout>
									<Component/>
								</RichLayout>
							</ThemeProvider>
						}/>
					:
						<Route key={path} path={path} element={
							<ThemeProvider required={false}>
								<RichLayout>
									<Component/>
								</RichLayout>
							</ThemeProvider>
						}>
							{
								//@ts-ignore
								subRoutes.map(({path, Component}) =>
									<Route key={path} path={path} element={<Component/>}/>
								)
							}
						</Route>
				)
			}
			{
				isAuthorized ? 
					<Route path='*' element={<Navigate to={MAIN_ROUTE}/>} />
				:
					<Route path='*' element={<Navigate to={LOGIN_ROUTE}/>} />
			}
		</Routes>
	)
}


export default Router
