import React, {Component} from 'react';

import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { user } from '../actions';

import { ConnexionForm, InscriptionForm } from '../smartComponent/';

import { Menu } from 'semantic-ui-react'

class Home extends Component {
	
	constructor(){
		super()
		this.state = {menu:1}
	}
	
	render(){
		let { active_user } = this.props;
		let { menu } = this.state;

		let connected =  typeof active_user ==="object" && Object.keys(active_user).length>0 
		return (
			<div style={{marginTop:0, width:"100%",display:"flex", alignItems:"center",flexDirection:"column", flex:1}}>
				
				{connected?<div style={{marginTop:0, width:"100%",display:"flex", alignItems:"center",flexDirection:"column", flex:1}}>
					<div onClick={()=>{this.props.logOut()}} style={{ cursor:"pointer"}}>Deconnexion</div>

					Salut {connected ? active_user.firstname : active_user.email }
				</div> : 
					<Menu widths={2}>
						<Menu.Item active={menu===0} onClick={()=>{this.setState({menu:0})}} style={{flex:1, cursor:"pointer"}}>Inscription</Menu.Item>
						<Menu.Item  active={menu===1} onClick={()=>{this.setState({menu:1})}} style={{flex:1, cursor:"pointer"}}>Connexion</Menu.Item>
					</Menu>
						
					}
					
				{ connected?"":
					<div style={{width:400}}>
						{this.state.menu?<ConnexionForm/>:<InscriptionForm/>}
					</div>
				}
				<div style={{flex:1}}></div>
				
				<div style = {{height: "30%", width:"50%", background:"url('/image/icon-textsup200.png')no-repeat center", backgroundSize: "contain"}}>developed by</div>
			</div>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			active_user: state.user.active_user
		}
	);

}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		logOut: user.logOut,
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( Home );
