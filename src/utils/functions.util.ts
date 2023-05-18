import _ from 'lodash';
import * as interfaces from '../interfaces';
import * as utils from '../utils/validations.util';

export const handleOnChange = async (
	value: any,
	setError: Function,
	options: interfaces.validations.IOptions,
	alias?: string,
	field?: string,
) => {
	try {
		await validate([
			{
				name: 'campo',
				alias: alias || 'campo',
				payload: value,
				options,
			},
		]);
		setError('');
	} catch (error) {
		if (error instanceof interfaces.validations.ValidationError) {
			setError(error.message, field);
		}
	}
};

export const validate: interfaces.validations.IValidate = async (
	fields,
	firstField = null,
	limit = null,
) => {
	let count = 0;

	let sortedFields: interfaces.validations.IValidateField[] = [];
	const successValidations: interfaces.validations.ISuccessValidation[] = [];

	if (firstField != null) {
		sortedFields = _.sortBy(fields, (field) => {
			return field.name === firstField ? 0 : 1;
		});
	} else {
		sortedFields = fields;
	}

	if (limit != null) {
		sortedFields = [];

		if (firstField != null) {
			let limitFieldsCounts = 0;
			do {
				sortedFields.push(_.sortBy(fields, (field) => {
					return field.name === firstField ? 0 : 1;
				})[limitFieldsCounts]);

				limitFieldsCounts++;
			} while (limitFieldsCounts < limit);
		} else {
			sortedFields = [fields[0]];
		}
	}

	do {
		let optionCount = 0;
		const options: string[] = Object.getOwnPropertyNames(sortedFields[count].options);
		const data: any = null;

		do {

			switch (options[optionCount]) {
				case 'required': utils.required(sortedFields[count]); break;
				case 'isEmail': utils.isEmail(sortedFields[count]); break;
				case 'onlyNumbers': utils.onlyNumbers(sortedFields[count]); break;
				case 'onlyIntegers': utils.onlyIntegers(sortedFields[count]); break;
				case 'minQuantity': utils.minQuantity(sortedFields[count]); break;
				case 'minLength': utils.minLength(sortedFields[count]); break;
				case 'maxLength': utils.maxLength(sortedFields[count]); break;
				case 'onlyLetters': utils.onlyLetters(sortedFields[count]); break;
				case 'onlyLettersAndNumbers': utils.onlyLettersAndNumbers(sortedFields[count]); break;
				case 'onlyLettersAndDashes': utils.onlyLettersAndDashes(sortedFields[count]); break;
				case 'onlyNumberAndDashes': utils.onlyNumberAndDashes(sortedFields[count]); break;
				case 'onlyDashesOnMiddle': utils.onlyDashesOnMiddle(sortedFields[count]); break;
				case 'justADash': utils.justADash(sortedFields[count]); break;
				case 'confirmPassword': utils.confirmPassword(sortedFields[count]); break;
				case 'isAdult': utils.isAdult(sortedFields[count]); break;
				case 'onlyImages': utils.onlyImages(sortedFields[count]); break;
				case 'onlyVideos': utils.onlyVideos(sortedFields[count]); break;
				case 'onlyNumbersWithOrWithoutDecimals': utils.onlyNumbersWithOrWithoutDecimals(sortedFields[count]); break;
				case 'greaterThan': utils.greaterThan(sortedFields[count]); break;
				case 'isNotEqual': utils.isNotEqual(sortedFields[count]); break;
				case 'isAlphaNumWithoutSpaces': utils.isAlphaNumWithoutSpaces(sortedFields[count]); break;
				case 'noSpaces': utils.noSpaces(sortedFields[count]); break;
				default: null;
			}

			successValidations.push({
				field: sortedFields[count].name,
				type: options[optionCount],
				data,
			});

			optionCount++;

		} while (optionCount < options.length);

		count++;

	} while (count < sortedFields.length);

	return successValidations;
};
