import React, {Component, Suspense} from 'react';
import jsonData from '../data.json';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Spinner from "react-bootstrap/Spinner";
import {cloneDeep} from 'lodash';
const Words = React.lazy(() => import('./Words'));

export default class Messages extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: jsonData,
            value: null,
        };
    }

    componentDidMount(){
        let t1 = this.state.data;
        let temp_data = jsonData.jMessageList[0].jWordMessageList;
        let t2 = [];
        for(let i=0; i<4000; i++) {
            let tmp_data_in = {};
            tmp_data_in = cloneDeep(temp_data[0]);
            tmp_data_in.id = i+1;
            t2.push(tmp_data_in)
        }
        t1.jMessageList[0].jWordMessageList = t2;
        this.setState({
            data: t1
        })
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        return true;
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;
    }


    expandComponent(row) {
        return (
            <Suspense fallback={<Spinner />}>
                <section>
                    <Words data={row.jWordMessageList} />
                </section>
            </Suspense>
        );
    }

    expandColumnComponent({ isExpandableRow, isExpanded }) {
        let content = '';
        if (isExpandableRow) {
            content = (isExpanded ? '(-)' : '(+)' );
        } else {
            content = ' ';
        }
        return (
            <div> { content } </div>
        );
    }

    isExpandableRow(row) {
        return true;
    }

    render() {
        return (
            <BootstrapTable stripped tableHeaderClass='custom-select-header-class' tableBodyClass='custom-select-body-class'
                            data={this.state.data.jMessageList}
                            expandableRow={ this.isExpandableRow }
                            expandComponent={ this.expandComponent }
                            pagination={true}
                            expandColumnOptions={ {
                                expandColumnVisible: true,
                                expandColumnComponent: this.expandColumnComponent,
                                columnWidth: 50,
                            } }
            >


                <TableHeaderColumn width="170" dataField="id" isKey columnTitle>ID</TableHeaderColumn>
                <TableHeaderColumn width="170" dataField="message"
                                   dataFormat={(cell, row, rowIndex, extraData) => (
                                       <span>{cell.message}</span>
                                   )}
                                   expandable={ false } columnTitle>Message</TableHeaderColumn>
                <TableHeaderColumn width="170" dataField="transmitCapability" expandable={ false } columnTitle>transmitCapability</TableHeaderColumn>
                <TableHeaderColumn width="170" dataField="receiveCapability" expandable={ false } columnTitle>receiveCapability</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}