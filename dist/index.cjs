Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
let html_react_parser = require("html-react-parser");
html_react_parser = __toESM(html_react_parser, 1);
//#region utilities/sharedFunctions.ts
const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const noFunctionAvailable = () => {
	console.log("A function wasn't passed as a props when it needed to be.");
};
const isEmpty = (value) => {
	return value === void 0 || value === null || typeof value === "object" && Object.keys(value).length === 0 || typeof value === "string" && value.trim().length === 0;
};
const getDateTime = () => {
	const timezoneOffset = (/* @__PURE__ */ new Date()).getTimezoneOffset() * 60 * 1e3;
	return new Date((/* @__PURE__ */ new Date()).getTime() - timezoneOffset).toISOString().slice(0, 19).replace("T", " ");
};
const isNonEmptyArray = (arrayItem) => {
	let nonEmptyArray = false;
	if (Array.isArray(arrayItem) && arrayItem.length > 0) nonEmptyArray = true;
	return nonEmptyArray;
};
const isEmptyArray = (arrayItem) => {
	let emptyArray = true;
	if (Array.isArray(arrayItem) && arrayItem.length > 0) emptyArray = false;
	return emptyArray;
};
const getFirstItem = (arrayItem) => {
	let firstItem = {};
	if (isNonEmptyArray(arrayItem) && !isEmpty(arrayItem[0])) firstItem = arrayItem[0];
	return firstItem;
};
const getLastItem = (arrayItem) => {
	let lastItem = {};
	if (isNonEmptyArray(arrayItem) && !isEmpty(arrayItem[arrayItem.length - 1])) lastItem = arrayItem[arrayItem.length - 1];
	return lastItem;
};
const displayValue = (variableValue) => {
	let displayValue = "";
	if (!isEmpty(variableValue)) if (variableValue === true) displayValue = "True";
	else if (variableValue === false) displayValue = "False";
	else if (variableValue instanceof Date) displayValue = variableValue.toLocaleString();
	else displayValue = variableValue;
	else displayValue = "Value is undefined or null.";
	return displayValue;
};
const displaySpaceAfterComma = (text) => {
	let displayText = text;
	if (!isEmpty(text)) displayText = text.replaceAll(",", ", ");
	return displayText;
};
const removeForwardSlashes = (text) => {
	let displayText = text;
	if (!isEmpty(text)) displayText = formatToString(text).replace(/\//g, "");
	return displayText;
};
const tryParseJSON = (jsonString) => {
	try {
		const jsonData = JSON.parse(jsonString);
		if (jsonData && typeof jsonData === "object") return jsonData;
	} catch (_error) {}
	return false;
};
const displayObjectData = (ObjectData) => {
	let objectDataString = JSON.stringify(ObjectData);
	if (!isEmpty(objectDataString)) {
		objectDataString = objectDataString.replaceAll("\\", "");
		objectDataString = objectDataString.replaceAll("[{\"", "<p><strong>");
		objectDataString = objectDataString.replaceAll("\"},{\"", "</p><p><strong>");
		objectDataString = objectDataString.replaceAll("\"}]", "</p>");
		objectDataString = objectDataString.replaceAll("{\"", "<p><strong>");
		objectDataString = objectDataString.replaceAll("\"}", "</p>");
		objectDataString = objectDataString.replaceAll("\":\"", "</strong> = ");
		objectDataString = objectDataString.replaceAll("\":", "</strong> = ");
		objectDataString = objectDataString.replaceAll("\",\"", "</p><p><strong>");
		objectDataString = objectDataString.replaceAll(",\"", "</p><p><strong>");
		objectDataString = objectDataString.replaceAll("},", "");
		objectDataString = objectDataString.replaceAll("[]", "");
		objectDataString = objectDataString.replaceAll("[\"", "");
		objectDataString = objectDataString.replaceAll("\"]", "");
		objectDataString = objectDataString.replaceAll("[", "");
		objectDataString = objectDataString.replaceAll("]", "");
		objectDataString = objectDataString.replaceAll("{", "");
		objectDataString = objectDataString.replaceAll("}", "");
		objectDataString = objectDataString.replace(/<strong>(.*?)<\/strong>/g, (match) => {
			return formatTitle(match);
		});
	}
	return objectDataString;
};
const displayObjectDataTable = (ObjectData) => {
	let objectDataString = JSON.stringify(ObjectData);
	if (!isEmpty(objectDataString)) {
		objectDataString = objectDataString.replaceAll("\\", "");
		objectDataString = objectDataString.replaceAll("[{\"", "<tr><th>");
		objectDataString = objectDataString.replaceAll("\"},{\"", "</td><tr><th>");
		objectDataString = objectDataString.replaceAll("\"}]", "</td></tr>");
		objectDataString = objectDataString.replaceAll("{\"", "<tr><th>");
		objectDataString = objectDataString.replaceAll("\"}", "</td></tr>");
		objectDataString = objectDataString.replaceAll("\":\"", "</th><td>");
		objectDataString = objectDataString.replaceAll("\":", "</th><td>");
		objectDataString = objectDataString.replaceAll("\",\"", "</td><tr><th>");
		objectDataString = objectDataString.replaceAll(",\"", "</td><tr><th>");
		objectDataString = objectDataString.replaceAll("},", "");
		objectDataString = objectDataString.replaceAll("[]", "");
		objectDataString = objectDataString.replaceAll("[\"", "");
		objectDataString = objectDataString.replaceAll("\"]", "");
		objectDataString = objectDataString.replaceAll("[", "");
		objectDataString = objectDataString.replaceAll("]", "");
		objectDataString = objectDataString.replaceAll("{", "");
		objectDataString = objectDataString.replaceAll("}", "");
		objectDataString = objectDataString.replace(/<th>(.*?)<\/th>/g, (match) => {
			return formatTitle(match);
		});
		objectDataString = `<div class="table-container"><table><thead><tr class="sr-only"><th>Property Name</th><th>Value</th></tr></thead><tbody>${objectDataString}</tbody></table></div>`;
	}
	return objectDataString;
};
const displayObjectDataXML = (objectData) => {
	let objectDataString = JSON.stringify(objectData);
	if (!isEmpty(objectDataString)) {
		objectDataString = objectDataString.replaceAll("\\", "");
		objectDataString = objectDataString.replaceAll("[{\"", "<category>");
		objectDataString = objectDataString.replaceAll("\"},{\"", "</data><category>");
		objectDataString = objectDataString.replaceAll("\"}]", "<data>");
		objectDataString = objectDataString.replaceAll("{\"", "<category>");
		objectDataString = objectDataString.replaceAll("\"}", "<data>");
		objectDataString = objectDataString.replaceAll("\":\"", "</category><data>");
		objectDataString = objectDataString.replaceAll("\":", "</category><data>");
		objectDataString = objectDataString.replaceAll("\",\"", "</data><category>");
		objectDataString = objectDataString.replaceAll(",\"", "</data><category>");
		objectDataString = objectDataString.replaceAll("},", "");
		objectDataString = objectDataString.replaceAll("[]", "");
		objectDataString = objectDataString.replaceAll("[\"", "");
		objectDataString = objectDataString.replaceAll("\"]", "");
		objectDataString = objectDataString.replaceAll("[", "");
		objectDataString = objectDataString.replaceAll("]", "");
		objectDataString = objectDataString.replaceAll("{", "");
		objectDataString = objectDataString.replaceAll("}", "");
	}
	return objectDataString;
};
const getCurrentDay = () => {
	const timezoneOffset = (/* @__PURE__ */ new Date()).getTimezoneOffset() * 60 * 1e3;
	return new Date((/* @__PURE__ */ new Date()).getTime() - timezoneOffset).getDate();
};
const getCurrentMonth = () => {
	const timezoneOffset = (/* @__PURE__ */ new Date()).getTimezoneOffset() * 60 * 1e3;
	return new Date((/* @__PURE__ */ new Date()).getTime() - timezoneOffset).getMonth() + 1;
};
const getCurrentYear = () => {
	const timezoneOffset = (/* @__PURE__ */ new Date()).getTimezoneOffset() * 60 * 1e3;
	return new Date((/* @__PURE__ */ new Date()).getTime() - timezoneOffset).getFullYear();
};
const displayDate = (dateToDisplay, removeLeadingZeroes = false) => {
	let newDisplayDate = "";
	if (!isEmpty(dateToDisplay)) {
		const yyyy = formatToString(dateToDisplay).substring(0, 4);
		const mm = formatToString(dateToDisplay).substring(5, 7);
		const dd = formatToString(dateToDisplay).substring(8, 10);
		newDisplayDate = mm + "/" + dd + "/" + yyyy;
		if (!isEmpty(newDisplayDate) && removeLeadingZeroes) newDisplayDate = newDisplayDate.replace(/\b0/g, "");
	}
	return newDisplayDate;
};
const displayDateAndTime = (dateToDisplay, removeLeadingZeroes = false) => {
	let newDisplayDateAndTime = "";
	if (!isEmpty(dateToDisplay)) {
		const yyyy = formatToString(dateToDisplay).substring(0, 4);
		const mm = formatToString(dateToDisplay).substring(5, 7);
		const dd = formatToString(dateToDisplay).substring(8, 10);
		const time = formatToString(dateToDisplay).substring(11, 16);
		newDisplayDateAndTime = mm + "/" + dd + "/" + yyyy + " " + time;
		if (!isEmpty(newDisplayDateAndTime) && removeLeadingZeroes) newDisplayDateAndTime = newDisplayDateAndTime.replace(/\b0/g, "");
	}
	return newDisplayDateAndTime;
};
const displayYear = (dateToDisplay) => {
	let newDisplayDate = "";
	if (!isEmpty(dateToDisplay)) newDisplayDate = formatToString(dateToDisplay).substring(0, 4);
	return newDisplayDate;
};
const daysSince = (dateToCompare) => {
	let newDaysSince = 0;
	if (!isEmpty(dateToCompare)) {
		const today = /* @__PURE__ */ new Date();
		const timeInMilliseconds = new Date(dateToCompare).getTime() - today.getTime();
		newDaysSince = Math.abs(Math.ceil(timeInMilliseconds / (1e3 * 60 * 60 * 24)));
	}
	return newDaysSince;
};
const hasNonEmptyProperty = (objectItem, propertyName) => {
	let nonEmptyProperty = false;
	if (typeof objectItem === "object") {
		if (Object.hasOwn(objectItem, propertyName) && !isEmpty(objectItem[propertyName])) nonEmptyProperty = true;
	}
	return nonEmptyProperty;
};
const hasEqualsProperty = (objectItem, propertyName, value) => {
	let equalsProperty = false;
	if (typeof objectItem === "object") {
		if (Object.hasOwn(objectItem, propertyName) && !isEmpty(objectItem[propertyName]) && objectItem[propertyName] === value) equalsProperty = true;
	}
	return equalsProperty;
};
const hasTrueProperty = (objectItem, propertyName) => {
	let trueProperty = false;
	if (typeof objectItem === "object") {
		if (Object.hasOwn(objectItem, propertyName) && objectItem[propertyName] === true) trueProperty = true;
	}
	return trueProperty;
};
const hasFalseProperty = (objectItem, propertyName) => {
	let falseProperty = false;
	if (typeof objectItem === "object") {
		if (Object.hasOwn(objectItem, propertyName) && objectItem[propertyName] === false) falseProperty = true;
	}
	return falseProperty;
};
const convertSpecialCharacters = (value) => {
	let newValue = value;
	if (!isEmpty(value)) {
		newValue = newValue.replace(/&/g, "&amp;");
		newValue = newValue.replace(/</g, "&lt;");
		newValue = newValue.replace(/>/g, "&gt;");
		newValue = newValue.replace(/"/g, "&quot;");
		newValue = newValue.replace(/'/g, "&#039;");
	}
	return newValue;
};
const truncateText = (text, limit) => {
	if (!isEmpty(text) && text.length > limit) {
		for (let i = limit; i > 0; i--) if (text.charAt(i) === " " && (text.charAt(i - 1) !== "," || text.charAt(i - 1) !== "." || text.charAt(i - 1) !== ";")) return text.substring(0, i) + "...";
		return text.substring(0, limit) + "...";
	} else return text;
};
const validateMilitaryTime = (timeEntered) => {
	let validTimeFormat = true;
	let timeEnteredString = "";
	if (typeof formatToString(timeEntered) === "string") {
		timeEnteredString = formatToString(timeEntered);
		timeEnteredString = timeEnteredString.trim();
		if (timeEnteredString.length !== 4) validTimeFormat = false;
		else {
			if (isNaN(parseInt(timeEnteredString.charAt(0))) || isNaN(parseInt(timeEnteredString.charAt(1))) || isNaN(parseInt(timeEnteredString.charAt(2))) || isNaN(parseInt(timeEnteredString.charAt(3)))) validTimeFormat = false;
			if (timeEnteredString.charAt(0) !== "0" && timeEnteredString.charAt(0) !== "1" && timeEnteredString.charAt(0) !== "2") validTimeFormat = false;
			if (timeEnteredString.charAt(0) === "2" && timeEnteredString.charAt(1) !== "0" && timeEnteredString.charAt(1) !== "1" && timeEnteredString.charAt(1) !== "2" && timeEnteredString.charAt(1) !== "3" && timeEnteredString.charAt(1) !== "4") validTimeFormat = false;
			if (timeEnteredString.charAt(0) === "2" && timeEnteredString.charAt(1) !== "4" && timeEnteredString.charAt(2) !== "0" && timeEnteredString.charAt(3) !== "0") validTimeFormat = false;
			if (timeEnteredString.charAt(2) !== "0" && timeEnteredString.charAt(2) !== "1" && timeEnteredString.charAt(2) !== "2" && timeEnteredString.charAt(2) !== "3" && timeEnteredString.charAt(2) !== "4" && timeEnteredString.charAt(2) !== "5") validTimeFormat = false;
		}
	} else validTimeFormat = false;
	return validTimeFormat;
};
const convertTemperature = (temperatureScale, temperature) => {
	const temperatureFloat = parseFloat(temperature);
	let temperatureConverted = "";
	if (!isEmpty(temperatureFloat) && !isNaN(temperatureFloat)) {
		if (formatLowerCase(temperatureScale) === "celsius") temperatureConverted = ((temperatureFloat - 32) * 5 / 9).toFixed(2);
		else if (formatLowerCase(temperatureScale) === "fahrenheit") temperatureConverted = (temperatureFloat * 9 / 5 + 32).toFixed(2);
	} else temperatureConverted = "";
	return temperatureConverted;
};
const convertYesNoTrueFalse = (value) => {
	if (isNaN(value) && value === "Yes") return true;
	else if (isNaN(value) && value === "No") return false;
	else if (value === true) return "Yes";
	else if (value === false) return "No";
	else return value;
};
const convertNormalAbnormalTrueFalse = (value) => {
	if (isNaN(value) && value === "Normal") return true;
	else if (isNaN(value) && value === "Abnormal") return false;
	else if (value === true) return "Normal";
	else if (value === false) return "Abnormal";
	else return value;
};
const convertEnableDisableTrueFalse = (value) => {
	if (isNaN(value) && value === "Enable") return true;
	else if (isNaN(value) && value === "Disable") return false;
	else if (value === true) return "Enable";
	else if (value === false) return "Disable";
	else return value;
};
const convertNullEmptyString = (value) => {
	if (value === null) return "";
	else if (value === void 0) return "";
	else if (value === "NaN") return null;
	else if (isNaN(value) && typeof value === "number") return null;
	else if (isNaN(value) && value === "") return null;
	else if (value === "") return null;
	else return value;
};
const isWholeNumber = (value) => {
	if (isEmpty(value)) return false;
	const numberValue = Number(formatTrim(value));
	return Number.isInteger(numberValue);
};
const hasDecimalPlaces = (value, decimalPlaces) => {
	const trimmedValue = formatTrim(value);
	if (isEmpty(trimmedValue) || Number.isNaN(Number(trimmedValue))) return false;
	let currentDecimalPlaces = 1;
	const parsedDecimalPlaces = Number(decimalPlaces);
	if (Number.isInteger(parsedDecimalPlaces)) currentDecimalPlaces = parsedDecimalPlaces;
	const decimalIndex = trimmedValue.indexOf(".");
	return (decimalIndex >= 0 ? trimmedValue.substring(decimalIndex + 1) : "").length <= currentDecimalPlaces;
};
const generateRandomNumber = (minimumValue, maximumValue) => {
	return Math.floor(Math.random() * (maximumValue - minimumValue + 1)) + minimumValue;
};
const generateRandomNumberDigits = (digits) => {
	let randomNumber = formatToString(Math.floor(Math.random() * 10 ** digits));
	while (randomNumber.length < digits) randomNumber = `0${randomNumber}`;
	return randomNumber;
};
const formatPhoneNumber = (phoneNumber) => {
	let onlyDigits = "";
	if (typeof phoneNumber === "string") onlyDigits = phoneNumber.replace(/\D/g, "");
	const validPhoneNumber = onlyDigits.match(/^(\d{3})(\d{3})(\d{4})$/);
	if (isNonEmptyArray(validPhoneNumber)) return `${validPhoneNumber[1]}-${validPhoneNumber[2]}-${validPhoneNumber[3]}`;
	else return phoneNumber;
};
const formatTitle = (title) => {
	let formattedTitle = "";
	if (!isEmpty(title) && title !== "iSBAR" && title !== "iSBARs" && title !== "iSBAREnable") {
		formattedTitle = title.replace(/(?<!^)([A-Z][a-z]|(?<=[a-z])[A-Z])/g, "$1").replace(/\b\w/g, (c) => c.toUpperCase());
		formattedTitle = formattedTitle.replaceAll("'S", "'s");
	} else if (!isEmpty(title) && title === "iSBAR") formattedTitle = "iSBAR";
	else if (!isEmpty(title) && title === "iSBARs") formattedTitle = "iSBARs";
	else if (!isEmpty(title) && title === "iSBAREnable") formattedTitle = "iSBAR Enable";
	return formattedTitle;
};
const randomizeItems = (items, randomize) => {
	let itemsRandomized = [];
	if (randomize === true && isNonEmptyArray(items)) itemsRandomized = items.map((a) => {
		return {
			sort: Math.random(),
			value: a
		};
	}).sort((a, b) => a.sort - b.sort).map((a) => a.value);
	else itemsRandomized = items;
	return itemsRandomized;
};
const getObjectArrayUniqueProperty = (objectArray, uniqueProperty) => {
	let uniqueArray = [...objectArray];
	if (isNonEmptyArray(uniqueArray)) {
		uniqueArray = [...new Set(objectArray.map((item) => item[uniqueProperty]))];
		if (typeof uniqueArray[0] === "number") uniqueArray.sort(function(a, b) {
			return a - b;
		});
		else uniqueArray.sort();
	}
	return uniqueArray;
};
const removeArticlesFromBeginning = (value) => {
	let newValue = value;
	if (!isEmpty(value)) newValue = formatLowerCase(newValue).replace(/^(a\.)/, "").replace(/^(an\.)/, "").replace(/^(the\.)/, "");
	return newValue;
};
const compareItemsForSorting = (itemOne, itemTwo) => {
	if (typeof itemOne === "number") return itemOne - itemTwo;
	else return removeArticlesFromBeginning(itemOne) > removeArticlesFromBeginning(itemTwo);
};
const sortObjectArrayByProperty = (objectArray, sortProperty, direction) => {
	const sortedArray = [...objectArray];
	if (isNonEmptyArray(sortedArray)) {
		if (!isEmpty(sortProperty)) sortedArray.sort((a, b) => {
			const aProperty = typeof a[sortProperty] === "number" ? a[sortProperty] : removeArticlesFromBeginning(a[sortProperty]);
			const bProperty = typeof b[sortProperty] === "number" ? b[sortProperty] : removeArticlesFromBeginning(b[sortProperty]);
			if (isEmpty(aProperty)) return 1;
			if (isEmpty(bProperty)) return -1;
			if (aProperty < bProperty) return -1;
			if (aProperty > bProperty) return 1;
			return 0;
		});
	}
	if (formatLowerCase(direction) === "desc") sortedArray.reverse();
	return sortedArray;
};
const sortObjectArrayByTwoProperties = (objectArray, sortPropertyOne, sortPropertyTwo, directionOne, directionTwo) => {
	let sortedArray = [...objectArray];
	if (isNonEmptyArray(sortedArray)) {
		if (!isEmpty(sortPropertyTwo)) sortedArray = sortObjectArrayByProperty(sortedArray, sortPropertyTwo, directionTwo);
		if (!isEmpty(sortPropertyOne)) sortedArray = sortObjectArrayByProperty(sortedArray, sortPropertyOne, directionOne);
	}
	return sortedArray;
};
const compareObjectProperties = (originalObject, comparisonObject) => {
	const originalObjectProperties = Object.keys(originalObject);
	const comparisonObjectProperties = Object.keys(comparisonObject);
	const newProperties = [];
	const removedProperties = [];
	const sameProperties = [];
	originalObjectProperties.forEach((property) => {
		if (comparisonObjectProperties.indexOf(property) < 0) newProperties.push(property);
		else sameProperties.push(property);
	});
	comparisonObjectProperties.map((property) => {
		if (originalObjectProperties.indexOf(property) < 0) removedProperties.push(property);
	});
	return {
		newProperties: [...newProperties],
		removedProperties: [...removedProperties],
		sameProperties: [...sameProperties]
	};
};
const groupObjectArrayByProperties = (objectArray, ...keys) => {
	const getGroupFromItem = (item, keys) => {
		return keys.length > 1 ? getGroupFromItem(item[keys[0]], keys.slice(1)) : item[keys[0]];
	};
	return objectArray.reduce((results, item) => {
		const group = getGroupFromItem(item, keys);
		results[group] = results[group] || [];
		results[group].push(item);
		return results;
	}, {});
};
const formatLowerCase = (value) => {
	let lowerCaseValue = "";
	if (!isEmpty(value)) lowerCaseValue = formatToString(value).toLowerCase();
	return lowerCaseValue;
};
const formatUpperCase = (value) => {
	let upperCaseValue = "";
	if (!isEmpty(value)) upperCaseValue = formatToString(value).toUpperCase();
	return upperCaseValue;
};
const formatTrim = (value) => {
	let trimValue = "";
	if (!isEmpty(value)) trimValue = formatToString(value).trim();
	return trimValue;
};
const formatToString = (value) => {
	let toStringValue = "";
	if (!isEmpty(value)) toStringValue = value.toString();
	return toStringValue;
};
const getParseInt = (value) => {
	return !isEmpty(value) && !Number.isNaN(value) ? parseInt(value) : null;
};
const formatInt = (value) => {
	if (isEmpty(value)) return "";
	const normalizedValue = formatTrim(formatToString(value)).replace(/,/g, "");
	const parsedValue = Number.parseInt(normalizedValue, 10);
	if (Number.isNaN(parsedValue)) return "";
	return parsedValue.toLocaleString();
};
const formatFloat = (value) => {
	let formatedFloat = "";
	if (!isEmpty(value)) formatedFloat = parseFloat(formatTrim(value.replaceAll(",", ""))).toLocaleString();
	return formatedFloat;
};
const formatDate = (dateToFormat) => {
	let formattedDate = "";
	if (!isEmpty(dateToFormat)) formattedDate = dateToFormat.substring(0, 10);
	else formattedDate = "";
	return formattedDate;
};
const formatSearchInput = (value) => {
	let formatedSearchInput = "";
	if (!isEmpty(value)) formatedSearchInput = formatTrim(value).toLowerCase();
	return formatedSearchInput;
};
const removeHTML = (text) => {
	let displayText = "";
	if (!isEmpty(text)) displayText = text.replace(/(<([^>]+)>)/gi, "");
	return displayText;
};
const removeNonAlphanumericCharacters = (text) => {
	let formatedText = "";
	if (!isEmpty(text)) formatedText = text.replace(/[^a-zA-Z0-9. ]/g, "");
	return formatedText;
};
const replaceSmartCharacters = (jsonData) => {
	let newJSON = jsonData;
	if (!isEmpty(newJSON)) {
		newJSON = newJSON.replaceAll("’", "'");
		newJSON = newJSON.replaceAll("–", "-");
		newJSON = newJSON.replaceAll("\xA0", " ");
		newJSON = newJSON.replaceAll("“", "\"");
		newJSON = newJSON.replaceAll("”", "\"");
	}
	return newJSON;
};
const getQueryStringData = () => {
	const queryStringData = {};
	if (typeof window === "undefined") return queryStringData;
	const queryStrings = new URLSearchParams(window.location.search);
	queryStringData.parametersURL = queryStrings.toString();
	queryStrings.forEach((value, key) => {
		queryStringData[key] = value;
	});
	return queryStringData;
};
const addLog = (baseURL, fetchAuthorization, databaseAvailable, allowLogging, logObject) => {
	let logResult = "Add log not attempted due to parameter values.";
	if (allowLogging === true && databaseAvailable !== false) {
		const operation = "Add Log";
		const url = `${baseURL}logs/`;
		let response;
		let data = "";
		fetch(url, {
			method: "POST",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: fetchAuthorization
			}),
			body: JSON.stringify({ recordObject: logObject })
		}).then((results) => {
			response = results;
			if (response.status === 200) return response.json();
			else {
				addErrorLog(baseURL, fetchAuthorization, databaseAvailable, allowLogging, {
					operation: `${operation} SQL Server`,
					transactionData: {
						url,
						response: {
							ok: response.ok,
							redirected: response.redirected,
							status: response.status,
							statusText: response.statusText,
							type: response.type,
							url: response.url
						},
						data,
						logObject
					},
					errorData: { message: `${response.status} ${response.statusText} ${response.url}` },
					dateEntered: getDateTime()
				});
				logResult = `${operation}: ${response.status} ${response.statusText} ${response.url}`;
			}
		}).then((results) => {
			data = results;
			logResult = results;
		}).catch((error) => {
			addErrorLog(baseURL, fetchAuthorization, databaseAvailable, allowLogging, {
				operation,
				transactionData: {
					url,
					response: {
						ok: response.ok,
						redirected: response.redirected,
						status: response.status,
						statusText: response.statusText,
						type: response.type,
						url: response.url
					},
					data,
					logObject
				},
				errorData: {
					name: error.name,
					message: error.message,
					stack: error.stack
				},
				dateEntered: getDateTime()
			});
			logResult = `${operation}: ${convertSpecialCharacters(error.name)}: ${convertSpecialCharacters(error.message)}`;
		});
	}
	return logResult;
};
const addErrorLog = (baseURL, fetchAuthorization, databaseAvailable, allowLogging, errorObject) => {
	let logErrorResult = "Add error log not attempted due to parameter values.";
	if (allowLogging === true && databaseAvailable !== false) {
		const operation = "Add Error Log";
		const url = `${baseURL}errorLogs/`;
		let response;
		fetch(url, {
			method: "POST",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: fetchAuthorization
			}),
			body: JSON.stringify({ recordObject: errorObject })
		}).then((results) => {
			response = results;
			if (response.status === 200) return response.json();
			else logErrorResult = `${operation}: ${response.status} ${response.statusText} ${response.url}`;
		}).then((results) => {
			logErrorResult = results;
		}).catch((error) => {
			logErrorResult = `${operation}: ${convertSpecialCharacters(error.name)}: ${convertSpecialCharacters(error.message)}`;
		});
	}
	return logErrorResult;
};
const addComputerLog = (computerLogOne, computerLogTwo) => {
	const computerLog = { ...computerLogOne };
	if (typeof computerLog === "object") {
		if (!isEmpty(computerLogTwo.country_code)) computerLog.countryCode = computerLogTwo.country_code;
		if (!isEmpty(computerLogTwo.country_name)) computerLog.countryName = computerLogTwo.country_name;
		if (!isEmpty(computerLogTwo.city)) computerLog.city = computerLogTwo.city;
		if (!isEmpty(computerLogTwo.postal)) computerLog.postal = computerLogTwo.postal;
		if (!isEmpty(computerLogTwo.latitude)) computerLog.latitude = computerLogTwo.latitude;
		if (!isEmpty(computerLogTwo.longitude)) computerLog.longitude = computerLogTwo.longitude;
		if (!isEmpty(computerLogTwo.IPv4)) computerLog.ipAddress = computerLogTwo.IPv4;
		if (!isEmpty(computerLogTwo.state)) computerLog.state = computerLogTwo.state;
		if (!isEmpty(computerLogTwo.ipAddress)) computerLog.ipAddress = computerLogTwo.ipAddress;
		if (!isEmpty(computerLogTwo.continentCode)) computerLog.continentCode = computerLogTwo.continentCode;
		if (!isEmpty(computerLogTwo.continentName)) computerLog.continentName = computerLogTwo.continentName;
		if (!isEmpty(computerLogTwo.countryCode)) computerLog.countryCode = computerLogTwo.countryCode;
		if (!isEmpty(computerLogTwo.countryName)) computerLog.countryName = computerLogTwo.countryName;
		if (!isEmpty(computerLogTwo.stateProvCode)) computerLog.stateProvCode = computerLogTwo.stateProvCode;
		if (!isEmpty(computerLogTwo.stateProv)) computerLog.state = computerLogTwo.state;
		if (!isEmpty(computerLogTwo.city)) computerLog.city = computerLogTwo.city;
	}
	return computerLog;
};
const parse = (value, options) => {
	let newValue = value;
	if (!isEmpty(value)) if (!isEmpty(options)) newValue = (0, html_react_parser.default)(value, options);
	else newValue = (0, html_react_parser.default)(value);
	return newValue;
};
const displayTime = (dateToDisplay, removeLeadingZeroes) => {
	let newDisplayTime = "";
	if (!isEmpty(dateToDisplay)) {
		newDisplayTime = formatToString(dateToDisplay).substring(11, 16);
		if (!isEmpty(newDisplayTime) && removeLeadingZeroes === true) newDisplayTime = newDisplayTime.replace(/\b0/g, "");
	}
	return newDisplayTime;
};
const convertMilitaryTimeToStandardTime = (timeEntered) => {
	if (isEmpty(timeEntered)) return "";
	const parts = formatTrim(formatToString(timeEntered)).split(/[\s:]+/);
	if (parts.length < 2) return "";
	const hours = Number(parts[0]);
	const minutes = Number(parts[1]);
	if (!Number.isInteger(hours) || !Number.isInteger(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return "";
	const modifier = hours >= 12 ? " PM" : " AM";
	return `${hours === 0 ? 12 : hours > 12 ? hours - 12 : hours}:${minutes.toString().padStart(2, "0")}${modifier}`;
};
const convertStandardTimeToMilitaryTime = (timeEntered) => {
	if (isEmpty(timeEntered)) return "";
	const parts = formatTrim(formatToString(timeEntered)).toUpperCase().split(/[\s:]+/);
	if (parts.length < 3) return "";
	let hours = Number(parts[0]);
	const minutes = Number(parts[1]);
	const modifier = parts[2];
	if (!Number.isInteger(hours) || !Number.isInteger(minutes) || hours < 1 || hours > 12 || minutes < 0 || minutes > 59 || modifier !== "AM" && modifier !== "PM") return "";
	if (modifier === "AM" && hours === 12) hours = 0;
	else if (modifier === "PM" && hours !== 12) hours += 12;
	return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
};
const getNumberOfDaysBetweenDates = (startDate, endDate) => {
	const newStartDate = new Date(startDate);
	const newEndDate = new Date(endDate);
	let numberOfDays = 1;
	numberOfDays = (newEndDate.getTime() - newStartDate.getTime()) / (1e3 * 60 * 60 * 24) + 1;
	return numberOfDays;
};
const convertTimeToMinutes = (timeEntered) => {
	const newTime = timeEntered.split(":");
	return +newTime[0] * 60 + +newTime[1];
};
const generateHoursInterval = (startHourInMinutes, endHourInMinutes, interval) => {
	const timesArray = [];
	if (!isEmpty(startHourInMinutes) && isWholeNumber(startHourInMinutes)) for (let i = 0; startHourInMinutes < 1440; i++) if (startHourInMinutes > endHourInMinutes) break;
	else {
		const hh = Math.floor(startHourInMinutes / 60);
		const mm = startHourInMinutes % 60;
		timesArray[i] = {
			timeID: i,
			time: convertMilitaryTimeToStandardTime(("0" + hh % 24).slice(-2) + ":" + ("0" + mm).slice(-2))
		};
		startHourInMinutes = startHourInMinutes + interval;
	}
	return timesArray;
};
const displayCommaBetweenTwoItems = (firstItem, secondItem) => {
	let textValue = "";
	if (!isEmpty(firstItem)) textValue = firstItem;
	if (!isEmpty(firstItem) && !isEmpty(secondItem)) textValue += ", ";
	if (!isEmpty(secondItem)) textValue += secondItem;
	return textValue;
};
const constructCSVFile = (dataList, dataColumnTitles, propertyNameList) => {
	let fileData = "";
	if (!isEmpty(dataColumnTitles)) fileData += dataColumnTitles;
	if (isNonEmptyArray(dataList) && isNonEmptyArray(propertyNameList)) for (let i = 0; i < dataList.length; i++) {
		for (let j = 0; j < propertyNameList.length; j++) {
			let cellData = "";
			const propertyNameData = dataList[i][propertyNameList[j].propertyName];
			if (!isEmpty(propertyNameData)) {
				if (propertyNameList[j].dataType === "string") cellData = `"${propertyNameData}"`;
				else if (propertyNameList[j].dataType === "number") cellData = `${propertyNameData}`;
				else if (propertyNameList[j].dataType === "boolean") cellData = `${propertyNameData === true || propertyNameData === 1 ? "Yes" : "-"}`;
				else if (propertyNameList[j].dataType === "date") cellData = `${displayDate(propertyNameData)}`;
				else if (propertyNameList[j].dataType === "dateTime") cellData = `${displayDateAndTime(propertyNameData)}`;
				else if (propertyNameList[j].dataType === "hyperlink") cellData = `=HYPERLINK(${propertyNameData})`;
			}
			fileData += `${cellData},`;
		}
		fileData += `\r\n`;
	}
	return fileData;
};
const exportCSVFile = (fileData, fileTitle) => {
	const csvData = new Blob([fileData], { type: "text/csv" });
	const csvURL = window.URL.createObjectURL(csvData);
	const link = document.createElement("a");
	link.href = csvURL;
	link.download = `${fileTitle} ${displayDate(getDateTime()).replaceAll("/", "_")}.csv`;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};
const convertMinutesToSeconds = (time) => {
	if (isEmpty(time)) return 0;
	const splitTime = formatTrim(formatToString(time)).split(/[ :]/);
	if (splitTime.length < 2) return 0;
	const minutes = Number.parseInt(splitTime[0], 10);
	const seconds = Number.parseInt(splitTime[1], 10);
	if (!Number.isInteger(minutes) || !Number.isInteger(seconds) || minutes < 0 || seconds < 0) return 0;
	return minutes * 60 + seconds;
};
const createDateFromString = (dateString) => {
	let [year, month, day] = dateString.split("-").map(Number);
	if (dateString.includes("/")) [month, day, year] = dateString.split("/").map(Number);
	return new Date(year, month - 1, day);
};
const isFutureDate = (dateToCheck, referenceDate) => {
	return new Date(dateToCheck.getFullYear(), dateToCheck.getMonth(), dateToCheck.getDate()) > new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate());
};
const formatToUSD = (value) => {
	if (!Number.isNaN(value)) return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0
	}).format(value);
	else return "";
};
const getYears = (months) => {
	const parsedMonths = Number.parseFloat(months);
	if (Number.isNaN(parsedMonths)) return "";
	return (parsedMonths / 12).toFixed(1);
};
const parseDescription = (description) => {
	return parse(description.replace(/\\r/g, "<br />"), {});
};
const getBrowserData = () => ({
	appCodeName: navigator.appCodeName,
	appName: navigator.appName,
	appVersion: navigator.appVersion,
	cookieEnabled: navigator.cookieEnabled,
	language: navigator.language,
	onLine: navigator.onLine,
	platform: navigator.platform,
	product: navigator.product,
	userAgent: navigator.userAgent
});
const returnActiveClass = (componentName, componentToLoad, classList) => {
	let newClassList = !isEmpty(classList) ? classList : "";
	newClassList += componentName === componentToLoad ? " active" : "";
	return newClassList;
};
const filterDropdownOptions = (allItems, itemsToFilter, propertyName, currentItem) => {
	let filteredItems = [];
	if (!isEmptyArray(allItems)) {
		filteredItems = allItems.filter((item) => !itemsToFilter.find((itemToFilter) => item[propertyName] === itemToFilter[propertyName]));
		if (!isEmpty(currentItem)) filteredItems.push(currentItem);
	}
	return filteredItems;
};
const filterBySelectedCheckbox = (checkboxValues, selectedID, currentResults) => {
	let filteredResults = [];
	if (!isEmptyArray(checkboxValues) && !isEmptyArray(currentResults)) checkboxValues.forEach((checkboxValue) => {
		const newFilteredResults = currentResults.filter((result) => formatToString(result[selectedID]) === formatToString(checkboxValue));
		filteredResults = filteredResults.concat(newFilteredResults);
	});
	return filteredResults;
};
const getFilteredNames = (selectedCheckbox, selectedID, optionData, nameToReturn, filteredNames) => {
	let newFilteredNames = filteredNames;
	if (!isEmptyArray(selectedCheckbox) && !isEmptyArray(optionData)) {
		for (let i = 0; i < selectedCheckbox.length; i++) for (let j = 0; j < optionData.length; j++) if (formatToString(optionData[j][selectedID]) === formatToString(selectedCheckbox[i])) if (!isEmpty(newFilteredNames)) newFilteredNames += `, ${optionData[j][nameToReturn]}`;
		else newFilteredNames = `${optionData[j][nameToReturn]}`;
	}
	return newFilteredNames;
};
const isValidURL = (value) => {
	try {
		new URL(value);
		return true;
	} catch {
		return false;
	}
};
//#endregion
//#region utilities/developerFunctions.ts
const isLocalDevelopment = () => {
	let developmentEnvironment = "";
	try {
		developmentEnvironment = {}.env?.MODE;
	} catch (_error) {}
	if (developmentEnvironment === "development") return true;
	else return false;
};
const inElectron = () => window?.electronEnvironment?.inElectron ?? false;
const inLearningObjectEcosystem = () => {
	if (isLocalDevelopment() || inElectron() || window.location.href.includes("orbiseducation.com")) return true;
	else return false;
};
const showLocalDevelopment = (environmentMode) => {
	if (isLocalDevelopment() && environmentMode !== "production") return true;
	else return false;
};
const showDevelopment = (environmentMode, demonstrationMode) => {
	const forceDevelopmentMode = {}.env?.VITE_FORCE_DEVELOPMENT_MODE;
	if ((isLocalDevelopment() || forceDevelopmentMode === "True" || environmentMode === "development") && demonstrationMode !== true && environmentMode !== "production" && environmentMode !== "staging") return true;
	else return false;
};
const showStaging = (environmentMode, demonstrationMode) => {
	if (({}.env?.VITE_FORCE_STAGING_MODE === "True" || environmentMode === "staging") && demonstrationMode !== true && environmentMode !== "production" && environmentMode !== "development") return true;
	else return false;
};
const showDemonstration = (demonstrationMode) => {
	const forceDemonstrationMode = {}.env?.VITE_FORCE_DEMONSTRATION_MODE;
	if (demonstrationMode === true || forceDemonstrationMode === "True") return true;
	else return false;
};
const showPlayground = (environmentMode, demonstrationMode) => {
	if (showDevelopment(environmentMode, demonstrationMode) || (window.location.href.includes("intranet.orbiseducation.com/test_local/") || window.location.href.includes("intranet.orbiseducation.com/for-review/")) && environmentMode !== "production") return true;
	else return false;
};
const showErrorMessage = (environmentMode, alwaysShow) => {
	if (isLocalDevelopment() && environmentMode !== "production" || alwaysShow === true) return true;
	else return false;
};
const allowLogging = () => {
	const allowDevelopmentComputerLog = {}.env?.VITE_ALLOW_DEVELOPMENT_COMPUTERLOG;
	if (inLearningObjectEcosystem() && (!isLocalDevelopment() || allowDevelopmentComputerLog === "True")) return true;
	else return false;
};
const showAuthentication = (environmentMode, applicationName, azureAuthentication) => {
	if ((azureAuthentication !== true && applicationName === "Learning Object Template") === true && window.location.href.includes("orbiseducation.com/test_local/") && environmentMode === "production") return false;
	else if (!window.location.href.includes("lor.orbiseducation.com") && !window.location.href.includes("lor-dev.") && !window.location.href.includes("lor-staging.") && (window.location.href.includes("orbiseducation.com") || window.location.href.includes("dewfapvs2001e.gce.com"))) return true;
	else if (window.location.href.includes("localhost:")) return true;
	else return false;
};
const getFetchAuthorization = (partnerID, databaseNameProduction, databaseNameDevelopment, sessionToken, environmentMode, demonstrationMode) => {
	let databaseName = databaseNameProduction;
	if (!isEmpty(databaseNameDevelopment) && (showLocalDevelopment(environmentMode) || showPlayground(environmentMode, demonstrationMode) || window.location.href.includes("lor-dev.orbiseducation.com") || window.location.href.includes("lor-staging.orbiseducation.com"))) databaseName = databaseNameDevelopment;
	return window.btoa(JSON.stringify({
		partnerID,
		databaseName,
		sessionToken
	}));
};
const resolveBaseURL = (endPointBase, environmentMode, demonstrationMode, lorServer) => {
	const forceLocalAPI = {}.env?.VITE_FORCE_LOCAL_API;
	const forceStagingAPI = {}.env?.VITE_FORCE_STAGING_API;
	const forceProductionAPI = {}.env?.VITE_FORCE_PRODUCTION_API;
	const serverPort = {}.env?.VITE_SERVER_PORT;
	const isLocalhost = isLocalDevelopment() && forceLocalAPI === "True" && forceStagingAPI !== "True" && forceProductionAPI !== "True";
	const isDevelopment = (isLocalDevelopment() || showDevelopment(environmentMode, demonstrationMode) || showPlayground(environmentMode, demonstrationMode)) && forceLocalAPI !== "True" && forceStagingAPI !== "True" && forceProductionAPI !== "True";
	const isStaging = (forceStagingAPI === "True" || showStaging(environmentMode, demonstrationMode)) && forceLocalAPI !== "True" && forceProductionAPI !== "True";
	let baseURL = lorServer === true ? "lor" : "api";
	if (window.location.hostname.startsWith("lor-dev") || window.location.hostname.startsWith("lor-staging")) baseURL = window.location.hostname.replace(".orbiseducation.com", "");
	if (isLocalhost) return `http://localhost:${serverPort}/${endPointBase}/`;
	if (isDevelopment) return `https://${baseURL}-dev.orbiseducation.com/${endPointBase}/`;
	if (isStaging) return `https://${baseURL}-staging.orbiseducation.com/${endPointBase}/`;
	return `https://${baseURL}.orbiseducation.com/${endPointBase}/`;
};
const resolveRedirectURL = (environmentMode, demonstrationMode) => {
	const popUpRedirectURI = {}.env?.VITE_POPUP_REDIRECT_URI;
	const playgroundPopUpRedirectURI = {}.env?.VITE_PLAYGROUND_POPUP_REDIRECT_URI;
	if (isLocalDevelopment()) return "/";
	if (showPlayground(environmentMode, demonstrationMode)) return "/test_local" + playgroundPopUpRedirectURI;
	return popUpRedirectURI;
};
//#endregion
exports.addComputerLog = addComputerLog;
exports.addErrorLog = addErrorLog;
exports.addLog = addLog;
exports.allowLogging = allowLogging;
exports.compareItemsForSorting = compareItemsForSorting;
exports.compareObjectProperties = compareObjectProperties;
exports.constructCSVFile = constructCSVFile;
exports.convertEnableDisableTrueFalse = convertEnableDisableTrueFalse;
exports.convertMilitaryTimeToStandardTime = convertMilitaryTimeToStandardTime;
exports.convertMinutesToSeconds = convertMinutesToSeconds;
exports.convertNormalAbnormalTrueFalse = convertNormalAbnormalTrueFalse;
exports.convertNullEmptyString = convertNullEmptyString;
exports.convertSpecialCharacters = convertSpecialCharacters;
exports.convertStandardTimeToMilitaryTime = convertStandardTimeToMilitaryTime;
exports.convertTemperature = convertTemperature;
exports.convertTimeToMinutes = convertTimeToMinutes;
exports.convertYesNoTrueFalse = convertYesNoTrueFalse;
exports.createDateFromString = createDateFromString;
exports.daysSince = daysSince;
exports.displayCommaBetweenTwoItems = displayCommaBetweenTwoItems;
exports.displayDate = displayDate;
exports.displayDateAndTime = displayDateAndTime;
exports.displayObjectData = displayObjectData;
exports.displayObjectDataTable = displayObjectDataTable;
exports.displayObjectDataXML = displayObjectDataXML;
exports.displaySpaceAfterComma = displaySpaceAfterComma;
exports.displayTime = displayTime;
exports.displayValue = displayValue;
exports.displayYear = displayYear;
exports.emailFormat = emailFormat;
exports.exportCSVFile = exportCSVFile;
exports.filterBySelectedCheckbox = filterBySelectedCheckbox;
exports.filterDropdownOptions = filterDropdownOptions;
exports.formatDate = formatDate;
exports.formatFloat = formatFloat;
exports.formatInt = formatInt;
exports.formatLowerCase = formatLowerCase;
exports.formatPhoneNumber = formatPhoneNumber;
exports.formatSearchInput = formatSearchInput;
exports.formatTitle = formatTitle;
exports.formatToString = formatToString;
exports.formatToUSD = formatToUSD;
exports.formatTrim = formatTrim;
exports.formatUpperCase = formatUpperCase;
exports.generateHoursInterval = generateHoursInterval;
exports.generateRandomNumber = generateRandomNumber;
exports.generateRandomNumberDigits = generateRandomNumberDigits;
exports.getBrowserData = getBrowserData;
exports.getCurrentDay = getCurrentDay;
exports.getCurrentMonth = getCurrentMonth;
exports.getCurrentYear = getCurrentYear;
exports.getDateTime = getDateTime;
exports.getFetchAuthorization = getFetchAuthorization;
exports.getFilteredNames = getFilteredNames;
exports.getFirstItem = getFirstItem;
exports.getLastItem = getLastItem;
exports.getNumberOfDaysBetweenDates = getNumberOfDaysBetweenDates;
exports.getObjectArrayUniqueProperty = getObjectArrayUniqueProperty;
exports.getParseInt = getParseInt;
exports.getQueryStringData = getQueryStringData;
exports.getYears = getYears;
exports.groupObjectArrayByProperties = groupObjectArrayByProperties;
exports.hasDecimalPlaces = hasDecimalPlaces;
exports.hasEqualsProperty = hasEqualsProperty;
exports.hasFalseProperty = hasFalseProperty;
exports.hasNonEmptyProperty = hasNonEmptyProperty;
exports.hasTrueProperty = hasTrueProperty;
exports.inElectron = inElectron;
exports.inLearningObjectEcosystem = inLearningObjectEcosystem;
exports.isEmpty = isEmpty;
exports.isEmptyArray = isEmptyArray;
exports.isFutureDate = isFutureDate;
exports.isLocalDevelopment = isLocalDevelopment;
exports.isNonEmptyArray = isNonEmptyArray;
exports.isValidURL = isValidURL;
exports.isWholeNumber = isWholeNumber;
exports.noFunctionAvailable = noFunctionAvailable;
exports.parse = parse;
exports.parseDescription = parseDescription;
exports.randomizeItems = randomizeItems;
exports.removeArticlesFromBeginning = removeArticlesFromBeginning;
exports.removeForwardSlashes = removeForwardSlashes;
exports.removeHTML = removeHTML;
exports.removeNonAlphanumericCharacters = removeNonAlphanumericCharacters;
exports.replaceSmartCharacters = replaceSmartCharacters;
exports.resolveBaseURL = resolveBaseURL;
exports.resolveRedirectURL = resolveRedirectURL;
exports.returnActiveClass = returnActiveClass;
exports.showAuthentication = showAuthentication;
exports.showDemonstration = showDemonstration;
exports.showDevelopment = showDevelopment;
exports.showErrorMessage = showErrorMessage;
exports.showLocalDevelopment = showLocalDevelopment;
exports.showPlayground = showPlayground;
exports.showStaging = showStaging;
exports.sortObjectArrayByProperty = sortObjectArrayByProperty;
exports.sortObjectArrayByTwoProperties = sortObjectArrayByTwoProperties;
exports.truncateText = truncateText;
exports.tryParseJSON = tryParseJSON;
exports.validateMilitaryTime = validateMilitaryTime;

//# sourceMappingURL=index.cjs.map