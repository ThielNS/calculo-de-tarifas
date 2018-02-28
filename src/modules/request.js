import {notificationError} from "../actions/equipmentsAction";

const API_URL = "http://192.168.3.79:80";
//const API_URL = "https://private-581d3-itse1.apiary-mock.com";

export const get = (url) =>{
  return request(url, {
    method: 'GET'
  });
};

export const post = (url, data) => {
  return request(url, {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

export const patch = (url, data) => {
  return request(url, {
    method: 'PATCH',
    body: JSON.stringify(data)
  });
};

export const request = (url, { contentType = 'application/json', ...customOptions }) => {
  const headers = {
  };

  if (contentType) {
    headers['Content-type'] = contentType;
  }

  const options = {
    ...customOptions,
    headers,
  };

  return fetch(`${API_URL}/${url}`, options)
    .then(response => {
      // if(response.statusCode.toString().match(/^4/)) {
      //   return response.json()
      // }
      return response.json();
    })
    .catch(error => {
      notificationError("Conexão com o servidor", "Erro ao obter as informações do servidor")
    });
};
