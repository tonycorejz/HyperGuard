import { useState } from "react";
import { useSelectedLanguage } from "../Context/LanguageContext";
import Icon from "./Icon";

const LanguageSelector = () => {
    const [selectedLanguage, setSelectedLanguage] = useSelectedLanguage();
    const [openState, setOpenState] = useState(false);

    const onLanguageChange = () => {
        setOpenState(false);
        setSelectedLanguage(selectedLanguage == 'ru' ? 'en' : 'ru');
    }

    return (
        <>
            <div className="for-flag choose-flag" onClick={() => setOpenState(!openState)}>
                <Icon id={selectedLanguage} className="img-flag"/>
            </div>
            <div 
                className={"choose-language for-flag " + (openState ? "open" : "")}
                onClick={onLanguageChange}
            >
                <Icon id={selectedLanguage == 'ru' ? 'en' : 'ru'} className="img-flag"/>
            </div>
        </>
    );
};

export default LanguageSelector;