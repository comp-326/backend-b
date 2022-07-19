import { ExpressError } from '@comp326-common/errors/ExpressError';
import { gradeType } from '@comp326-schema/StudentSession.schema';

export function grade(marks: number): gradeType {
	if (marks > 100|| marks < 0) {
		throw new ExpressError({
			data: {},
			message: 'Invalid marks',
			status: 'error',
			statusCode: 400,
		});
	}
	if (marks >= 70 && marks <= 100)
		return 'A';

	if (marks >= 60)
		return 'B';

	if (marks >= 50)
		return 'C';

	if (marks >= 40)
		return 'D';

	return 'F';
}