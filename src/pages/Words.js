import React from 'react';
import { Button } from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


export default class Messages extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            value: null,
        };
    }

    componentDidMount(){}

/*
    componentDidUpdate(prevProps, prevState, snapshot) {}

    shouldComponentUpdate(nextProps, nextState, nextContext) {}
*/

    isExpandableRow(row) {
        return true;
    }

    expandComponent(row) {
        return (
            <Button>asdasd</Button>
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

    expandedColumnHeaderComponent({ anyExpand }) {
        const content = (anyExpand ? '(-)' : '(+)' );
        return (
            <div>
                { content }
            </div>
        );
    }

    render() {
        return (
            <BootstrapTable stripped tableHeaderClass='custom-select-header-class' tableBodyClass='custom-select-body-class'
                data={this.state.data}
                expandableRow={ this.isExpandableRow }
                expandComponent={ this.expandComponent }
                pagination={true}
                expandColumnOptions={{
                    expandColumnVisible: true,
                    expandColumnComponent: this.expandColumnComponent,
                    columnWidth: 50,
                    expandedColumnHeaderComponent: this.expandedColumnHeaderComponent
                }}>

                <TableHeaderColumn width="170" dataField="id" isKey columnTitle>ID</TableHeaderColumn>
                <TableHeaderColumn width="170" dataField="wordMessage"
                                   dataFormat={(cell, row, rowIndex, extraData) => (
                                       <span>{cell.message}</span>
                                   )}
                                   columnTitle>Word</TableHeaderColumn>
            </BootstrapTable>

        );
    }
}