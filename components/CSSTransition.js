import ReactCSSTransitionGroup from "react-addons-css-transition-group";

const CSSTransition = ({speed, children}) => {
    return (
        <ReactCSSTransitionGroup
            transitionName="popup-transition"
            transitionAppear={true}
            transitionAppearTimeout={800}       
            transitionEnterTimeout={800}
            transitionLeaveTimeout={800}
        >
            {children}
        </ReactCSSTransitionGroup>
    );
}

export default CSSTransition;