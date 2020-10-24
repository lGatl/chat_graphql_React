import { CONSTANTS } from '../6_actions';
const DEFAULTS = {
	active_menu:'Accueil',
};
export default function (  state = DEFAULTS, action ) {
	// eslint-disable-next-line default-case
	switch ( action.type ) {
		
	case CONSTANTS.Menu.ACTIVE_MENU:
		return { ...state, active_menu: action.payload  };
	
	}
	return state;
}
