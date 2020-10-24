import { extendAction } from './common_action';

export const SALLE = {
	...extendAction('SALLE').CONSTANTE
};

export const salle = {
	...extendAction('SALLE').action
};
