import moment from 'moment';

console.log(
	moment(new Date().getTime()).year() -
		moment('1910-07-17T08:41:15.435Z').year(),
);
