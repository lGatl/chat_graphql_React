export default obj => {
  let {  data,action, state, body, cbk } = obj;
 
  cbk = typeof cbk === 'function'? cbk : () => {};
 
  return (dispatch, getState) => {
    fetch('http://localhost:8000/graphql', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        //console.log("resData", resData);
        if (resData.data) {
          cbk(resData.data);
           dispatch(
              action({
                indata:data,
                data:resData.data,
                state,
              })
            );
           cbk(resData.data);
        }
      })
      .catch(error => {
        console.log("error", error);
       
      });
  };
};
