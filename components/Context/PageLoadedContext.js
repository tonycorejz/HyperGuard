import { createContext, useState, useContext, useEffect } from "react";
import { useSelectedLanguage } from "./LanguageContext";


const PageLoadContext = createContext(false);

export function PageLoadProvider({children}) {
    const [pageLoaded, setPageLoaded] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useSelectedLanguage();

    useEffect(() => {
        if (!(selectedLanguage)){
            return;
        }
        setTimeout(()=> {
            setPageLoaded(true);
        }, 100);
    }, [selectedLanguage]);
    
    return (
        <PageLoadContext.Provider value={[pageLoaded, setPageLoaded]}>
            {!(selectedLanguage) ? <></> : children}
        </PageLoadContext.Provider>
    );
}

export function usePageLoadState() {
    return useContext(PageLoadContext);
}