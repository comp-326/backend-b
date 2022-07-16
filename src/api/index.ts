import { Router } from 'express';
import adminRoutes from './routers/admin.routes';
import authRoutes from './routers/auth.routes';
import coursesRoutes from './routers/courses.routes';
import departmentsRoutes from './routers/departments.routes';
import facultyRoutes from './routers/faculty.routes';
import lecturersRoutes from './routers/lecturers.routes';
import studentsRoutes from './routers/students.routes';
import unitsRoutes from './routers/units.routes';
import userRoutes from './routers/user.routes';

class Api {
	private _router: Router;

	private _services: string[] = [];

	constructor() {
		this._router = Router();
		this.route();
	}

	public router = () => this._router;

	private registerRoute = (pathName: string, instance: Router) => {
		if (this.services().includes(pathName)) return this;

		this._services.push(pathName);
		this.router().use(`/${pathName}/`, instance);

		return this;
	};

	public services = () => this._services;

	public route = () => {
		this.registerRoute('users', userRoutes.route())
			.registerRoute('admin', adminRoutes.route())
			.registerRoute('auth', authRoutes.route())
			.registerRoute('course', coursesRoutes.route())
			.registerRoute('department', departmentsRoutes.route())
			.registerRoute('faculty', facultyRoutes.route())
			.registerRoute('lecturers', lecturersRoutes.route())
			.registerRoute('students', studentsRoutes)
			.registerRoute('units', unitsRoutes.route());
	};
}

const api = new Api();

export default api;
