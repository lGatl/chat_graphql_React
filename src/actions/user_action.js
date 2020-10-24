import { fetchUrl } from '../libs';

import { extendAction } from '../actions/common_action';

//Export constant, types of actions
export const USER = { 
	CREE_COMPTE: 'USER_CREE_COMPTE',
	GET_ACTIVE_USER: 'USER_GET_ACTIVE_USER',
	PUT_USER_ID: 'USER_PUT_USER_ID',
	LOG_IN: 'USER_LOG_IN',
	LOG_OUT: 'USER_LOG_OUT',
	...extendAction('USERS').CONSTANTE
};

//Meteor Methods for account system have to be called by client
//We prepare actions with them

	/*
	 *Create Account
	 *second parameter: user - object of user to add
	 *payload.val: user coming from parameters
	*/
let creeCompteT = p => {
    return {
		type: 		USER.CREE_COMPTE,
		payload: 	p
	};
}

function creeCompte({data, cbk}){
	let {email,password} = data;
	let requestBody = {
        query: `
          mutation CreateUser($email: String!, $password: String!) {
            createUser(userInput: {email: $email, password: $password}) {
              _id
              email
            }
          }
        `,
        variables: {
          email: email,
          password: password
        }
      };

	return fetchUrl({
						data,
						cbk,
						body:JSON.stringify(requestBody),
	          action:creeCompteT
	        })
}
	/*
	 *Login
	
	*/
	let logInT = p => {
	    return {
			type: 		USER.LOG_IN,
			payload: 	p
		};
	}
function logIn({data,cbk}){
	let {email,password} = data;
	let requestBody = {
      query: `
        query Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
          }
        }
      `,
      variables: {
        email: email,
        password: password
      }
    };
	return fetchUrl({
						cbk,
						data,
						body:JSON.stringify(requestBody),
	          action:logInT
	        })

}
	/*
	 *LogOut
	*/
let logOutT = p => {
	    return {
			type: 		USER.LOG_OUT,
			payload: 	p
		};
}	

function logOut( cbk = ()=>{}){
	return (dispatch, getState) => {

					dispatch(
          logOutT()
        );
				cbk()
	};
}
	/*
	 *Get the user connected here
	 *payload.val: object - user connected => user put in active_user
	*/
	let getActiveUserT = p => {
	    return {
				type: USER.GET_ACTIVE_USER,
				payload: 	p
			};
	}

export function getActiveUser( cbk = ()=>{} ){ 
	
	return (dispatch, getState) => {
		dispatch(/*putUserId(Meteor.userId())*/)
		/*Meteor.call('get1USERS', Meteor.userId(), ( err, res ) => {
				if(err){
					console.log(USER.GET_ACTIVE_USER, " - ACTION ERROR",err)
					
				}else{
					console.log(USER.GET_ACTIVE_USER)
					
					dispatch(
          getActiveUserT({ data:res})
        );
				cbk()
			}
		});*/
	};
}
//Export Actions
export const user = { 
	creeCompte,
	logIn,
	logOut,
	getActiveUser,
	...extendAction('USERS').action
};
