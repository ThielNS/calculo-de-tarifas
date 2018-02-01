import React, { Component } from 'react';
import { Button, Icon, InputNumber, Table, notification, Input } from 'antd';

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
        nameEquipment: 'Inserir equipamento',
        power: 0,
        quantity: 1,
        date: {
          timeOfUse: '0h',
          useOfMonth: []
        },
        whiteTariff: '-',
        conventionalTariff: '-',
        form: true
      },
      columns: [
        {
          title: "Equipamentos",
          dataIndex: "nameEquipment",
          render: this.inputSearch
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
        parser: value => value.replace('W', '')
      }
    }
  }

  inputSearch = (value, data, index) => {
    if(data.form) {
      return <Input placeholder={data.nameEquipment}/>
    } else {
      return data.nameEquipment
    }
  };

  editEquipment = (value, type, data, index) => {

    const { nameEquipment, power, quantity, date  } = data;
    const { editEquipments } = this.props;

    let item;

    if(type === 'power') {
      item = { power: value, quantity, date };
    } else if(type === 'quantity') {
      item = { quantity: value, power, date };
    } else if(type === 'date') {
      item = { date: value, power, quantity };
    }

    let newData = { nameEquipment, ...item };

    editEquipments(newData, index)
  };


  addUseOfMonth = (dates, index) => {
    const { listEquipments } = this.props;

    const data = { ...listEquipments[index], dates, index};

    this.props.addUseOfMonth(data, index)
  };

  editUseOfMonth = (data, indexDate, indexEquipment, isTime = null) => {

    const { listEquipments, editUseOfMonth } = this.props;

    let dateTime = {};

    let { date } = listEquipments[indexEquipment];

    if(date.useOfMonth[indexDate].timeFinish > date.useOfMonth[indexDate].timeInit) {
      notification['error']({
        message: 'Horas invalidas',
        description: 'A hora inicial deve ser menor que a final'
      })
    } else {
      if(isTime === 'timeInit') {
        dateTime = {
          dateInit: date.useOfMonth[indexDate].dateInit,
          dateFinish: date.useOfMonth[indexDate].dateFinish,
          timeInit: data,
          timeFinish: date.useOfMonth[indexDate].timeFinish
        }
      } else if(isTime === 'timeFinish') {
        dateTime = {
          dateInit: date.useOfMonth[indexDate].dateInit,
          dateFinish: date.useOfMonth[indexDate].dateFinish,
          timeInit: date.useOfMonth[indexDate].timeInit,
          timeFinish: data,
        }
      } else {
        if(Array.isArray(data)) {
          dateTime = {
            dateInit: data[0],
            dateFinish: data[1],
            timeInit: date.useOfMonth[indexDate].timeInit,
            timeFinish: date.useOfMonth[indexDate].timeFinish,
          }
        } else {
          dateTime = {
            dateInit: data,
            dateFinish: data,
            timeInit: date.useOfMonth[indexDate].timeInit,
            timeFinish: date.useOfMonth[indexDate].timeFinish,
          }
        }
      }

      const newdata = { ...listEquipments[indexEquipment], dateTime}

      editUseOfMonth(newdata, indexEquipment, indexDate)
    }
  };

  formattNumber = value => {
    if(typeof(value) === 'string') {
      return value
    } else {
      const number = parseFloat(value).toFixed(2);
      return `R$ ${number}`
    }
  };

  btnRemove = (value, data, index) => {

    if(!data.form) {
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
    }
  };

  inputNumber = (number, type, data, index) => {

    let { formatter} = this.state;
    formatter = (type === 'power') ? formatter : {};

    return(
      <InputNumber
        value={number}
        min={1}
        {...formatter}
        onChange={value => this.editEquipment(value, type, data, index)}
      />
    )
  };

  timeOfUse = (value, data, index) => {

    const { modal, toggleModal } = this.props;

    console.log(value, data, index)

    if(value) {
      return(
        <ColTimeOfUse
          timeOfUse={value.timeOfUse}
          nameEquipment={data.nameEquipment}
          modal={modal}
          toggleModal={toggleModal}
          useOfMonth={value.useOfMonth}
          editUseOfMonth={this.editUseOfMonth}
          addUseOfMonth={this.addUseOfMonth}
          index={index}
          submitData={() => {}}
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
          dataSource={[...listEquipments]}
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