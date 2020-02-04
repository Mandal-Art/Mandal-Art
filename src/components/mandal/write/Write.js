import React, {Component} from 'react';
import {List} from 'immutable';
import * as firebase from "firebase";
import Table from '../Table.js';

class Write extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: List([
                    List(['', '', '', '', '', '', '', '', '']),
                    List(['', '', '', '', '', '', '', '', '']),
                    List(['', '', '', '', '', '', '', '', '']),
                    List(['', '', '', '', '', '', '', '', '']),
                    List(['', '', '', '', '', '', '', '', '']),
                    List(['', '', '', '', '', '', '', '', '']),
                    List(['', '', '', '', '', '', '', '', '']),
                    List(['', '', '', '', '', '', '', '', '']),
                    List(['', '', '', '', '', '', '', '', '']),
                ]
            )
        }
    }

    change=(data) => {
        this.setState({
            data:data
        });
    }


    onSave = (e, uid) => {
        e.preventDefault();

        let database = firebase.database();

        let time=new Date();
        let date=`${time.getFullYear()}년 ${time.getMonth()+1}월 ${time.getDate()}일 ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;

        // console.log(date);
        database.ref(`mandal/${uid}/`).push({
            data: JSON.stringify(this.state.data),
            time: date
        });
    }

    onPrint = () => {
        window.print();
    }

    render() {
        return (
            <section className="mandal-section">

                <Table data={this.state.data} change={this.change}></Table>

                <div className="flex justify-center">
                    <button onClick={(e) => this.onSave(e, JSON.parse(localStorage.getItem('logInfo')).user.uid)}>저장하기
                    </button>
                </div>

                <div className="flex justify-center">
                    <button onClick={this.onPrint}>프린트하기</button>
                </div>

            </section>
        );
    }
}

export default Write;