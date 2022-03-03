import { useEffect, useState } from "react";
import Image from "next/image";
import { render } from "react-dom";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { useWallet } from "@solana/wallet-adapter-react";


const SearchResults = (props) => {
    const [pagesLoaded, setPagesLoaded] = useState(false);
    /*
     * Paging logic
     */
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(null);   
    // is responsive for amount of lines displayed on each page 
    const [linesLimit, setLinesLimit] = useState(4);
    // is responsive for maximum amount of pages
    const [dataLimit, setDataLimit] = useState(1);
    // is responsive for showing getPaginatedGroup() amount of pages
    const [pageLimit, setPageLimit] = useState(5);
    const [isLastPage, setIsLastPage] = useState(false);
    const [isFirstPage, setIsFirstPage] = useState(false);
    const [pagesTimeout, setPagesTimeout] = useState(false);
    const wallet = useWallet();

    const updatePage = () => {
        let test = props.data;
         
        if (pagesLoaded){
            return;
        }
        
        getPaginatedData();
        setIsFirstPage(!isCurrentPageNotFirst());
        setIsLastPage(!isCurrentPageNotLast());
    }

    const isCurrentPageNotFirst = () => {
        return currentPage > 1;
    }

    const isCurrentPageNotLast = () => {
        return pages && dataLimit > 0 ? currentPage < dataLimit : false;
    }

    const logic_changePage = (num) => {
        setPagesTimeout(true);
        setCurrentPage(num);
    };

    function goToNextPage() {
        console.log("[NEXT PAGE] CALL");
        if (pagesTimeout){
            return;
        }
        if (isCurrentPageNotLast()){
            logic_changePage((currentPage) => currentPage + 1);
            setPagesLoaded(false);
        }
            
    }

    const goToPreviousPage = () => {
        console.log("[PREVIOUS PAGE] CALL");
        if (pagesTimeout){
            return;
        }
        
        if (isCurrentPageNotFirst()){
            logic_changePage((currentPage) => currentPage - 1);
            setPagesLoaded(false);

        }    
    }

    const changePage = (event) => {
        if (pagesTimeout){
            return;
        }
        const pageNumber = Number(event.target.textContent);
        if (pageNumber !== currentPage) {
            setPagesLoaded(false);
            setPages(null);
            logic_changePage(pageNumber);
        }
    }

    const isDataEmpty = (data) => !(data) || data.length < 1;

    const getPaginatedData = () => {
        console.log(props.data);
        /* fetchDomainLogs(parseInt(page), currentPage - 1); */
        /* setPagesLoaded(false); */
        const offset = (currentPage - 1) * linesLimit; 
        /* let data = await props.dataFetch(currentPage, linesLimit); */
        let data = null;
        if (isDataEmpty(props.data) === false){
            data = props.data.slice(offset, offset + linesLimit);
        }

        setPages(data);
        setPagesLoaded(true);
         
        if (isDataEmpty(data)){
            setDataLimit(currentPage - 1);
            setCurrentPage(currentPage - 1);
        } else{
            let t = props.data.length % linesLimit;
            setDataLimit(Math.floor(props.data.length / linesLimit) + (t > 0 ? 1 : 0));
            setCurrentPage(currentPage);
        }
        // not yet implemented
    };

    const getPaginationGroup = () => {
        if (dataLimit < 1)
            return [];

        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;

        let length = dataLimit - start;
        let pages_amount = pageLimit > length ? length : pageLimit;

        let t = new Array(pages_amount).fill().map((_, idx) => start + idx + 1);
        return t;

        /* scrapped yo im asleep
        let start = 0;//Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        if (currentPage !== 1 && currentPage % pageLimit === 0)
            start = pageLimit - 1;
        else
            //start = currentPage - 1;
            start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;

        let length = pages.length - start;
        let pages_amount = pageLimit > length ? length : pageLimit;

        let t = new Array(pages_amount).fill().map((_, idx) => start + idx + 1);
         
        return t;
        */
    };
    ///////////////////////////////////////////////

    const renderPlanet = 
    /**
     * @param {PlanetData} obj 
     */
    (obj, i) => {
        return (
            <div key={"search-result" + i} className="container page-search">
                <img src={obj.img_url}/>
                <h4>🪐 {obj.name}</h4>
                <h6><span>{obj.description}</span></h6>
                <div className="for-info-planet"><h4>Type:</h4><h4><span>{obj.type}</span></h4></div>
                <div className="for-info-planet"><h4>Atmosphere:</h4><h4><span>{obj.atmosphere}</span></h4></div>
                <div className="for-info-planet"><h4>Mass:</h4><h4><span>{obj.mass} kg</span></h4></div>
                <div className="for-info-planet"><h4>Diameter:</h4><h4><span>{obj.diameter * 1000} km</span></h4></div>
                <div className="for-info-planet"><h4>Star:</h4><h4><span>{FindStar(obj.star_id).name}</span></h4></div>
                <div className="for-info-planet">
                    <h4>Owner:</h4>
                    <h4 className="owner-info">
                        <span>{(
                                wallet.publicKey && wallet.publicKey.toBase58() === obj.owner ?
                                "You" : 
                                obj.owner.length < 1 ? 
                                "none" : obj.owner
                            )}</span>
                    </h4>
                </div>
                <button onClick={() => onInspectClick(obj)} className="to-go-btn">Inspect</button>
            </div>
        );
    }


    const onInspectClick = 
    /**
     * 
     * @param {StarData | PlanetData} obj 
     */
    (obj) => {
        obj.is_star ? SendMoveToStar(obj.id) : SendMoveToPlanet(obj.id);
        onClose();
    }

    const renderStar = 
    /**
     * @param {StarData} obj 
     */
    (obj, i) => {
        return (
            <div key={"search-result" + i + 1000} className="container page-search">
                <img src={obj.img_url}/>
                <h4>✨ {obj.name}</h4>
                <h6><span>{obj.description}</span></h6>
                <div className="for-info-planet"><h4>Mass:</h4><h4><span>{obj.mass} kg</span></h4></div>
                <div className="for-info-planet"><h4>Diameter:</h4><h4><span>{obj.diameter * 1000} km</span></h4></div>
                <div className="for-info-planet"><h4>Planets:</h4><h4><span>{obj.planets_amount}</span></h4></div>
                <div className="for-info-planet"><h4 >Owner:</h4><h4 className="owner-info"><span>{obj.owner}</span></h4></div>
                <button onClick={() => onInspectClick(obj)} className="to-go-btn">Inspect</button>
            </div>
        );
    }
    
    const singleResult = 
    /**
     * @param {PlanetData | StarData} obj 
     */
    (obj, i) => {
        return obj.is_star ? renderStar(obj, i) : renderPlanet(obj, i);
    }

    const appendResults = () => {
        updatePage();
        const r = renderResults();
        return r;
    };

    const renderResults = () => {
        if (!(pages) || pages.length < 1){
            return;
        }

        return (
            <div key={"search-results-page" + currentPage} className="search-page-planet">
                { pages.map((v, i) => singleResult(v, i)) }
            </div>
        );
    }

    
    useEffect(() => {
        if (!(props.state)){
            return;
        }
        if (!pagesLoaded){
            
        }
        setPagesTimeout(true);
        updatePage();
        setTimeout(() => setPagesTimeout(false), 700);
    },[pages, props.data, currentPage, pagesLoaded, props]);

    const onClose = () => {
        setCurrentPage(1);
        setPagesLoaded(false);
        props.onClose();
    }

    return (
        <ReactCSSTransitionGroup
            transitionName="popup-transition"
            transitionAppear={true}
            transitionAppearTimeout={300}       
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
        >
        {!props.state ? (<div key="432423"></div>) : (<div key="43242">
            <div key="results-modal-overlay1" className="modal-overlay"><div></div></div>
            <div key="results-modal1" className="search-result-page modal">
                <h3 className="title">{props.text}</h3>
                <div className="search-result-container">
                    
                    <section className="pages-for-planet">    
                        <ReactCSSTransitionGroup
                            transitionName="popup-transition"
                            transitionAppear={true}
                            
                            transitionEnter={true}
                            transitionLeave={true}
                        >
                            {appendResults()}
                        </ReactCSSTransitionGroup>     
                    </section>
                </div>
                
                <section className="for-pages" style={pagesTimeout ? {display: 'none'} : {}}>
                    <button style={{margin: '0 auto'}} onClick={onClose}>Close</button>
                    <div className="search-page-planet for-pages">
                        <div className="container for-pages-selector">
                            <h5 onClick={() => goToPreviousPage()}><span className="arrow-page left"></span>Back</h5> 
                            {getPaginationGroup().map(v => {
                                return (<div key={v} onClick={(v) => changePage(v)}
                                    className={v === currentPage ? "page select-page" : "page"}>{v}</div>);
                            })}
                            <h5 onClick={() => goToNextPage()}>Next<span className="arrow-page right"></span></h5> 
                        </div>
                    </div>
                </section>
                
            </div>
            </div>)
        }
        </ReactCSSTransitionGroup> 
    );
};

export default SearchResults;