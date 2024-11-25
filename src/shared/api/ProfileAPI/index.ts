import { generalApi } from 'shared/api/config';
import { ILoginForm } from 'feautures/Login/models';
import { IRegistrationForm } from 'feautures/Registration/models';
import { ITicketModel } from 'src/feautures/Ticket/models';

export const profileApi = generalApi.injectEndpoints({
    endpoints: build => ({
        getUserProfile: build.query<{ token: string, isAuthorized: boolean }, void>({
            query: () => ({
              url: 'user/refresh',
            }),
        }),
        getSession: build.query<{ session: string }, void>({
            query: () => ({
              url: 'user/session',
            }),
        }),
        getProfileTickets: build.query<ITicketModel[], void>({
            query: () => ({
              url: 'user/tickets',
            })
          }),            
        login: build.mutation<{ token: string }, { userData: ILoginForm }>({
            query: ({userData}) => {
                return {
                    url: `user/login`,
                    method: 'POST',
                    body: userData,
                };
            },
            invalidatesTags: ['Profile'],
        }),
        getTicket: build.mutation<Blob, { id: number }>({
            query: ({id}) => {
                return {
                    url: `user/ticket`,
                    method: 'POST',
                    body: {id},
                    responseHandler: (response) => response.blob()
                };
            },
        }),
        check: build.mutation<{ token: string }, { link_hash: string }>({
            query: ({link_hash}) => {
                return {
                    url: `user/check`,
                    method: 'POST',
                    body: {"link_hash": link_hash},
                };
            },
            invalidatesTags: ['Profile'],
        }),
        registration: build.mutation<{ token: string }, { userData: IRegistrationForm }>({
            query: ({userData}) => {
                return {
                    url: `user/registration`,
                    method: 'POST',
                    body: userData,
                };
            },
            invalidatesTags: ['Profile'],
        }),
        location: build.mutation<{city: {name: string, id: number, id_str: string}}, { city: {name: string, type: string} }>({
            query: ({city}) => {
                return {
                    url: `user/location`,
                    method: 'POST',
                    body: city,
                };
            },
            invalidatesTags: ['Profile'],
        }),
    }),
});

export const {
    useGetUserProfileQuery,
    useGetSessionQuery,
    useLoginMutation,
    useCheckMutation,
    useRegistrationMutation,
    useLocationMutation,
    useGetProfileTicketsQuery,
    useGetTicketMutation
} = profileApi;
