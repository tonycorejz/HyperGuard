import Icon from "./Icon";

const ProfilePicture = (props) => {
    const style = {
        ...props.style, 
        width: props.size || '1em', 
        height: props.size || '1em',
        marginRight: (props.style ? (props.style.marginRight || '0.9375em') : '0.9375em')
    };
    return (
        <div style={style} className="display-flex">
            <Icon id="user" className=""/>
        </div>
    );
};

export default ProfilePicture;