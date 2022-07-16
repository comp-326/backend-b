import { StudentDto } from '@comp326-api/dtos/Student.dto';

test('Should not create student instance', () => {
	try {
		const student = new StudentDto('', '', new Date(), '', '');
		expect(student.course).toBe('');
	} catch (error) {
		expect(error).toBeDefined();
	}
});
test('Should not create student instance', () => {
	try {
		const student = new StudentDto('mike', 'Juma', new Date(), '322', '8uuu');
		expect(student.course).toBe('');
	} catch (error) {
		expect(error).toBeDefined();
	}
});

