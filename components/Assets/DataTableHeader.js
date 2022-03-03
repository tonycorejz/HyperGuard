const DataTableHeader = (props) => {
    return (
        <div {...props} className="for-services items-center display-flex contet-space-b">
            {props.children}
        </div>
    );
};

export default DataTableHeader;