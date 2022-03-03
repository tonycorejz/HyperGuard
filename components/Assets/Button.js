import Router from "next/dist/client/router";

const Button = (props) => {
    return (
        <button {...props} 
            onClick={(v, a) => {
                if (props.href){
                    Router.push(props.href);
                }
                else if (props.onClick){
                    props.onClick(v, a);
                }
            }}
            className={"button " + (props.className || "")} 
        >{props.children}</button>
    );
};

export default Button;