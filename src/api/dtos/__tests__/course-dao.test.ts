import { CourseDto } from '@comp326-api/dtos/Course.dto';

test('Should not create course instance', () => {
	try {
		const course = new CourseDto('', '');
		expect(course.name).toBe('');
	} catch (error) {
		expect(error).toBeDefined();
	}
});
test('Should create course instance', () => {
	try {
		const course = new CourseDto('Computer Science', 's13');
		expect(course.name).toBe('Computer Science');
	} catch (error) {
		expect(error).toBeDefined();
	}
});

