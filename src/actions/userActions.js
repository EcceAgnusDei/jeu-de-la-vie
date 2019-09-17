import { LOGIN, LOGOUT, DEL } from './types.js';

import apiPath from './../apiPath';


export const login = (pseudo, password) => dispatch =>
		fetch(`${apiPath}logging.php`, {
	      method: 'post',
	      body: JSON.stringify([pseudo, password])
	    })
	    .then(response => response.json())
	    .then(json => {
	    	if(json) {
		        sessionStorage.setItem('userId', json);
		        dispatch({
		        	type: LOGIN,
		        	payload: json
		        });
			} else {
				alert('Idenfiant ou mot de passe incorrect');
			}
	    })
	    .catch(() => console.log('erreur'))
	
export const logout = () => {
	return {
		type: LOGOUT
	}
}