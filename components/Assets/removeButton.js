import Button from "../../components/Assets/Button";
import Icon from "./Icon";
import {useState, useRef} from 'react'

const RemoveButton = ({actionFunc, dataForAction, children}) => {
    const [active, setActive] = useState(false)
    const popup = useRef(null)

    const checkClickOutside = (e) => {
        e.stopPropagation()
        if(popup && !popup.current.contains(e.target))
            setActive(false)
    }
    
    const doAction = () => {
        actionFunc(...dataForAction)
        setActive(false)
    }

    return (
    <>
        <div onClick={(e) => {e.stopPropagation(); setActive(true)} }>{children}</div>
        <div className={`raise-balance items-center display-flex direction-column ${active ? "open open-op" : ""}`} onClick={e => checkClickOutside(e)}>
            <div className="container items-center display-flex direction-column">
                <div ref={popup} className="for-raise-balance remove_banner for-authorization direction-column">
                    <div className="close-popup display-flex only_close_popup"><Icon id="close_popup" onClick={() => setActive(false)}/></div>
                    <h1>Вы уверены, что хотите<br/>выполнить действие?</h1>
                    <Button onClick={() => doAction()} >Выполнить</Button>
                </div>
            </div>
        </div>
    </>
    );
};

export default RemoveButton;