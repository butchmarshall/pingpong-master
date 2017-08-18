import Immutable from 'immutable';

const Authentication = Immutable.Record({
	'client': undefined,
	'uid': undefined,
	'access-token': undefined,
	'expiry': undefined,
}, 'Authentication');

export default Authentication;