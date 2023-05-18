import { ValidationError } from '../../interfaces/validations.interfaces';
import * as validations from '../validations.util';

describe('validations', () => {
	describe('required', () => {
		test('should throw ValidationError when field is empty string', () => {
			const field = {
				name: 'field1',
				alias: 'Field 1',
				payload: '',
				options: {
					required: {
						customErrorMessage: 'This field is required',
					},
				},
			};

			expect(() => validations.required(field)).toThrow(ValidationError);
		});

		test('should throw ValidationError when field is "seleccionar"', () => {
			const field = {
				name: 'field2',
				alias: 'Field 2',
				payload: 'seleccionar',
				options: {
					required: {
						customErrorMessage: 'This field is required',
					},
				},
			};

			expect(() => validations.required(field)).toThrow(ValidationError);
		});

		test('should throw ValidationError when field is whitespace', () => {
			const field = {
				name: 'field3',
				alias: 'Field 3',
				payload: '   ',
				options: {
					required: {
						customErrorMessage: 'This field is required',
					},
				},
			};

			expect(() => validations.required(field)).toThrow(ValidationError);
		});

		test('should throw ValidationError when field is negative number', () => {
			const field = {
				name: 'field4',
				alias: 'Field 4',
				payload: -1,
				options: {
					required: {
						customErrorMessage: 'This field is required',
					},
				},
			};

			expect(() => validations.required(field)).toThrow(ValidationError);
		});

		test('should not throw any error when field is not empty', () => {
			const field = {
				name: 'field5',
				alias: 'Field 5',
				payload: 'some value',
				options: {
					required: {
						customErrorMessage: 'This field is required',
					},
				},
			};

			expect(() => validations.required(field)).not.toThrow();
		});
	});

	describe('isEmail', () => {
		test('should throw ValidationError when field is not a valid email', () => {
			const field = {
				name: 'field1',
				alias: 'Field 1',
				payload: 'invalidemail.com',
				options: {
					isEmail: {
						customErrorMessage: 'This field is invalid',
					},
				},
			};

			expect(() => validations.isEmail(field)).toThrow(ValidationError);
		});

		test('should not throw any error when field is a valid email', () => {
			const field = {
				name: 'field2',
				alias: 'Field 2',
				payload: 'validemail@example.com',
				options: {
					isEmail: {
						customErrorMessage: 'This field is invalid',
					},
				},
			};

			expect(() => validations.isEmail(field)).not.toThrow();
		});
	});

});
