import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CSSTransition from './CSSTransition';
import Header from './Header/Header';
import PageLoad from './PageLoad';
import { PageLoadProvider, usePageLoadState } from './Context/PageLoadedContext';
import I18nProvider from 'next-translate/I18nProvider'
import { useSelectedLanguage } from './Context/LanguageContext';
import DynamicNamespaces from 'next-translate/DynamicNamespaces'

import commonEN from "../locales/en/common.json";
import Head from 'next/head';

const Layout = ({children}) => {
    const [pageLoaded, setPageLoaded] = usePageLoadState();
    const [languageSelected] = useSelectedLanguage();
    return (
            <>
            <Head>
                <link
                    rel="preload"
                    href="assets/fonts/VelaSans-GX.ttf"
                    as="font"
                    crossOrigin=""
                    type="font/ttf"
                />
            </Head>
              <PageLoad/>
              {
                <div style={{opacity: (pageLoaded ? 1 : 0)}} className='layout' key="test">
                  <CSSTransition>
                      <Header />
                      {children}
                  </CSSTransition>
                </div>
              } 
            </>
    );
}

export default Layout;