import  DataTable from 'react-data-table-component';

function DataTableStudents(title, columns, data, pending){
    return (
        <DataTable title={title} columns={columns} data={data} sortactive progressPending={pending}  pagination/>
    );
}

export default DataTableStudents;