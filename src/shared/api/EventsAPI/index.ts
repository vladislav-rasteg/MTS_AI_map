import { generalApi } from 'shared/api/config';
import { IEvent } from 'src/feautures/Event/models';

export const eventsApi = generalApi.injectEndpoints({
    endpoints: build => ({     
        addToWishlist: build.mutation<{action: string, event_id: number}, { session: string, event: number }>({
            query: (data) => ({
                url: `event/wishlist`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Category', 'Personal', 'Event'],
        }),
        getEvent: build.query<IEvent, {id: string, session: string}>({
            query: (args) => ({
              url: 'event/'+args.id,
              params: {session: args.session}
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Event']
          }),
    }),
});

export const {
    useAddToWishlistMutation,
    useGetEventQuery
} = eventsApi;
