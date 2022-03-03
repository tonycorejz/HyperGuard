
const UserPanelDropdown = (props) => {
    const [dropdownState, setDropdownState] = useState(false);

    return (
        <div className="border-19px cursor-pointer check" onClick={() => setDropdownState(!dropdownState)}>
            <h4 className="display-flex">{props.name}<img className="arrow transition_0_2" src="./assets/img/arrow.svg"/></h4>
            <div className={`transition_0_2 ${props.className || ""} ${dropdownState ? "open" : ""}`}>
                {props.children}
            </div>
        </div>
    );
};

const PanelButton = (props) => {
    return (
        <button {...props} className={`new-product-btn ${props.color ? `button-${props.color}` : ""}`}>
            {props.children}
        </button>
    )
}

const TestPage = () => {
    const [state, setState] = useState(false);
    const balance = 30000;
    
    return (
        <>
            <UserPanelDropdown className="you_credit display-flex" name="Кредит">
                <p>Доступные средства: {balance}Р</p>
            </UserPanelDropdown>
            <UserPanelDropdown className="new-product" name="Вклад">
                <PanelButton color="orange">Открыть вклад</PanelButton>
            </UserPanelDropdown>
            <UserPanelDropdown className="new-product" name="Ипотека">
                <PanelButton color="orange">Оформить ипотеку</PanelButton>
            </UserPanelDropdown>
        </>
    );
};

export default TestPage;