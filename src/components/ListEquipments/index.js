import React, { Component } from 'react';
import { Button, Icon, InputNumber, Table } from 'antd';
import AddEquipmentsContainer from "../../containers/AddEquipmentsContainer";
import './listEquipments.less';
import ColTimeOfUse from "../ColTimeOfUse";

class ListEquipments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      power: 0,
      list: [
        {
          id: '1',
          equipments: 'Computer de mesa',
          power: '200',
          quantity: 2,
          useOfMonth: {
            timeOfUse: "10:25:45",
            dates: [
              {
                dateInit: "2018-01-01",
                dateFinish: "2018-01-02",
                timeInit: "16:45:00",
                timeFinish: "17:15:00"
              }
            ]
          },
          whiteTariff: 25.59,
          conventionalTariff: 28.76
        }
      ],
      columns: [
        {
          title: "Equipamentos",
          dataIndex: "nameEquipment"
        },
        {
          title: "Potência",
          dataIndex: "power",
          key: "power",
          className: "column-right",
          render: value => this.inputNumber(value, 'power')
        },
        {
          title: "Quatidade",
          dataIndex: "quantity",
          key: "quantity",
          className: "column-right",
          render: value => this.inputNumber(value, 'quantity')
        },
        {
          title: "Tempo de Uso",
          dataIndex: "useOfMonth",
          key: "useOfMonth",
          className: "set-time column-right",
          render: date => this.timeOfUse(date)
        },
        {
          title: "Tarifa Branca",
          dataIndex: "whiteTariff",
          key: "whiteTariff",
          className: "column-right",
          render: price => this.formattNumber(price)
        },
        {
          title: "Tarifa Convencional",
          dataIndex: "conventionalTariff",
          key: "conventionalTariff",
          className: "column-right",
          render: price => this.formattNumber(price)
        },
        {
          dataIndex: "id",
          key: "id",
          render: id => this.btnRemove(id)
        },
      ],
      formatter: {
        formatter: value => `${value}W`,
        parser: value => value.replace('W', ''),
        step: 0.1
      }
    }
  }

  formattNumber = value => {
    const number = parseFloat(value).toFixed(2);
    return `R$ ${number}`
  };

  btnRemove = id => {
    return (
      <Button
        type="danger"
        size="small"
        onClick={() => this.removeItem(id)}
        ghost
      >
        <Icon type="close" />
      </Button>
    );
  };

  removeItem = id => {
    console.log(id, 'removeItem')
  };

  inputNumber = (number, type) => {

    let { formatter} = this.state;
    formatter = (type === 'power') ? formatter : {};

    return(
      <InputNumber
        min={0.1}
        value={number}
        {...formatter}
        onChange={value => this.changeNumber(value, type)}
      />
    )
  };

  changeNumber = (value, type) => {
    if(type === 'quantity') {
      this.setState({ quantity: value })
    } else if(type === 'power') {
      this.setState({ power: value })
    }
  };

  timeOfUse = data => {

    const { modal, toggleModal } = this.props;

    if(data) {
      return(
        <ColTimeOfUse
          timeOfUse={data.timeOfUse}
          modal={modal}
          toggleModal={toggleModal}
          useOfMonth={data}
        />
      );
    }
  };

  render() {

    const { columns, formatter } = this.state;
    const { listEquipments } = this.props;

    return (
      <div className="card">
        <Table
          dataSource={listEquipments}
          columns={columns}
          pagination={false}
          className="list-equipmets"
          rowKey="id"
          footer={() =>
            <AddEquipmentsContainer
              inputNumber={this.inputNumber.bind(this)}
              formattNumber={this.formattNumber.bind(this)}
              formatter={formatter}
            />
          }
        />
      </div>
    );
  }
}

export default ListEquipments;