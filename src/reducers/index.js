
import { combineReducers } from 'redux';

import message from './message_reducer';
import salle from './salle_reducer';
import user from './user_reducer';
import controle from './controle_reducer';

//Join ALL Reducers
export default combineReducers({
	
	message,
	user,
	controle,
	salle
});
