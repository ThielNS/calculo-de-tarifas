import React, { Component } from 'react';
import { Modal as BoxModal, Radio, DatePicker, TimePicker } from 'antd';
import moment from "moment";
import './ModalTimeOfUse.less';

const { RangePicker } = DatePicker;
const formatDate = 'DD/MM/YYYY';

class Modal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      valueRadio: 'continuous',
      dateInit: null,
      dateFinish: null,
      timeInit: null,
      timeFinish: null,
    }
  }

  handleRadio = e => {
    this.setState({
      valueRadio: e.target.value,
    })
  };

  componentDidUpdate() {
    const { dateInit, dateFinish, timeInit, timeFinish } = this.state;
    const { handleUseOfMonth } = this.props;

      if(dateInit && dateFinish && timeInit && timeFinish) {

        const date = {
          dateInit: dateInit,
          dateFinish: dateFinish,
          timeInit: timeInit,
          timeFinish: timeFinish
        };

        handleUseOfMonth(date);

        this.setState({
          dateInit: null,
          dateFinish: null,
          timeInit: null,
          timeFinish: null
        });

        this.forceUpdate();
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
    if(current.month() === 0) {
      return (
        <div className="ant-calendar-date">
          {current.date()}
        </div>
      )
    } else {
      return (
        <div className="ant-calendar-date" style={{color: '#eee'}}>
          {current.date()}
        </div>
      )
    }
  };

  disabledDate = current => {

    if(!current) return false;

    const cMonth = current.month();
    const mMonth = moment().month();
    const cYear = current.year();
    const mYear = moment().year();

    return cMonth < mMonth || cMonth !== mMonth || cYear !== mYear;

  };

  convertMoment = value => {
    return value !== null ? moment(value) : null;
  };

  renderDate = (item) => {

    const { valueRadio } = this.state;
    const { RangePicker } = DatePicker;
    const convertMoment = this.convertMoment;

    if(item.dateInit !== item.dateFinish && valueRadio === 'continuous' ) {
      return (
        <div className="row">
          <RangePicker
            onChange={this.handleDateRange}
            dateRender={this.dateRender}
            disabledDate={this.disabledDate}
            format={formatDate}
            className="_margin-right"
            value={[convertMoment(item.dateInit), convertMoment(item.dateFinish)]}
          />
          {this.renderTime(item.timeInit, item.timeFinish)}
        </div>
      )
    } else if(item.dateInit === item.dateFinish && valueRadio === 'daily' ) {
      return (
        <div className="row">
          <DatePicker
            onChange={this.handleDatePicker}
            disabledDate={this.disabledDate}
            format={formatDate}
            className="_margin-right"
            value={convertMoment(item.dateInit)}
          />
          {this.renderTime(item.timeInit, item.timeFinish)}
        </div>
      )
    }
  };

  renderTime = (timeInit = null, timeFinish = null) => {

    const formatTime = 'HH:mm';

    return (
      <div className="row ant-col-sm-12">
        <TimePicker
          value={this.convertMoment(timeInit)}
          format={formatTime}
          placeholder="Hora inicio"
          className="imput-time _margin-right"
          onChange={data => this.changeTime(data, 'timeInit')}
        />
        <TimePicker
          value={this.convertMoment(timeFinish)}
          format={formatTime}
          placeholder="Hora fim"
          className="imput-time"
          onChange={data => this.changeTime(data, 'timeFinish')}
        />
      </div>
    )
  };

  renderDatePicker = () => {
    const { useOfMonth } = this.props;

    return useOfMonth.map((item, index) => (
      <div key={index} className="_margin-bottom">
        {this.renderDate(item)}
      </div>
    ));
  };

  render() {

    const { nameEquipment, visibleModal, closeModal } = this.props;
    const { valueRadio, dateInit, dateFinish, timeInit, timeFinish } = this.state;

    const RadioGroup = Radio.Group;
    const RadioButton = Radio.Button;

    return (
      <div className="modal-time-of-use">
        <BoxModal
          title={`Tempo de Uso - ${nameEquipment}`}
          style={{width: '600px'}}
          visible={visibleModal}
          onOk={() => closeModal(true)}
          onCancel={closeModal}
        >
          <RadioGroup defaultValue={valueRadio} size="small" onChange={this.handleRadio}>
            <RadioButton value="continuous">Uso Contínuo</RadioButton>
            <RadioButton value="daily">Uso Diário</RadioButton>
          </RadioGroup>
          <div className="_margin-top">
            {this.renderDatePicker()}
          </div>

          <div>
            <div className="row _margin-top">
              {valueRadio === 'continuous' ? (
                <RangePicker
                  onChange={this.changeRangePicker}
                  dateRender={this.dateRender}
                  disabledDate={this.disabledDate}
                  format={'DD/MM/YYYY'}
                  className="_margin-right"

                  value={[dateInit, dateFinish]}
                />
              ) : (
                <DatePicker
                  onChange={this.changeDatePicker}
                  disabledDate={this.disabledDate}
                  format={'DD/MM/YYYY'}
                  className="_margin-right"
                  value={dateInit}
                />
              )}
              {this.renderTime(timeInit, timeFinish)}
            </div>
          </div>
        </BoxModal>
      </div>
    )

  }
}

export default Modal;