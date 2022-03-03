const DataTableColumn = (props) => {
    return (
        <tbody {...props}>
            <tr>
                {props.children}
            </tr>
        </tbody>
    );
};

export default DataTableColumn;