import Icon from "./Icon";
import {useState, useRef} from 'react'

const FullImgView = ({img, width, children}) => {
    const [active, setActive] = useState(false)
    const popup = useRef(null)

    const checkClickOutside = (e) => {
        e.stopPropagation()
        if(popup && !popup.current.contains(e.target))
            setActive(false)
    }
    

    return (
    <>
        <div onClick={(e) => {e.stopPropagation(); setActive(true)} }>{children}</div>
        <div className={`raise-balance items-center display-flex direction-column ${active ? "open" : ""}`} onClick={e => checkClickOutside(e)}>
            <div className="container items-center display-flex direction-column">
                <div ref={popup} className="for-raise-balance remove_banner direction-column img_popup">
                    <div className="close-popup display-flex only_close_popup"><Icon id="close_popup" onClick={() => setActive(false)}/></div>
                    <img src={img} style={{width: width, maxWidth: 80+'vw'}} />
                </div>
            </div>
        </div>
    </>
    );
};

export default FullImgView;