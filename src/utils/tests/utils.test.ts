import * as interfaces from '../../interfaces';
import * as utils from '../validations.util';
import { validate } from '../functions.util';

describe('validate', () => {
	it('should return an array of successValidations', async () => {
		const fields: interfaces.validations.IValidateField<any>[] = [
			{ alias: 'campo', name: 'field2', payload: 'testtest', options: { required: { value: true }, onlyLetters: { value: true }, minLength: { value: 5 }, maxLength: { value: 10 } } },
			{ alias: 'campo', name: 'field2', payload: 'test@test.com', options: { isEmail: { value: true } } },
		];

		const requiredMock = jest.spyOn(utils, 'required');
		const isEmailMock = jest.spyOn(utils, 'isEmail');

		const result = await validate(fields);

		expect(requiredMock).toHaveBeenCalledWith(fields[0]);
		expect(isEmailMock).toHaveBeenCalledWith(fields[1]);

		expect(Array.isArray(result)).toBe(true);
		expect(result.length).toBe(5);
		expect(result[0].field).toBe(fields[0].name);
		expect(result[0].type).toBe('required');
		expect(result[1].field).toBe(fields[1].name);
		expect(result[1].type).toBe('onlyLetters');
	});
});
