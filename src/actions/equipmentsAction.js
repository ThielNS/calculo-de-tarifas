
import {
  ADD_EQUIPMENT, EDIT_EQUIPMENTS, EDIT_USE_OF_MONTH, LIST_EQUIPMENTS,
  REMOVE_EQUIPMENTS
} from "../reducers/equipmentsReducer/constants";
import { get, post } from "../modules/request";

export const listEquipments = () => dispatch => {
  return dispatch({ type: LIST_EQUIPMENTS })
};

export const searchEquipments = name => dispatch => {

  const limit = 5;

  return get(`equipments?name=${name}&limit=${limit}`)
    .then(data => data)
    .catch(error => {
      console.error(error);
    })
};

const convertRequestData = (data) => {

  let newData = { useOfMonth: [] };


  data.date.useOfMonth.map((item) => {

    let { useOfMonth } = newData;
    let dates = {};
    console.log(item);

    if(typeof(item.dateInit) !== 'string' || typeof(item.dateFinish) !== 'string') {
      dates = { ...dates,
        dateInit: item.dateInit.format('YYYY-MM-DD'),
        dateFinish: item.dateFinish.format('YYYY-MM-DD'),
      };
    } else {
      dates = { ...dates,
        dateInit: item.dateInit.substr(0, 10),
        dateFinish: item.dateFinish.substr(0, 10)
      };
    }

    if(typeof(item.timeInit) !== 'string') {
      dates = { ...dates,
        timeInit: item.timeInit.format('HH:mm')
      };
    } else {
      dates = { ...dates,
        timeInit: item.timeInit.substr(11, 5)
      };
    }

    if(typeof(item.timeFinish) !== 'string') {
      dates = { ...dates,
        timeFinish: item.timeFinish.format('HH:mm')
      };
    } else {
      dates = { ...dates,
        timeFinish: item.timeFinish.substr(11, 5)
      };
    }

    console.log(dates)

    useOfMonth.push(dates);

    return item
  });

  newData.power = data.power;
  newData.quantity = data.quantity;

  return {
    powerDistribuitorId: "019EA005-6182-4F8D-95A4-DE3D86CBA51B",
    month : 1,
    equipments: [
      newData
    ]
  };

};

export const addEquipment = data => dispatch => {

  const newData = convertRequestData(data);

  post('calculate', newData)
    .then(response => {
      data.date.timeOfUse = response[0].timeOfUse;
      data.whiteTariff = response[0].whiteTariffEnergySpending;
      data.conventionalTariff = response[0].conventionalTariffEnergySpending;
      return dispatch({
        type: ADD_EQUIPMENT,
        data
      })
    });


};

export const removeEquipments = index => dispatch => {
  return dispatch({
    type: REMOVE_EQUIPMENTS,
    index: index
  })
};

//TODO: converter data

export const editEquipments = (data, index) => dispatch => {

  const newData = convertRequestData(data);

  post('calculate', newData)
    .then(response => {
      data.date.timeOfUse = response[0].timeOfUse;
      data.whiteTariff = response[0].whiteTariffEnergySpending;
      data.conventionalTariff = response[0].conventionalTariffEnergySpending;
      return dispatch({
        type: EDIT_EQUIPMENTS,
        dataItem: data,
        index,
      })
    });
};

export const addUseOfMonth = (data, index) => dispatch => {

  const { dates, ...restData } = data;

  restData.date.useOfMonth.push(dates);

  const newData = convertRequestData(restData);

  post('calculate', newData)
    .then(response => {
      restData.date.timeOfUse = response[0].timeOfUse;
      restData.whiteTariff = response[0].whiteTariffEnergySpending;
      restData.conventionalTariff = response[0].conventionalTariffEnergySpending;
      return dispatch({
        type: EDIT_EQUIPMENTS,
        dataItem: restData,
        index,
      })
    });
};

export const editUseOfMonth = (data, indexEquipment, indexDate) => dispatch => {

  const { dateTime, ...restData } = data;

  restData.date.useOfMonth[indexDate] = dateTime;

  const newData = convertRequestData(restData);


  post('calculate', newData)
    .then(response => {
      restData.date.timeOfUse = response[0].timeOfUse;
      restData.whiteTariff = response[0].whiteTariffEnergySpending;
      restData.conventionalTariff = response[0].conventionalTariffEnergySpending;
      return dispatch({
        type: EDIT_USE_OF_MONTH,
        data: restData,
        indexEquipment,
        indexDate
      })
    });
};

export const resetListEquipments = dispatch => {
  return dispatch({
    type: REMOVE_EQUIPMENTS
  })
};