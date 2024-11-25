import { Login } from 'pages/Login';
import { Registration } from 'pages/Registration';
import { City } from 'pages/City';
import { Profile } from 'pages/Profile';

import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  CITY_ROUTE,
  PROFILE_ROUTE,
  MAIN_ROUTE,
  EVENT_ROUTE,
  ORDER_ROUTE
} from 'shared/utils/consts'
import { Main } from 'src/pages/Main';
import { Event } from 'src/pages/Event';
import { Order } from 'src/pages/Order';

export const authorizedRoutes = [
  {
    path: PROFILE_ROUTE,
    Component: Profile,
    isCity: false 
    
  // subRoutes: [
  //   {
  //     path: 'companies',
  //     Component: CompaniesTab,
  //   },
  //   {
  //     path: 'universities',
  //     Component: UniversitiesTab,
  //   }
  // ],
  }
];

export const nonAuthorizedRoutes = [
  {
    path: CITY_ROUTE,
    Component: City,
    isCity: false,
    isTheme: false
  },
  {
    path: MAIN_ROUTE,
    Component: Main,
    isCity: true,
    isTheme: false
  },
  {
    path: EVENT_ROUTE + '/:event_id',
    Component: Event,
    isCity: false,
    isTheme: true
  },
  {
    path: ORDER_ROUTE + '/:event_id',
    Component: Order,
    isCity: false,
    isTheme: true
  }
];

export const authorizationRoutes = [
  {    
    path: LOGIN_ROUTE,
    Component: Login,
    isCity: false
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Registration,
    isCity: false
  }
]

