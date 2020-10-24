import { extendAction } from './common_action';

export const MESSAGE = {
	...extendAction('MESSAGE').CONSTANTE
};

export const message = {
	...extendAction('MESSAGE').action
};
