import * as React from 'react';
import ReactTable from "react-table";

class Datatable extends React.Component<any, any>{

    render() {
        return <ReactTable
            data={this.props.data}
            columns={this.props.columns}
            noDataText="Kayıt Yok"
            defaultPageSize={20}
            style={{
              height: "400px" 
            }}
            className="-striped -highlight"
        />
    }
}

export default Datatable;