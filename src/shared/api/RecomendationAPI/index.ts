import { generalApi } from 'shared/api/config';
import { IEvent } from 'src/feautures/Event/models';



export const recomendationApi = generalApi.injectEndpoints({
    endpoints: build => ({
        getImportant: build.query<IEvent[], string>({
            query: (city) => ({
              url: 'recomendation/important/'+city,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Important'],
          }),      
          getCategory: build.query<[{category: string, events: IEvent[]}], {city: string, session: string}>({
            query: (args) => ({
              url: 'recomendation/category',
              params: args
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Category']
          }),
          getRecomendations: build.query<IEvent[], {city: string, session: string}>({
            query: (args) => ({
              url: 'recomendation/personal',
              params: args,
            }),
            providesTags: ['Personal'],
          })
    }),
});

export const {
    useGetImportantQuery,
    useGetCategoryQuery,
    useGetRecomendationsQuery
} = recomendationApi;
