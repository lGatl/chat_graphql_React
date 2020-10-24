import React	from 'react';
import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { user } from '../actions/';

import { Input, Button } from '../components/';
import { Form } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom';


	
	//Preparation du rendu
	const ConnexionForm = (props) => {
		let history = useHistory();

		let {email, password} = props.user_controle;

		let change = ({ value, name })=>{
			props.userControl({ [name]:value });
		}
		
		let _userLogIn = (e)=>{
			
			e.preventDefault();
			let {email, password} = props.user_controle;
			if(email&&password){
				props.userLogIn( {
					data:{email, password},
					cbk:()=>{
					   history.push("/salles")	 
				}} );
			}else{
				console.log("error login")
			}
		}

		return (
			
			<Form onSubmit = { _userLogIn.bind( this ) }>
	
				<Form.Field>
					<Input
						label = 'E mail'
						name = 'email'
						autoComplete = "username"
						value = { email||'' }
						onChange = { change.bind( this ) } 
						
					/>
				</Form.Field>
				{<Form.Field>
					<Input
						label = 'Mot de passe'
						name = 'password'
						type = 'password'
						autoComplete = "current-password"
						value = { password||'' }
						onChange = { change.bind( this ) }
					
					/>
				</Form.Field>}
				<Button type = "submit">
				Se Connecter
				</Button>
			</Form>
		);

}

function mapStateToProps( state ){
	return (
		{
			user_controle:state.user.controle,
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		//We use control of user collection
		userControl: user.control,
		//Additional actions
		userLogIn: user.logIn,
		creeCompte: user.creeCompte,
		getActiveUser:	user.getActiveUser,
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( ConnexionForm );
