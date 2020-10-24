import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Route, Switch, Redirect, useParams 
} from 'react-router-dom';

import {
	ErrorPage, 
	NotFound, 
	//Identification,
	Chat,
	Home
} from '../pages';



//const NotFoundRedirect = () => withRouter(<Redirect to="/404" />);

 class Routes extends Component {


	render() {
		let {active_user_id} = this.props
		return (
			<Switch>
				
					<Route exact path="/" component={() => <Home/>} />
				
				
					<Route
						path="/salles/"
						component={() => active_user_id?<Chat />: <Redirect to="/" />}
					/>
					<Route
						path="/salle/:id/"
						component={() => active_user_id?<Chat salle_id={useParams().id}/>: <Redirect to="/" />}
					/>
				
				<Route
					path="/400"
					component={() => (
						<ErrorPage
							title={'error.http.bad-request.title'}
							message={'error.http.bad-request.message'}
						/>
					)}
				/>
				<Route
					path="/401"
					component={() => (
						<ErrorPage
							title={'error.http.unauthorized.title'}
							message={'error.http.unauthorized.message'}
						/>
					)}
				/>
				<Route
					path="/403"
					component={() => (
						<ErrorPage
							title={'error.http.forbidden.title'}
							message={'error.http.forbidden.message'}
						/>
					)}
				/>
				<Route path="/404" component={NotFound} />

				<Route
					path="/500"
					component={() => (
						<ErrorPage
							title={'error.http.internal-server-error.title'}
							message={'error.http.internal-server-error.message'}
						/>
					)}
				/>
				<Route
					path="/503"
					component={() => (
						<ErrorPage
							title={'error.http.service-unavailable.title'}
							message={'error.http.service-unavailable.message'}
						/>
					)}
				/>
				<Route component={NotFound} />
			</Switch>
		);
	}
}

function mapStateToProps( state ){
	return (
		{
			active_user_id: state.user.active_user.userId
		}
	);
}

export default connect( mapStateToProps, null )( Routes );
