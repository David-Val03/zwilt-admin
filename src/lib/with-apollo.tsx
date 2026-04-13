import { HttpLink, ApolloClient, InMemoryCache, NormalizedCacheObject, ApolloProvider } from '@apollo/client';
import React from 'react';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

function createApolloClient() {
    const httpLink = new HttpLink({
        uri: '/graphql', // proxied by Next.js to localhost:5005/graphql
        fetch,
        credentials: 'include',
        fetchOptions: {
            credentials: 'include',
        },
    });

    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: httpLink,
        cache: new InMemoryCache(),
    });
}

export function initializeApollo(initialState?: any) {
    const _apolloClient = apolloClient ?? createApolloClient();

    if (initialState) {
        _apolloClient.cache.restore(initialState);
    }

    if (typeof window === 'undefined') return _apolloClient;

    if (!apolloClient) {
        apolloClient = _apolloClient;
    }

    return _apolloClient;
}

export const ApolloProviderWrapper: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const client = initializeApollo();
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
