import React, { Component } from 'react';
import { Modal as BoxModal, Radio, DatePicker, TimePicker } from 'antd';
import moment from "moment";
import './ModalTimeOfUse.less';
import { notification } from "../../../modules/feedback";
import { validateHours, validateMinutes } from "../../../modules/validations";

const { RangePicker } = DatePicker;
const formatDate = 'DD/MM/YYYY';

const formatTime = 'HH:mm';

class ModalTimeOfUse extends Component {

  constructor(props) {
    super(props);
    this.state = {
      valueRadio: 'continuous',
      dateInit: moment().month(this.newMonth()),
      dateFinish: moment().month(this.newMonth()),
      timeInit: null,
      timeFinish: null,
      editDateInit: null,
      editDateFinish: null,
      editTimeInit: null,
      editTimeFinish: null,
    }
  }

  convertDate = value => {
    if(typeof(value) === 'string') {
      const year = value.substr(0, 4);
      const month = value.substr(5, 2);
      const day = value.substr(8, 2);

      return `${day}/${month}/${year}`;
    } else {
      return value
    }
  };

  month = () => {
    return this.props.getMonth
  };

  newMonth = () => {
    const month = Math.floor(this.month());
    const dateMonth = moment().month();
    return month !== null ? month : dateMonth;
  };

  async shouldComponentUpdate(nextProps) {
    if(nextProps.getMonth !== this.props.getMonth) {
      await this.setState(() => ({
        dateInit: moment().month(this.newMonth()),
        dateFinish: moment().month(this.newMonth()),
      }));
      return true;
    }
  }

  componentDidUpdate() {
    const { dateInit, dateFinish, timeInit, timeFinish } = this.state;
    const { addUseOfMonth, index } = this.props;

    if(dateInit && dateFinish && timeInit && timeFinish) {

      if(moment(timeInit).hour() === moment(timeFinish).hour() && moment(timeInit).minute() >= moment(timeFinish).minute()) {
        notification(
          'Minuto inválido',
          'O minuto da hora final deve ser maior que o minuto da hora inicial',
          'error'
        )
      } else if(moment(timeInit).hour() > moment(timeFinish).hour()) {
        notification(
          'Hora inválida',
          'A hora final deve ser maior ou igual à hora inicial',
          'error'
        )
      } else {
        const date = {
          dateInit: dateInit,
          dateFinish: dateFinish,
          timeInit: timeInit,
          timeFinish: timeFinish
        };

        addUseOfMonth(date, index);

        this.setState({
          dateInit: moment().month(this.newMonth()),
          dateFinish: moment().month(this.newMonth()),
          timeInit: null,
          timeFinish: null
        });
        console.log(moment().month(this.newMonth()))
      }
    }

  };

  changeDatePicker = (date) => {
    this.setState({
      dateInit: date,
      dateFinish: date,
    })
  };

  changeRangePicker = (date) => {
    this.setState({
      dateInit: date[0],
      dateFinish: date[1],
    })
  };

  changeTime = (currentTime, propType) => {
    this.setState({
      [propType]: currentTime,
    })
  };

  dateRender = current => {
    if(current.month() === this.month()) {
      return (
        <div className="ant-calendar-date">
          {current.date()}
        </div>
      )
    } else {
      return (
        <div className="ant-calendar-date">
          {current.date()}
        </div>
      )
    }
  };

  disabledDate = current => {

    if(!current) return false;
    const cMonth = current.month();
    const mMonth = moment().month(this.newMonth()).month();
    const cYear = current.year();
    const mYear = moment().year();

    return cMonth !== mMonth || cYear !== mYear;

  };

  convertMoment = (value, format) => {
    return value !== null ? moment(value, format) : null;
  };

  renderDate = (item, indexDate) => {

    const { editUseOfMonth, index } = this.props;
    const { RangePicker } = DatePicker;
    const convertMoment = this.convertMoment;

    if(item.dateInit !== item.dateFinish) {
      return (
        <div className="row">
          <RangePicker
            onChange={data => editUseOfMonth(data, indexDate, index)}
            dateRender={this.dateRender}
            disabledDate={this.disabledDate}
            format={formatDate}
            className="_margin-right"
            defaultValue={[convertMoment(this.convertDate(item.dateInit), formatDate), convertMoment(this.convertDate(item.dateFinish), formatDate)]}
          />
          {this.renderTime(item.timeInit, item.timeFinish, indexDate)}
        </div>
      )
    } else if(item.dateInit === item.dateFinish) {
      return (
        <div className="row">
          <DatePicker
            onChange={data => editUseOfMonth(data, indexDate, index)}
            disabledDate={this.disabledDate}
            format={formatDate}
            className="_margin-right"
            defaultValue={convertMoment(this.convertDate(item.dateInit), formatDate)}
          />
          {this.renderTime(item.timeInit, item.timeFinish, indexDate)}
        </div>
      )
    }
  };

  renderTime = (timeInit = null, timeFinish = null, indexDate) => {

    const { editUseOfMonth, index } = this.props;


    return (
      <div className="row ant-col-sm-12">
        <TimePicker
          defaultValue={this.convertMoment(timeInit, formatTime)}
          format={formatTime}
          placeholder="Hora inicio"
          className="imput-time _margin-right"
          onChange={data => editUseOfMonth(data, indexDate, index, 'timeInit')}
        />
        <TimePicker
          defaultValue={this.convertMoment(timeFinish, formatTime)}
          format={formatTime}
          placeholder="Hora fim"
          className="imput-time"
          disabledHours={() => validateHours(timeInit)}
          disabledMinutes={(hour) => validateMinutes(timeInit, timeFinish)}
          onChange={data => editUseOfMonth(data, indexDate, index, 'timeFinish')}
        />
      </div>
    )
  };

  renderDatePicker = () => {
    const { useOfMonth } = this.props;

    return useOfMonth.map((item, index) => (
      <div key={index} className="_margin-bottom">
        {this.renderDate(item, index)}
      </div>
    ));
  };

  changeOnOk = () => {

    const { closeModal, useOfMonth } = this.props;

    if(useOfMonth.length > 0) {
      return closeModal(true);
    } else {
      notification(
        'Não há data e hora cadastrada',
        'Adicione uma data e uma hora para concluir',
        'error'
      );
    }
  };

  changeOnCancel = () => {
    const { closeModal } = this.props;
    const { timeInit, timeFinish } = this.state;

    if(timeInit && timeFinish) {
      this.setState({
        timeInit: null,
        timeFinish: null,
      });
      closeModal()
    } else {
      closeModal()
    }
  };

  render() {

    const { nameEquipment, visibleModal, useOfMonth } = this.props;
    const { valueRadio, dateInit, dateFinish, timeInit, timeFinish } = this.state;
    const marginTop = useOfMonth.length > 0 ? '_margin-bottom' : '';
    const labelInsert = useOfMonth.length ? <label>Inseridos:</label> : null;

    return (
      <div className="modal-time-of-use">
        <BoxModal
          title={`Tempo de Uso - ${nameEquipment}`}
          style={{width: '600px'}}
          visible={visibleModal}
          onOk={() => this.changeOnOk()}
          onCancel={() => this.changeOnCancel()}
        >
          <div className={marginTop}>
            {labelInsert}
            {this.renderDatePicker()}
          </div>
          <div>
            <div className="row">
              {valueRadio === 'continuous' ? (
                <div>
                  <label>Data inicial/final</label>
                  <RangePicker
s                   onChange={this.changeRangePicker}
                    dateRender={this.dateRender}
                    disabledDate={this.disabledDate}
                    format={'DD/MM/YYYY'}
                    className="_margin-right"
                    value={[dateInit, dateFinish]}
                  />
                </div>
              ) : (
                <div>
                  <label>Dia</label>
                  <DatePicker
                    onChange={this.changeDatePicker}
                    disabledDate={this.disabledDate}
                    format={'DD/MM/YYYY'}
                    className="_margin-right"
                    value={dateInit}
                  />
                </div>
              )}
              <div className="imput-time _margin-right">
                <label>Hora inicial</label>
                <TimePicker
                  value={this.convertMoment(timeInit)}
                  format={formatTime}
                  placeholder="Hora inicio"
                  onChange={data => this.changeTime(data, 'timeInit')}
                />
              </div>
              <div className="imput-time">
                <label>Hora final</label>
                <TimePicker
                  value={this.convertMoment(timeFinish)}
                  format={formatTime}
                  placeholder="Hora fim"
                  disabledHours={() => validateHours(timeInit)}
                  disabledMinutes={(hour) => validateMinutes(timeInit, timeFinish)}
                  onChange={data => this.changeTime(data, 'timeFinish')}
                />
              </div>
            </div>
          </div>
        </BoxModal>
      </div>
    )

  }
}

export default ModalTimeOfUse;