import { useEffect, useState } from "react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Container from "./Container";
import DataTableColumn from "./DataTableColumn";

const DataTable = (props) => {
    const [pagesLoaded, setPagesLoaded] = useState(false);
    /*
     * Paging logic
     */
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(null);   
    // is responsive for amount of lines displayed on each page 
    const [linesLimit, setLinesLimit] = useState(props.linesLimit || 5);
    // is responsive for maximum amount of pages
    const [dataLimit, setDataLimit] = useState(3);
    // is responsive for showing getPaginatedGroup() amount of pages
    const [pageLimit, setPageLimit] = useState(5);
    const [isLastPage, setIsLastPage] = useState(false);
    const [isFirstPage, setIsFirstPage] = useState(false);
    const [pagesTimeout, setPagesTimeout] = useState(false);

    const updatePage = () => {
        getPaginatedData();
        setIsFirstPage(!isCurrentPageNotFirst());
        setIsLastPage(!isCurrentPageNotLast());
    }

    const isCurrentPageNotFirst = () => {
        return currentPage > 1;
    }

    const isCurrentPageNotLast = () => {
        return pages && dataLimit > 0 ?  currentPage < dataLimit : false;
    }

    const logic_changePage = (num) => {
        setPagesTimeout(true);

        setTimeout(() => {
            setCurrentPage(num);
            setPagesLoaded(false);
        }, 100);
    };

    function goToNextPage() {
        console.log("[NEXT PAGE] CALL");
        if (pagesTimeout){
            return;
        }
        if (isCurrentPageNotLast()){
            logic_changePage((currentPage) => currentPage + 1);
            
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
        console.log("paginated data: ")
        console.log(props.data);
        /* fetchDomainLogs(parseInt(page), currentPage - 1); */
        /* setPagesLoaded(false); */
        const offset = (currentPage - 1) * linesLimit; 
        /* let data = await props.dataFetch(currentPage, linesLimit); */
        let data = null;
        if (isDataEmpty(props.data) === false){
            data = props.data.slice(offset, offset + linesLimit);
        }

        console.log(data);
        setPages(data);
        console.log(pages);
        setPagesLoaded(true);
         
        if (isDataEmpty(data)){
            setDataLimit(1);
            setCurrentPage(1);
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
    };

    useEffect(() => {

        if (!pagesLoaded){
            setPages(props.data);
            setPagesLoaded(true);
            return;
        }
        setPagesTimeout(true);
        updatePage();
        setTimeout(() => setPagesTimeout(false), 700);
    },[props.data, currentPage, pagesLoaded]);

    const renderData = () => {
        if (!(pages) || pages.length < 1){
            return (
                <DataTableColumn>
                    <td>{props.emptyText || "Нет данных"}</td>
                </DataTableColumn>
            );
        }

        if (!(props.render)){
            return;
        }

        console.log("render")
        console.log(pages.length)
        return pages.map((v, i) => props.render(v, i));
    };

    const renderPlaceholder = () => {
        let placeholder = [];
        
        for (let index = 0; index < linesLimit; index++) {
            placeholder.push((
                <DataTableColumn>
                    {
                        props.columns.map((v, i) => 
                        <td key={i}><span className="td-placeholder loading-anim">......................</span></td>)
                    }
                </DataTableColumn>
            ));
        }

        return placeholder;
    }

    const PageNumber = (props) => {
        const {number} = props;
        return (
            <div {...props}
                className={currentPage == number ? "select-page" : "page"}
                onClick={(v) => changePage(v)}
            >{number}</div>
        )
    };

    const FastForward = (props) => {
        const [inputState, setInputState] = useState(false);
        const [buttonState, setButtonState] = useState("");
        const [input, setInput] = useState("");
        const pagGroup = getPaginationGroup();

        if (pagGroup.length < 1) {
            return <></>;
        }

        if (pagGroup[pagGroup.length - 1] >= dataLimit){
            return <></>;
        }

        const applyFastForward = () => {
            if (buttonState != ""){
                return;
            }

            const resetButton = () => setTimeout(() => setButtonState(""), 200);

            const num = parseInt(input);

            if (num < 1 || num > dataLimit){
                setButtonState("error");
                resetButton();
                return;
            }

            setButtonState("success");
            resetButton();
            logic_changePage(num);
        }

        return (
            <>
                <div className="choose-page direction-column">
                    <div
                        onClick={() => setInputState(!inputState)}
                        className={`three-dots ${inputState ? "rot-90": ""}`}>{inputState ? "|||" : "..."}</div>
                    <div className="for-page-search">
                        <input 
                            value={input}
                            onInput={e => setInput(e.target.value)}
                            className={`text-search items-center page-search ${inputState ? "open" : ""}`} 
                            placeholder="№ страницы" 
                            type="text"
                            patter="[0-9]*"
                        />
                        <div 
                            onClick={applyFastForward}
                            className={`btn-search-page ${inputState ? "open" : ""} ${buttonState}`}></div>
                    </div>
                </div>
                <PageNumber number={dataLimit}/>
            </>
        )
    }

    const DataColumns = () => {
        if (isDataEmpty(props.columns) || isDataEmpty(pages)){
            return <></>
        }

        return props.columns.map((v, i) => <th key={`col-${i}`}>{v}</th>);
    }

    return (
        <>
            <table className="table-cupons">
                <thead>
                    <tr style={{height: "10px"}}>
                        <DataColumns/>
                    </tr>
                </thead>
                { !pagesTimeout ? renderData() : renderPlaceholder() }
            </table>
            <Container className="pages">
                <Container disabled={isFirstPage} cursor={!isFirstPage} margin={true}>
                    <span className="arrow-page left"></span>
                    <p onClick={() => goToPreviousPage()}>Назад</p>
                </Container> 
                <Container margin={true}>
                    {
                        getPaginationGroup().map((v, i) => {
                            return (
                                <PageNumber key={"page-" + v} number={v}/>
                            )
                        })
                    }
                </Container>
                <FastForward/>
                <Container disabled={isLastPage} cursor={!isLastPage} margin={true}>
                    <p onClick={() => goToNextPage()}>Вперед</p>
                    <span className="arrow-page right"></span>
                </Container> 
            </Container>
        </>
    )
};

export default DataTable;