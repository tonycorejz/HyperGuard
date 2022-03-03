const DataTableContainer = (props) => {
    return (
        <section {...props} className="service display-flex direction-column">
            {props.children}
        </section>
    );
};

export default DataTableContainer;