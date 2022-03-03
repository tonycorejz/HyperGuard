import Router from "next/dist/client/router";
import { createContext, useState, useContext, useEffect } from "react";
import Cookies from 'js-cookie';

const LanguageContext = createContext(null);

function setLanguage(str) {
    if (typeof window !== "undefined") {
        Cookies.set('NEXT_LOCALE', str)
        return str;
    }
    return null;
}

export function updateLanguage(str) {
    if (typeof window !== "undefined") {
        setLanguage(str);
        Router.reload(window.location.pathname);
        return str;
    }
    return null;
}

export function getLanguage(){
    if (typeof window !== "undefined") {
        return Cookies.get('NEXT_LOCALE')
    }

    return null;
}

export function LanguageProvider({children}) {
    const [selectedLanguage, setSelectedLanguage] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            let i = getLanguage();

            if (!(i) || (i !== 'ru' && i !== 'en')){
                i = setLanguage('ru');
            }

            setSelectedLanguage(i);
        }
    },[]);

    return (
        <LanguageContext.Provider value={[selectedLanguage, (str) => {
            setSelectedLanguage(str);
            updateLanguage(str);
        }]}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useSelectedLanguage() {
    return useContext(LanguageContext);
}