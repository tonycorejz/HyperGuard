import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request) {
    const shouldHandleLocale =
        !PUBLIC_FILE.test(request.nextUrl.pathname) &&
        !request.nextUrl.pathname.includes('/api/');
  
    if (shouldHandleLocale){
        
        if (!(request.cookies["NEXT_LOCALE"])){
            const res = NextResponse.rewrite(`/ru${request.nextUrl.pathname}`);
            res.cookie('NEXT_LOCALE', "ru");
            return res;
       /*      return NextResponse.redirect(`/ru${request.nextUrl.pathname}`); */
        } else if (request.cookies["NEXT_LOCALE"] !== request.nextUrl.locale){
            return NextResponse.redirect(`/${request.cookies["NEXT_LOCALE"]}${request.nextUrl.pathname}`);
        }
    }
    
    return undefined;
    /* if (!PUBLIC_FILE.test(request.nextUrl.pathname)){
        
    } */

    /* return shouldHandleLocale
        ? NextResponse.redirect(`/ru${request.nextUrl.pathname}`)
        : undefined; */
}