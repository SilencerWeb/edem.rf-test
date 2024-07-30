import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Item } from 'types';

export const itemsApi = createApi({
  reducerPath: 'itemsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    getItems: builder.query<{ items: Item[]; count: number }, { offset: number; limit: number }>({
      query: ({ offset, limit }) => `items?offset=${offset}&limit=${limit}`,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newCache) => {
        currentCache.items.push(...newCache.items);
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg?.offset !== previousArg?.offset || currentArg?.limit !== previousArg?.limit;
      },
      onQueryStarted: async (args, { queryFulfilled }) => {
        queryFulfilled
          .then(({ data }) => {
            if (args.offset + args.limit >= data.count) {
              setTimeout(() => {
                alert('Поездок больше не найдено');
              });
            }
          })
          .catch(() => null);
      },
    }),
  }),
});

export const { useGetItemsQuery } = itemsApi;
