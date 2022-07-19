/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExpressError } from '@comp326-common/errors/ExpressError';
import LecturerModel from '@comp326-schema/Lecturer.schema';
import { Password } from '@comp326-helpers/password';
import StudentModel from '@comp326-schema/Student.schema';

enum user {
	staff = 'staff',
	admin = 'admin'
}

class AuthDao {

	loginUser = async (id: string, password: string) => {
		const prefix = id.split('/')[0];
		if (prefix.toLowerCase() === user.staff) {
			const staff: any = await LecturerModel.findOne({ staffId: id }).select('+password');
			if (!staff) {
				throw new ExpressError({
					status: 'warning',
					data: {},
					statusCode: 400,
					message: 'Staff does not exist',
				});
			}
			console.log('Staff', staff);
			const mt = await Password.chechPasswordMatch(password, staff.password);
			if (!mt) {
				throw new ExpressError({
					status: 'warning',
					data: {},
					statusCode: 400,
					message: 'Password is incorrect',
				});
			}
			staff.staff = staff.staffId;

			return staff;
		}
		else if (prefix.toLowerCase() === user.admin) {
			const admin: any = await LecturerModel.findOne({ adminId: id }).select('+password');
			if (!admin) {
				throw new ExpressError({
					status: 'warning',
					data: {},
					statusCode: 400,
					message: 'Admin does not exist',
				});
			}
			console.log('Admin', admin);
			const mt = await Password.chechPasswordMatch(password, admin.password);
			if (!mt) {
				throw new ExpressError({
					status: 'warning',
					data: {},
					statusCode: 400,
					message: 'Password is incorrect',
				});
			}

			return admin;
		}
		else {
			const student: any = await StudentModel.findOne({ regNo: id }).select('+password');
			if (!student) {

				throw new ExpressError({
					status: 'warning',
					data: {},
					statusCode: 400,
					message: 'Student does not exist',
				});
			}
			const mt = await Password.chechPasswordMatch(password, student.password);
			if (!mt) {
				throw new ExpressError({
					status: 'warning',
					data: {},
					statusCode: 400,
					message: 'Password is incorrect',
				});
			}
			student.staff = student.regNo;

			return student;
		}

	};

}

export default new AuthDao();
