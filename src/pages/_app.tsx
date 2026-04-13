import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import { RecoilRoot } from 'recoil';
import Layout from '@/components/layouts/Layout';
import AppTheme from '@/theme/AppTheme';
import { initializeApollo, ApolloProviderWrapper } from '@/lib/with-apollo';
import AuthGuard from '@/components/common/AuthGuard';
import { UserProvider } from '@/contexts/UserContext';

type ZwiltPage<P = {}> = NextPage<P> & {
    requireAuth?: boolean;
};

interface ZwiltAdminAppProps extends AppProps {
    Component: ZwiltPage;
}

export default function App({ Component, pageProps }: ZwiltAdminAppProps) {
    const getLayout =
        (Component as any).getLayout ||
        ((page: any) => <Layout>{page}</Layout>);

    return (
        <RecoilRoot>
            <AppTheme>
                <ApolloProviderWrapper>
                    <UserProvider>
                        {Component.requireAuth !== false ? (
                            <AuthGuard>
                                {getLayout(<Component {...pageProps} />)}
                            </AuthGuard>
                        ) : (
                            getLayout(<Component {...pageProps} />)
                        )}
                    </UserProvider>
                </ApolloProviderWrapper>
            </AppTheme>
        </RecoilRoot>
    );
}
