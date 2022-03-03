const Container = (props) => {
    return (
        <div 
        {...props} 
        className={`items-center display-flex ${props.className || ""}`} 
        style={{
            ...props.style, 
            cursor: (props.cursor?"pointer":"default"),
            margin: (props.margin || ""),
            marginLeft: (props.marginLeft || "unset"),
            marginRight: (props.marginRight || "unset"),
        }}>
            {props.children}
        </div>
    )
};

export default Container;