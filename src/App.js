import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import { Router } from 'react-router-dom';

import history from "./history";

import rootReducer from './reducers';

import Routes from './routes/routes';

import { SmartMenu, Kon, Resize } from './smartComponent';

//import { User } from './imports/smartComponent';
import { withRouter } from 'react-router-dom';


import './App.css';

let Store = {};
	
	const composeEnhancers = composeWithDevTools({});
	Store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

	const SmartMenuR = withRouter(props => <SmartMenu {...props} />);


	
class App extends Component {
	constructor(props) {
		super(props);
		this.timeStartLoad = Date.now();

		this.initApp = true;
	}


	render() {

		return !this.initApp ? (
			<div className="App">
			loading
			</div> 
		) : (

			<Provider store={Store}>
				<Router history={history} Store = {Store}>
				<div 
					className="App" 
					style ={{display:"flex", flexDirection:"row"}}
				> 	
					<Resize/>
					<div style ={{display:"flex", flexDirection:"column", width:"100%",height:"100%"}}>
							<div style={{width:"100%", display:"flex", flexDirection:"column"}}>
								<SmartMenuR/>
								<Kon/>
							</div>
							<div style={{display:"flex", flexDirection:"column", alignItems:"center",justifyContent:"center",width:"100%",flex:1,overflow:"hidden",boxSizing:"border-box",}}>
								<div style={{display:"flex", flexDirection:"column", alignItems:"center",width:"100%",flex:1,boxSizing:"border-box",overflow:"hidden", maxWidth:"800px"}}>
									<Routes />
								</div>
							</div>
					</div>	
				</div>
				</Router>
			</Provider>

		);
	}
}

export default App;
