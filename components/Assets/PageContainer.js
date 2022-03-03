const PageContainer = (props) => {
    return (
        <div {...props} className="container items-center display-flex direction-column">
            {props.children}
        </div>
    )
};

export default PageContainer;