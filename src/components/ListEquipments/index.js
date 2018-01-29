import React, { Component } from 'react';
import { Button, Icon, InputNumber, Table } from 'antd';
import AddEquipmentsContainer from "../../containers/AddEquipmentsContainer";
import './listEquipments.less';
import ColTimeOfUse from "../ColTimeOfUse";

class ListEquipments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      power: 0,
      quantity: 1,
      useOfMonth: [],
      rowForm: {

      },

      columns: [
        {
          title: "Equipamentos",
          dataIndex: "nameEquipment"
        },
        {
          title: "Potência",
          dataIndex: "power",
          key: "power",
          render: (value, data, index) => this.inputNumber(value, 'power', data, index)
        },
        {
          title: "Quantidade",
          dataIndex: "quantity",
          key: "quantity",
          render: (value, data, index) => this.inputNumber(value, 'quantity', data, index)
        },
        {
          title: "Tempo de Uso",
          dataIndex: "date",
          key: "date",
          className: "set-time column-right",
          render: this.timeOfUse
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

  editEquipment = (value, type, data, index) => {

    const { nameEquipment, power, quantity, date  } = data;

    let item;

    if(type === 'power') {
      item = { power: value, quantity, date };
    } else if(type === 'quantity') {
      item = { quantity: value, power, date };
    } else if(type === 'date') {
      item = { date: value, power, quantity };
    }

    let newData = { nameEquipment, ...item };

    this.props.editEquipments(newData, index)
  };


  addUseOfMonth = (useOfMonth, index) => {
    const { listEquipments } = this.props;

    const data = { ...listEquipments[index], useOfMonth, index};

    this.props.addUseOfMonth(data, index)
  };

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

  inputNumber = (number, type, data, index) => {

    let { formatter} = this.state;
    formatter = (type === 'power') ? formatter : {};

    return(
      <InputNumber
        min={0.1}
        value={number}
        {...formatter}
        onChange={value => this.editEquipment(value, type, data, index)}
      />
    )
  };

  timeOfUse = (obj, data, index) => {

    const { modal, toggleModal, editUseOfMonth } = this.props;

    if(obj) {
      return(
        <ColTimeOfUse
          timeOfUse={obj.timeOfUse}
          nameEquipment={data.nameEquipment}
          modal={modal}
          toggleModal={toggleModal}
          useOfMonth={obj.useOfMonth}
          editUseOfMonth={editUseOfMonth}
          addUseOfMonth={this.addUseOfMonth}
          index={index}
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
          rowKey={(data, index) => index}
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