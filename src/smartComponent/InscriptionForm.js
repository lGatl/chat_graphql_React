import React, { Component }	from 'react';
import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { user } from '../actions/';

import { Input, Button } from '../components/';
import { Form } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom';



const FormulaireDInscription = (props) => {
	let history = useHistory();

	const init = () => {
		return {
			email: '',
			password: '',
			surname: '',
			firstname: '',
			agreement:true,
		};
	}
	
	//Controle
	const change = ({ value, name, checked }) => {
		checked?props.userControl({ [name]:checked }):props.userControl({ [name]:value });
	}
	//Action
	const _creeCompte = (e) => {
		
		let {email,password} = props.user_controle;

		email = typeof email=='string'&&email.length>0?email:false;
		password = typeof password=='string'&&password.length>0?password:false;

		if(email && password){
			props.creeCompte({data:{
				email,
				password,
				},cbk:()=>{
					props.userLogIn( {
						data:{email, password},
						cbk:()=>{
						   history.push("/salles")	 
					}} );
			}
			});
		}else{
			console.log({
				title:'Error data for login',
				message:'give at least email, password & check agreement' ,
				type:'info',
				icon:'fa-info'
			});
		}
	}
	

		let {email,password} = props.user_controle;

		return (

				<Form style={{flex:2}} onSubmit={_creeCompte.bind( this )}>
					<Form.Field>
					<Input
						label = 'E mail'
						name = 'email'
						value = { email || '' }
						onChange = { change.bind( this ) } 
					/>
					</Form.Field>
					<Form.Field>
					<Input
						label = 'Mot de passe'
						name = 'password'
						type = 'password'
						autoComplete=''
						value = { password || '' }
						onChange = { change.bind( this ) }
					/>
					</Form.Field>

					<Button
						type ="submit" >				
					Create
					</Button>
				</Form>
		);
	}


function mapStateToProps( state ){
	return (
		{
			user_controle: state.user.controle
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		userControl: user.control,
		creeCompte: user.creeCompte,
		userLogIn: user.logIn
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( FormulaireDInscription );


