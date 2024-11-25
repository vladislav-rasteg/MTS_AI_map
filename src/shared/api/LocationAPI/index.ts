import { generalApi } from 'shared/api/config';
import { ICityQuery } from 'src/feautures/City/models';

export const locationApi = generalApi.injectEndpoints({
    endpoints: build => ({
        getLocations: build.query<ICityQuery[], void>({
            query: () => ({
              url: 'location/list',
              invalidatesTags: ['Location'],
            }),
          })
    }),
});

export const {
    useGetLocationsQuery,
} = locationApi;
