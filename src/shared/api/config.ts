import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURL = (import.meta.env.VITE_API_URL + import.meta.env.VITE_API_VERSION) || 'http://localhost:5050';

export const generalApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('access_token');
            if (token) headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ['Profile', 'Important', 'Location', 'Category', 'Personal', 'Event', 'Order'], // КОГДА ДОБАВЛЯЕШЬ НОВЫЙ ФАЙЛ, В КАЖДОМ ЗАПРОСЕ ДОБАВЛЯЕШЬ ТЕГИ. ТУТ ТЫ ИХ ПРОПИСЫВАЕШЬ
    reducerPath: 'generalApi',
    endpoints: () => ({}),
});
