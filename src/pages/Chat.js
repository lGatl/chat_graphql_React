import React  from 'react';

import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { salle } from '../actions';

import { Menu } from 'semantic-ui-react';

import { useHistory } from 'react-router-dom';

import { Salles, Salle } from '../smartComponent';


const Chat  = ({salle_controle, salleControle,salle_id}) => {
			
			let history = useHistory();

  	const click = (e, { name }) => {
  		salleControle({tosalle:name==="/salles"?false:true})
	    history.push(name)
	  }

		return (
			<div style={{
				display:"flex", 
				padding:5, 
				flexDirection:"column",
				width:"100%",
				height:"100%",
			}}>
				<Menu widths={2}>
					<Menu.Item
	          name='/salles'
	          active={salle_controle.tosalle}
	          onClick={click.bind(this)}>
	          Salles
	          </Menu.Item>
					<Menu.Item
	          name={'/salle/'+salle_controle.selected}
	          active={!salle_controle.tosalle}
	          onClick={click.bind(this)}>
	          Salle
	          </Menu.Item>
				</Menu>
				{salle_controle.tosalle?<Salle/>:<Salles/>}
			</div>
		);
	
	
	}

function mapStateToProps( state ){
	return (
		{
			salle_controle:state.salle.controle
		}
	);

}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
			salleControle:salle.control
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( Chat );
