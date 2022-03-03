const Link = (props) => {
    return (
        <a className={
            (
                !props.noClass ? 
                (props.className || "items-center display-flex ") : '') 
                + (props.disabled ? "no-allert" 
                : ""
            )
            } 
            {...props}
            style={{...props.style, 
                padding: (props.noPadding ? "unset" : "")}}>
            {props.children}
        </a>
    );
};

export default Link;