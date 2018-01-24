import React, { Component } from 'react';
import { Select } from 'antd';
import "./chooseMonthly.less";
import Moment from 'moment';
import 'moment/locale/pt-br';

const { Option } = Select;

class ChooseMonthly extends Component {
    constructor(props) {
        super(props);

        this.state = {
            monthlys: [
                {
                    number: 0,
                    name: 'Janeiro'
                },
                {
                    number: 1,
                    name: 'Fevereiro'
                },
                {
                    number: 2,
                    name: 'Maio'
                },
                {
                    number: 3,
                    name: 'Março'
                },
                {
                    number: 4,
                    name: 'Abril'
                },
                {
                    number: 5,
                    name: 'Junho'
                },
                {
                    number: 6,
                    name: 'Julho'
                },
                {
                    number: 7,
                    name: 'Agosto'
                },
                {
                    number: 8,
                    name: 'Setembro'
                },
                {
                    number: 9,
                    name: 'Outubro'
                },
                {
                    number: 10,
                    name: 'Novembro'
                },
                {
                    number: 11,
                    name: 'Dezembro'
                }
            ],
            currentMonthly: ''
        }
    }
    handleChange(value) {
        console.log(`Selected ${value}`);
    }
    renderOptions() {
        const { monthlys } = this.state;
        return monthlys.map((item, index) => (
            <Option value={item.name} key={index}>{item.name}</Option>
        ))
    }

    gettingMonths() {
        const m = new Moment();
        let listMonths = [];
        for (let i = 0; i < 12; i++) {
            listMonths.push(
                <Option key={i} value={m.month(i).format('MMMM')}>{m.month(i).format('MMMM')}</Option>
            )
        }

        return listMonths;
    }

    render() {
        const date = new Date();
        const currentMonthly = date.getMonth();


        return (
            <div className="content-select option-left" >
                <i className="label-distribuitors">Mês</i>
                <Select
                    className="select-monthly"
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Janeiro"
                    optionFilterProp="children"
                    firstActiveValue={currentMonthly}
                    onChange={this.handleChange}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {this.gettingMonths()}
                </Select>
            </div>
        )
    }
}

export default ChooseMonthly;