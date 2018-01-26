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
            currentMonthly: ''
        }
    }

    handleChange(value) {
       /*  console.log(`Selected ${value}`); */
    }

    renderOptions() {
        const { monthlys } = this.state;
        return monthlys.map((item, index) => (
            <Option value={item.name} key={index}>{item.name}</Option>
        ))
    }

    getMonths() {
        const m = new Moment();
        let listMonths = [];
        for (let i = 0; i < 12; i++) {
            listMonths.push(
                <Option key={i} value={m.month(i).format('MMMM')}>{m.month(i).format('MMMM')}</Option>
            )
        }

        return listMonths;
    }

    getCurrentMonth() {
        const date = new Date();
        const currentMonth = date.getMonth();
/*         console.log(currentMonth)
 */        return currentMonth;
    }

    render() {
        return (
            <div className="content-select option-left" >
                <i className="label-distribuitors">Mês</i>
                <Select
                    className="select-monthly"
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Janeiro"
                    optionFilterProp="children"
                    firstActiveValue={this.getCurrentMonth()}
                    onChange={this.handleChange}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {this.getMonths()}
                </Select>
            </div>
        )
    }
}

export default ChooseMonthly;