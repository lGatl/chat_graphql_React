import React, { Component }	from 'react';
import { bindActionCreators }	from 'redux';
import { connect } from 'react-redux';
import {  Segment, Icon } from 'semantic-ui-react';

import { Input} from '../components/';

import { message } from '../actions/';

const DATA = [
	{user:1,message:"salut, ca va?"},
	{user:2,message:"Ouech gros! et toi?"},
	{user:1,message:"Bah tranquille! Je suis entrain de taffer..."},
	{user:2,message:"Ah cette heure-ci??!!"},
	{user:1,message:"Hééééééé ouuuuuuuuaaaaaaaaiiiiii, ............. dsl, j'essaie de faire un trés long message c'est pour tester des trucs alors voilà je comble un peu"},
	{user:2,message:"Ok ok !"},
	{user:2,message:"RRRRRRRAAAAAAaahhhhhhhhhh tu m'as interrompu !!!!!!!!"},
	{user:1,message:"salut, ca va?"},
	{user:2,message:"Ouech gros! et toi?"},
	{user:1,message:"Bah tranquille! Je suis entrain de taffer..."},
	{user:2,message:"Ah cette heure-ci??!!"},
	{user:1,message:"Hééééééé ouuuuuuuuaaaaaaaaiiiiii, ............. dsl, j'essaie de faire un trés long message c'est pour tester des trucs alors voilà je comble un peu"},
	{user:2,message:"Ok ok !"},
	{user:2,message:"RRRRRRRAAAAAAaahhhhhhhhhh tu m'as interrompu !!!!!!!!"},	
	{user:1,message:"salut, ca va?"},
	{user:2,message:"Ouech gros! et toi?"},
	{user:1,message:"Bah tranquille! Je suis entrain de taffer..."},
	{user:2,message:"Ah cette heure-ci??!!"},
	{user:1,message:"Hééééééé ouuuuuuuuaaaaaaaaiiiiii, ............. dsl, j'essaie de faire un trés long message c'est pour tester des trucs alors voilà je comble un peu"},
	{user:2,message:"Ok ok !"},
	{user:2,message:"RRRRRRRAAAAAAaahhhhhhhhhh tu m'as interrompu !!!!!!!!"},	
	{user:1,message:"salut, ca va?"},
	{user:2,message:"Ouech gros! et toi?"},
	{user:1,message:"Bah tranquille! Je suis entrain de taffer..."},
	{user:2,message:"Ah cette heure-ci??!!"},
	{user:1,message:"Hééééééé ouuuuuuuuaaaaaaaaiiiiii, ............. dsl, j'essaie de faire un trés long message c'est pour tester des trucs alors voilà je comble un peu"},
	{user:2,message:"Ok ok !"},
	{user:2,message:"RRRRRRRAAAAAAaahhhhhhhhhh tu m'as interrompu !!!!!!!!"},
]

class Salle extends Component {

	componentDidMount() {
    this.intervalId = setInterval(() => this.loadData(), 2000);
    this.loadData(); // also load one immediately
	}

	componentWillUnmount() {
	    clearInterval(this.intervalId);
	}

	loadData() {
		let {salle} = this.props
	    const requestBody = {
      query: `
          query {
				  messages(salle:"${salle._id}"){
				    _id
				    salle
				    author
				    message
				    date
				  }
				}
        `
    };
				this.props.messageGet({data: requestBody})
			
	}
	change({ value, name }){
		this.props.messageControle({ [name]:value });
	}
	_messagePost(){
		let {user_id,salle,message_controle,messagePost} = this.props


		const MESSAGECREATE={
				query:`
					mutation CreateMessage($author: String!, $salle: String!, $message: String!) {
		            createMessage(messageInput: {author: $author, salle: $salle, message: $message}) {
		              _id
		    					author
		    					date
		    					message
		            }
		          }
				`,
				variables:{
				  "author": user_id,
				  "message": message_controle.message,
				  "salle": salle._id
				}
		}
		messagePost({data:MESSAGECREATE})
	}

	render() {

		 let {message_controle,messages,salle,user_id} = this.props;
		return(
			<div style={{
				display:"flex", 
				padding:20, 
				flexDirection:"column",
				width:"100%",
				height:"100%",
				overflow:"hidden",
				
			}}>
				{salle.name}
				<div style={{
					display:"flex", 
					padding:20, 
					flexDirection:"column",
					flex:1,
					overflowY:"scroll",
					backgroundColor:"rgb(240,240,240)",
					borderRadius:10,
					boxShadow: "-1px 2px 10px 3px rgb(200, 200, 200) inset"
				}}>
					{typeof messages ==="object"&& messages instanceof  Array && messages.length > 0 ? messages.map(({message,author,date},i) => <div key={i} style={{display:"flex", justifyContent:author===user_id?"flex-start":"flex-end" }}>
						<Segment inverted color={author===user_id?"blue":"red"} compact style={{margin:10,borderRadius:20}}>
						{date} - {author}  - {message}
					</Segment>
					</div> ):"no data"}
			</div>
			<Segment style={{
				paddingBottom:30, 
				display:"flex", 
				alignItems:"center",
				
			}}>
				<Input style={{flex:1}}
						name = 'message'
						value = { message_controle.message||"" }
						onChange = { this.change.bind( this ) } 
					/>
				<Icon onClick={this._messagePost.bind(this)} style={{cursor:"pointer"}} name='chevron circle up' size='big' />
			</Segment>	
		</div>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			messages: state.message.got.data,
			user_id: state.user.active_user.userId,
			salle: state.salle.controle.selected,
			message_controle:state.message.controle,
		}
	);
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators({
		messageControle: message.control,
		messagePost: message.post,
		messageGet: message.get
	}, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( Salle );
