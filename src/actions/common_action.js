import { fetchUrl } from '../libs';

export function extendAction(CONST_NAME) {
  let CONSTANTE = {
    CONTROL: CONST_NAME + '_CONTROL',
    GET: CONST_NAME + '_GET',
    GET_START: CONST_NAME + '_GET_START',
    GET_ADD: CONST_NAME + '_GET_ADD',
    GET_ADD_START: CONST_NAME + '_GET_ADD_START',
    POST: CONST_NAME + '_POST',
    DEL: CONST_NAME + '_DEL',
    SELECT: CONST_NAME + '_SELECT',
    CLEAN: CONST_NAME + '_CLEAN'
  };

  let control = function control(object) {

    return {
      type: CONSTANTE.CONTROL,
      payload: object
    };
  };
    let clean = function clean(string) {
    return {
      type: CONSTANTE.CLEAN,
      payload: {state:string}
    };
  };
  function select(object) {
    return {
      type: CONSTANTE.SELECT,
      payload: object
    };
  }
  let getStart = state => {
    return {
      type: CONSTANTE.GET_START,
      payload: { state }
    };
  };
  let getT = p => {
    return {
      type: CONSTANTE.GET,
      payload: p
    };
  };
  let get = ({data,state,cbk}) => {
    return fetchUrl({
      body: JSON.stringify(data),
      action: getT,
      state,
      msg_error: 'Impossible to ' + CONSTANTE.GET,
      cbk
    });
  };

  const getAddStart = state => {
    return {
      type: CONSTANTE.GET_ADD_START,
      payload: { state }
    };
  };
  const getAddT = p => {
    return {
      type: CONSTANTE.GET_ADD,
      payload: p
    };
  };
  const getAdd = (data, state, cbk = () => {}) => {
    return fetchUrl({
      body: JSON.stringify(data),
      action: getAddT,
      state,
      msg_error: 'Impossible to ' + CONSTANTE.GET_ADD,
      cbk
    });
  };
  const postT = p => {
    return {
      type: CONSTANTE.POST,
      payload: p
    };
  };
  const post = ({data, state,cbk}) => {
    return fetchUrl({
      method: 'POST',
      body: JSON.stringify(data),
      action: postT,
      state,
      msg_error: 'Impossible to ' + CONSTANTE.POST,
      cbk
    });
  };
  const delT = p => {
    return {
      type: CONSTANTE.DEL,
      payload: p
    };
  };
  const del = (data, state, cbk = () => {}) => {
    return fetchUrl({
      method: 'DELETE',
      body: JSON.stringify(data),
      action: delT,
      state,
      msg_error: 'Impossible to ' + CONSTANTE.DEL,
      cbk
    });
  };
  return {
    action: {
      clean,
      control,
      select,
      get,
      getStart,
      getAdd,
      getAddStart,
      post,
      del
    },
    CONSTANTE
  };
}
