import { useState, useEffect } from "react";

const SearchBar = (props) => {
    const [searchState, setSearchState] = useState(false);
    const [searchStateHack, setSearchStateHack] = useState(false);
    const [hackTimeout, setHackTimeout] = useState(null);

    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchIsLoading, setSearchIsLoading] = useState(false);
    const [searchLoaded, setSearchLoaded] = useState(false);
    const [input, setInput] = useState("");

    useEffect(() => {
        props.onDataChange(props.data)
    }, [props.data])

    const changeState = () => {
        if (hackTimeout){
            return;
        }
        if (input.length > 1){
            fetchData("");
        }
        
        setSearchStateHack(!searchStateHack);
        
        setHackTimeout(
            setTimeout(() => {
                setSearchState(!searchState);
                if (searchState){
                    props.onDataChange(props.data);
                    setInput("");
                }
                setHackTimeout(null);
            }, 100)
        );
        
    }

    const cancelSearch = () => clearTimeout(searchTimeout);


    const fetchData = (str_input) => {
        setSearchIsLoading(true);
        setInput("");
        setTimeout(() => {
            props.onDataChange(props.data.filter(v => {
                return (v[props.filterField || "name"] || "").indexOf(str_input) != -1; 
            }));
            setSearchIsLoading(false);
            setInput(str_input);
        }, 250);
    }

    const onInput = 
    /**
     * 
     * @param {InputEvent} ev 
     */
    (ev) => {
        if (searchIsLoading){
            // not working da i pohuy
            ev.preventDefault();
            ev.nativeEvent.stopImmediatePropagation();
            return true;
        }
        
        if (typeof(ev) !== 'object' || !(ev.target)){
            return;
        }
        const val = ev.target.value;
        setInput(val);
        setSearchLoaded(false);
        setSearchIsLoading(false);
        cancelSearch();

        setSearchTimeout(setTimeout(() => {
            fetchData(val);
        }, 1000));
    };

    const onFocusLost = (ev) => {
        ev.preventDefault();
        console.log("sdfsdf")
        /*setTimeout(() => {
            cancelSearch();
            setSearchLoaded(true);
        }, 500);*/
        
    };

    return (
        <div>
            <div className="search-after-767px items-center">
                <input 
                    value={input}
                    onInput={onInput}
                    /* onblur={e => onFocusLost(e)} */
                    style={{display:(searchStateHack? "inherit" : "none")}} 
                    className={`text-search items-center ${searchState?"open":""}`} 
                    placeholder={searchIsLoading ? "Загрузка.." : "Введите запрос"}
                    disabled={searchIsLoading}
                    type="text" id="text-search-0"
                />
                <label 
                    onClick={()=>changeState()} 
                    className={`button-s ${searchState?"open":""}`} 
                    id="btn-search-0"
                ></label>
            </div>
        </div>
    );
};

export default SearchBar;