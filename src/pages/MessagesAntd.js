import React, {Component, Suspense} from 'react';
import jsonData from '../data.json';
import Spinner from "react-bootstrap/Spinner";
import { Table } from "antd";
import {cloneDeep} from "lodash";
const WordsAntd = React.lazy(() => import('./WordsAntd'));


export default class MessagesAntd extends Component{
    _expandedRowKeys = new Set();

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
            data: t1,
            expandedRowKeys: Array.from(this._expandedRowKeys.values())
        })
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        return true;
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;
    }


    _onExpand = (expanded, row) => {
        this._toggleExpandByCaseId(row.id);
    };

    _expandRowRender = (row) => {
        return (
            <Suspense fallback={<Spinner />}>
                <section>
                    <WordsAntd data={row.jWordMessageList} />
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
            { title: 'Id', dataIndex: 'id', key: 'id'},
            { title: 'message', dataIndex: 'message', render: (message => {return message.message}) ,key: 'message' },
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
                dataSource={this.state.data.jMessageList} />
        );
    }
}