import React, { useContext, useRef } from 'react';
import App from 'next/app';
import Layout from '../components/Layout';
import '../styles/globals.css';
import '../public/assets/css/style.css';
import '../public/assets/css/adaptive.css';
import { GlobalUserProvider, GlobalUserContext } from '../components/Context/GlobalUserContext';
import { PageLoadProvider, usePageLoadState } from '../components/Context/PageLoadedContext';
import { LanguageProvider, useSelectedLanguage } from '../components/Context/LanguageContext';

import appWithI18n from 'next-translate/appWithI18n'
import i18nConfig from '../i18n.js'
import Head from 'next/head';


export default function MyApp({Component, pageProps}) {
    return (
        <>
            <Head>
                <title>Hyper Guard</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <LanguageProvider>
                <PageLoadProvider>
                    <GlobalUserProvider>
                        <Layout>
                            <Component {...pageProps}/>
                        </Layout>
                    </GlobalUserProvider>
                </PageLoadProvider>
            </LanguageProvider>
     
        </>
    );
};

/* export default appWithI18n(MyApp, {
    ...i18nConfig,
    // Set to false if you want to load all the namespaces on _app.js getInitialProps
    skipInitialProps: true,
  }) */