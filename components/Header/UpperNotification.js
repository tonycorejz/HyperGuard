const UpperNotification = (props) => {
    if (props.amount == 0){
        return (<></>);
    }
    
    return (
        <div className="display-flex">
            <h7>{props.amount}</h7>
        </div>
    );
};

export default UpperNotification;