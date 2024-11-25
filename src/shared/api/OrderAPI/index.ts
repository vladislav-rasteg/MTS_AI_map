import { generalApi } from 'shared/api/config';

export const orderApi = generalApi.injectEndpoints({
    endpoints: build => ({
      createOrder: build.mutation<{order_id: number, total_sum: number, comission: number}, {session: string, event_id: number, tickets: {type: number; sum: number; owner_name: string }[], order_id: number | undefined, promocode: string} >({
        query: (data) => {
            return {
                url: `order/create`,
                method: 'POST',
                body: data,
            };
        },
        invalidatesTags: ['Order'],
      }),
      createPayment: build.mutation<string, {order_id: number, sum: number, full_name: string, email: string, phone: string, session: string} >({
        query: (data) => {
            return {
                url: `order/payment`,
                method: 'POST',
                body: data,
            };
        },
      }),
      getOrder: build.query<{order_id: number, tickets: {type: number; id: number; owner_name: string }[], sum: number, comission: number, coupon: {name: string, type: string, value: number | null, tickets: number[], limit: number | null} | undefined}, {event_id: number, session: string}>({
        query: (args) => ({
          url: 'order/get',
          params: args
        }),
        providesTags: ['Order']
      }),
      getCoupon: build.query<{name: string, type: number | null, value: number | null, tickets: number[], limit: number | null}, {promocode: string, event_id: number, session: string}>({
        query: (args) => ({
          url: 'order/coupon',
          params: args
        })
      }),
    }),
});

export const {
    useCreateOrderMutation,
    useCreatePaymentMutation,
    useGetOrderQuery,
    useLazyGetCouponQuery
} = orderApi;
