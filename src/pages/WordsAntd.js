import React, {Suspense} from 'react';
import { Button } from 'react-bootstrap';
import Spinner from "react-bootstrap/Spinner";
import { Table } from "antd";

export default class WordsAntd extends React.Component{
    _expandedRowKeys = new Set();

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            value: null,
        };
    }

    componentDidMount(){
        this.setState({
            expandedRowKeys: Array.from(this._expandedRowKeys.values())
        })
    }

/*
    componentDidUpdate(prevProps, prevState, snapshot) {}

    shouldComponentUpdate(nextProps, nextState, nextContext) {}
*/

    _onExpand = (expanded, row) => {
        this._toggleExpandByCaseId(row.id);
    };

    _expandRowRender = (row) => {
        return (
            <Suspense fallback={<Spinner />}>
                <section>
                    <h5 class="text-center">Expanded Row</h5>
                </section>
            </Suspense>
        );
    }

    _toggleExpandByCaseId = (id) => {
        this._expandedRowKeys.has(id)
            ? this._expandedRowKeys.delete(id)
            : this._expandedRowKeys.add(id);

        this.setState({
            expandedRowKeys: Array.from(this._expandedRowKeys.values())
        });
    };

    render() {
        const columns = [
            { title: 'Id', dataIndex: 'id', key: 'id' },
            { title: 'wordMessage', dataIndex: 'wordMessage', render: (wordMessage => {return wordMessage.message}), key: 'wordMessage' },
            { title: 'transmitCapability', dataIndex: 'transmitCapability', key: 'transmitCapability' },
            { title: 'receiveCapability', dataIndex: 'receiveCapability', key: 'receiveCapability' },
        ];


        return (
            <Table
                columns={columns}
                expandedRowKeys={this.state.expandedRowKeys}
                onExpand={this._onExpand}
                rowKey="id"
                expandedRowRender={this._expandRowRender}
                dataSource={this.state.data} />

        );
    }
}