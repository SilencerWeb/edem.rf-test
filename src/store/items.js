import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const itemsApi = createApi({
  reducerPath: "itemsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getItems: builder.query({
      query: ({ offset, limit }) => `items?offset=${offset}&limit=${limit}`,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newCache) => {
        currentCache.items.push(...newCache.items);
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return (
          currentArg?.offset !== previousArg?.offset ||
          currentArg?.limit !== previousArg?.limit
        );
      },
      onQueryStarted: async (args, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (args.offset + args.limit >= data.count) {
            setTimeout(() => {
              alert("Поездок больше не найдено");
            });
          }
        } catch (err) {}
      },
    }),
  }),
});

export const { useGetItemsQuery } = itemsApi;
