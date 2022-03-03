const Icon = (props) => {
    return (
        <img 
            src={`/assets/img/${props.id}.${props.format || 'svg'}`} 
            className={props.className || "img-user"}
            {...props}
        />
    );
};

export default Icon;