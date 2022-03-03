import { useState, useRef } from "react";

const SearchSelect = ({searchTerms, currentSearchTerm, setCurrentSearchTerm}) => {
    const [open, setOpen] = useState(false)
    const dropdown = useRef(null)

    const checkClickOutside = (e) => {
        if(dropdown && !dropdown.current.contains(e.target))
            setOpen(false)
    }

    const onSelect = (term) => {
        setCurrentSearchTerm(term)
        setOpen(false)
    }

    return (
        <>
            <div className={open ? "check_click_outside" : ""} onClick={e => checkClickOutside(e)}></div>
            <div className="display-flex direction-column" ref={dropdown}>
                <h2 className=" items-center display-flex" onClick={() => setOpen(!open)}>
                    {currentSearchTerm.text}
                    <div className="arrow">
                        <span className="arrow-left"></span>
                        <span className="arrow-right"></span>
                    </div>
                </h2>
                <ul className={`submenu  ${open ? "open" : ""}`}>
                    {
                        searchTerms.map((term) => 
                            term != currentSearchTerm && <h2 class="search_select" onClick={() => onSelect(term)}>{term.text}</h2> 
                        )
                    }
                </ul>
            </div>
        </>
    );
};

export default SearchSelect;