import {
  LIST_DISTRIBUITORS,
  LIST_EQUIPMENTS_DISTRIBUITOR
} from "../reducers/powerDistribuitorReducer/constants";
import { convertUseOfMonth, convertEquipment } from "./equipmentsAction";
import { get, post } from "../modules/request";
import { notificationError } from "./equipmentsAction";

export const listDistribuitors = (index, dataItem) => dispatch => {
  return get("powerdistribuitors")
    .then(data =>
      dispatch({
        type: LIST_DISTRIBUITORS,
        data
      })
    )
    .catch(Error => {
      notificationError("Conexão com o servidor", "Erro ao calcular tarifas");
    });
};

export const createObject = (data, distribuitorId) => {
  const monthIndex = Math.floor(localStorage.getItem("monthIndex")) + 1;

  return {
    powerDistribuitorId: distribuitorId,
    month: monthIndex,
    equipments: data
  };
};

export const updateEquipments = (response, data) => {
  return data.map((item, index) => {
    item = convertEquipment(item, convertUseOfMonth(item.date.useOfMonth));
    item.date.timeOfUse = response[index].timeOfUse;
    item.whiteTariff = response[index].whiteTariffEnergySpending;
    item.conventionalTariff = response[index].conventionalTariffEnergySpending;
    return item;
  });
};

export const listCalculateEquipments = (data, distribuitorId) => dispatch => {
  const newData = data.map(item => {
    const newUseOfMonth = convertUseOfMonth(item.date.useOfMonth);
    item = convertEquipment(item, newUseOfMonth, true);
    return item;
  });

  let newObject = createObject(newData, distribuitorId);

  return post("calculate", newObject)
    .then(response => {
      return dispatch({
        type: LIST_EQUIPMENTS_DISTRIBUITOR,
        dataList: updateEquipments(response, data)
      });
    })
    .catch(error => {
      notificationError("Conexão com o servidor", "Erro ao calcular tarifas");
    });
};

/* export const listCalculateEquipments = data => dispatch => {
    return dispatch({
      type: ADD_EQUIPMENT,
      data
    })
  }; */
