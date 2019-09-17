import {LOGIN, LOGOUT} from '../../actions/types.js'

const initialId = sessionStorage.getItem('userId') || 0;

export default (state = initialId, action) => {
	const { type, payload } = action; 
	
	switch(type) {
		case LOGIN:
			return payload;
			break;
		case LOGOUT:
			sessionStorage.removeItem('userId');
			return 0;
			break;
		default:
			return state;
	}
}