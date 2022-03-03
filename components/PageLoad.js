import { usePageLoadState } from "./Context/PageLoadedContext";
import styles from './../styles/PageLoad.module.css'
import { useEffect, useState } from "react";
import CSSTransition from "./CSSTransition";

const PageLoad = () => {
    const [t, setT] = useState(false);
    const [pageLoaded, setPageLoaded] = usePageLoadState();
    useEffect(() => {
        if (pageLoaded){
            setTimeout(() => setT(false), 300);
        } else {
            setTimeout(() => setT(true), 100);
        }
    }, [pageLoaded]);

    return (
        <div className={"raise-balance items-center display-flex direction-column" + (t ? " open" : "")}>
            <img className={styles.loading_image} src="/assets/img/logo.svg"/>
            <a className={styles.loading_text}>Загрузка...</a>
        </div>
    );
};

export default PageLoad;