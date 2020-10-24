import React, { useState, useEffect } from 'react';
import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';

import { salle } from '../actions/';


import {  Segment, Icon } from 'semantic-ui-react';
import {  Input } from '../components/';
import { useHistory } from 'react-router-dom';




const Salles = ({users,active_user_id, salleGet,sallePost,salleControle,salle_controle,salles})=> {
		let history = useHistory();
	
	const requestBody = {
      query: `
          query {
            salles {
            	_id
              name
              date
            }
          }
        `
    };


		useEffect(() => {
	  const interval = setInterval(() => {
	    salleGet({data: requestBody})
	  }, 2000);
	  return () => clearInterval(interval);
		}, []);

	  const change = ({ value, name })=>{
			salleControle({ [name]:value });
		}

		const _sallePost = ()=>{

			const SALLECREATE={
				query:`
					mutation CreateSalle( $name: String!) {
						createSalle(salleInput: {name: $name}) {
							name
							_id
							date
						}
					}
				`,
				variables:{
					name:salle_controle.name
				}
			}
			if(typeof salle_controle.name === "string"&&salle_controle.name.length>0){
				sallePost({data:SALLECREATE})
			}
		}

		const _salleGo = (salle)=>{
			history.push("/salle/"+salle._id)	
			salleControle({selected:salle,tosalle:true})
		}

		return(
			<div style={{
				display:"flex", 
				padding:10, 
				flexDirection:"column",
				width:"100%",
				height:"100%",
				overflow:"hidden",
				
				
			}}>
				<Segment style={{
					
					display:"flex", 
					alignItems:"center",
					
				}}>
					<Input style={{flex:1}}
						name = 'name'
						value = { salle_controle.name ||""}
						onChange = { change } 
					/>

					<Icon onClick={_sallePost} style={{cursor:"pointer"}} name='chevron circle down' size='big' />
				</Segment>	

				<div style={{
					display:"flex", 
					padding:5, 
					flexDirection:"column",
					flex:1,
					overflowY:"scroll",
					backgroundColor:"rgb(240,240,240)",
					borderRadius:10,
					boxShadow: "-1px 2px 5px 3px rgb(200, 200, 200) "
				}}>
				{typeof salles === "object"&&salles instanceof Array?
					salles.map((salle,i)=>
						<Segment 
							onClick = {()=>{_salleGo(salle)}}
						 key={i} 
						 style={{
						 	cursor:"pointer",
							margin:10,
							borderRadius:10,
							display:"flex", 
							alignItems:"center"}}>
								<div style={{flex:1}}>{salle.name}</div><Icon name='trash alternate' size='big' />
						</Segment>):"No Data"}
				
			</div>
			</div>
		
		);

}

function mapStateToProps( state ){
	return (
		{
			salle_controle:state.salle.controle,
			salles:state.salle.got.data,
			active_user_id: state.user.active_user.userId
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		salleControle:salle.control,
		salleGet:salle.get,
		sallePost:salle.post
		
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( Salles );
