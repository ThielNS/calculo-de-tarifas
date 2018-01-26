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
      columns: [
        {
          title: "Equipamentos",
          dataIndex: "nameEquipment"
        },
        {
          title: "Potência",
          dataIndex: "power",
          key: "power",
          render: value => this.inputNumber(value, 'power')
        },
        {
          title: "Quantidade",
          dataIndex: "quantity",
          key: "quantity",
          render: value => this.inputNumber(value, 'quantity')
        },
        {
          title: "Tempo de Uso",
          dataIndex: "date",
          key: "date",
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
          render: this.btnRemove
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

  btnRemove = (value, data, index) => {

    const { removeEquipments } = this.props;

    return (
      <Button
        type="danger"
        size="small"
        onClick={() => removeEquipments(index)}
        ghost
      >
        <Icon type="close" />
      </Button>
    );
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
          useOfMonth={data.useOfMonth}
        />
      );
    }
  };

  render() {

    const { columns, formatter } = this.state;
    const { listEquipments } = this.props;
    console.log(listEquipments);

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