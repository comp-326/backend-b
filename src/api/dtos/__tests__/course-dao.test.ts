import { CourseDto } from '@comp326-api/dtos/Course.dto';
import mongoose from '@comp326-db/mongodb';

test('Should not create course instance', () => {
	try {
		const course = new CourseDto('', '','somid');
		expect(course.name).toBe('');
	} catch (error) {
		expect(error).toBeDefined();
	}
});
test('Should create course instance', () => {
	try {
		// Generate mongo id 
		const mid = new mongoose.Types.ObjectId();
		const course = new CourseDto('Computer Science','SCi', mid.toString());
		expect(course.name).toBe('Computer Science');
	} catch (error) {
		expect(error).toBeDefined();
	}
});

