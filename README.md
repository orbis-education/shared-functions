# Shared Functions

This repository contains shared functions that can be reused in multiple applications.


## Functions Available

### noFunctionAvailable()

If a function that should have been passed through props isn't available, the function provides a notification in the console log.

#### parameters

none

#### return

none


### isEmpty(value)

Determines if the value passed is not null, undefined or empty string.

#### parameters

value: the value to be checked

#### return

boolean


### getDateTime()

Calculates the local current time.

#### parameters

none

#### return

Date object


### isNonEmptyArray(arrayItem)

Determines if the value passed is an array and if there are items in it.

#### parameters

arrayItem: the value to be checked

#### return

boolean


### getFirstItem(arrayItem)

If the value passed is an array, the first item of the array is returned.

#### parameters

arrayItem: the array to retreive the first item from

#### return

first item in the array


### getLastItem(arrayItem)

If the value passed is an array, the last item of the array is returned.

#### parameters

arrayItem: the array to retreive the last item from

#### return

last item in the array


### displayValue(variableValue)

Converts the value passed into a string if it's a boolean or a date, or leaves the value alone if it's a string in order to be displayed in a component.

#### parameters

variableValue: the value to be displayed as a string

#### return

string


### displaySpaceAfterComma(text)

Inserts a space after a comma in the string that was passed to the function.

#### parameters

text(string): the text in which spaces are to be inserted

#### return

string


### removeForwardSlashes(text)

Removes the first forward slash(/) in the string that was passed to the function.

#### parameters

text(string): the text in which the forward slash(/) is to be removed

#### return

string


### tryParseJSON(jsonString)

Attempts to perform JSON.parse() on the value passed.

#### parameters

jsonString: the value to be converted into an object

#### return

Either the object created from the JSON.parse() or the boolean false that it failed.


### displayObjectData(ObjectData)

Displays the properties of the object passed as HTML.

#### parameters

ObjectData: a JavaScript object

#### return

string with HTML tags


### displayObjectDataTable(ObjectData)

Displays the properties of the object passed as HTML using a table to format the data.

#### parameters

ObjectData: a JavaScript object

#### return

string with HTML tags


### displayObjectDataXML(ObjectData)

Displays the properties of the object passed as XML.

#### parameters

ObjectData: a JavaScript object

#### return

string in XML format


### getCurrentDay()

Calculates the local current day of the month.

#### parameters

none

#### return

integer


### getCurrentMonth()

Calculates the local current month.

#### parameters

none

#### return

integer


### getCurrentYear()

Calculates the local current year.

#### parameters

none

#### return

integer


### displayDate(dateToDisplay, removeLeadingZeroes)

Converts the date object passed into the mm/dd/yyyy format.

#### parameters

dateToDisplay(Date): Date object to be converted

removeLeadingZeroes(boolean): remove the zeroes from single digit values

#### return

string


### displayDateAndTime(dateToDisplay, removeLeadingZeroes)

Converts the date object passed into the mm/dd/yyyy time format.

#### parameters

dateToDisplay(Date): Date object to be converted

removeLeadingZeroes(boolean): remove the zeroes from single digit values

#### return

string


### displayYear(dateToDisplay)

Converts the date object passed into the yyyy format.

#### parameters

dateToDisplay(Date): Date object to be converted

#### return

string


### daysSince(dateToCompare)

Calculates the number of days between the current time and the Date object passed

#### parameters

dateToCompare(Date): Date object to be compared

#### return

integer


### hasNonEmptyProperty(objectItem, propertyName)

Determines if an object has the property specified. Intended for use in ternary statements so that there aren't lines and lines of if statement structures or to see if the object has a property available with a value.

#### parameters

objectItem(object): the object to look for the property in

propertyName(string): the property to find in the object

#### return

boolean


### hasEqualsProperty(objectItem, propertyName, value)

Determines if an object has the property specified and if that property is equal to the value passed. Intended for use in ternary statements so that there aren't lines and lines of if statement structures or to see if the object has a property available with a value.

#### parameters

objectItem(object): the object to look for the property in

propertyName(string): the property to find in the object

value: the value that the property should be

#### return

boolean


### hasTrueProperty(objectItem, propertyName)

Determines if an object has the property specified and if that property is a boolean and true. Intended for use in ternary statements so that there aren't lines and lines of if statement structures or to see if the object has a property available with a value.

#### parameters

objectItem(object): the object to look for the property in

propertyName(string): the property to find in the object

#### return

boolean


### hasFalseProperty(objectItem, propertyName)

Determines if an object has the property specified and if that property is a boolean and false. Intended for use in ternary statements so that there aren't lines and lines of if statement structures or to see if the object has a property available with a value.

#### parameters

objectItem(object): the object to look for the property in

propertyName(string): the property to find in the object

#### return

boolean


### convertSpecialCharacters(value)

Converts reserved characters in an HTML string to HTML Entities.

#### parameters

value(string): the text in which the reserved characters are to be converted

#### return

string


### truncateText(text, limit)

Creates a string with only the number of characters specified.

#### parameters

text(string): the text to truncate

limit(integer): the number of characters to return

#### return

string


### validateMilitaryTime(timeEntered)

Determines if the value passed is in correct military (24 hour) time format.

#### parameters

timeEntered(string): the value to verify is in military time

#### return

boolean


### convertTemperature(temperatureScale, temperature)

Converts a temperature from celsius to fahrenheit or vice versa.

#### parameters

temperatureScale(string): celsius or fahrenheit

temperature(float): temperature to be converted

#### return

float


### convertYesNoTrueFalse(value)

Converts a string value of Yes or No into a boolean and vice versa.

#### parameters

value

#### return

Either the converted string or boolean value.


### convertNormalAbnormalTrueFalse(value)

Converts a string value of Normal or Abnormal into a boolean and vice versa.

#### parameters

value

#### return

Either the converted string or boolean value.


### convertEnableDisableTrueFalse(value)

Converts a string value of Enable or Disable into a boolean and vice versa.

#### parameters

value

#### return

Either the converted string or boolean value.


### convertNullEmptyString(value)

Converts a value of null into an empty string and vice versa.

#### parameters

value

#### return

Either the converted string or null value.


### isWholeNumber(value)

Determines if the value passed is a whole number (integer) or not.

#### parameters

value

#### return

boolean


### hasDecimalPlaces(value, decimalPlaces)

Determines if the value passed has decimal places and if it has the correct amount of them.

#### parameters

value: number to be checked

decimalPlaces: number of decimal places the number should have

#### return

boolean


### generateRandomNumber(minimumValue, maximumValue)

Generates a random number between the two numbers passed to the function.

#### parameters

minimumValue(integer): the smallest value the random number should be

maximumValue(integer): the largest value the random number should be

#### return

float


### generateRandomNumberDigits(digits)

Generates a random number of single digits.

#### parameters

digits(integer): the number of integers needed in the random number

#### return

string


### formatPhoneNumber(phoneNumber)

Converts the value passed into the phone number format of ###-###-####

#### parameters

phoneNumber(string)

#### return

string


### formatTitle(title)

Converts the value passed into title case.

#### parameters

title

#### return

string


### randomizeItems(items, randomize)

Randomizes the items in an array.

#### parameters

items(Array): array of the items

randomize(boolean): should the array passed be randomized

#### return

Array


### getObjectArrayUniqueProperty(objectArray, uniqueProperty)

Creates an array of the unique (distinct) values for a property of an array.

#### parameters

objectArray(Array): array of objects

uniqueProperty(string): the property for the unique values

#### return

Array


### removeArticlesFromBeginning(value)

Removes a and the from the beginning of a string. Mainly used when sorting items.

#### parameters

value(string)

#### return

string


### compareItemsForSorting(itemOne, itemTwo)

Determines which of the two values passed should be first. Used when sorting items.

#### parameters

itemOne

itemTwo

#### return

boolean


### sortObjectArrayByProperty(objectArray, sortProperty, direction)

Sorts an array on the property and direction that were passed to the function.

#### parameters

objectArray(Array): array of objects

sortProperty(string): the property to be used to sort

direction(string): the direction to sort (asc or desc)

#### return

Array


### sortObjectArrayByTwoProperties(objectArray, sortPropertyOne, sortPropertyTwo, direction)

Sorts an array on the properties and direction that were passed to the function. May not be functioning correctly.

#### parameters

objectArray(Array): array of objects

sortPropertyOne(string): the first property to be used to sort

sortPropertyTwo(string): the second property to be used to sort

direction(string): the direction to sort (asc or desc)

#### return

Array


### compareObjectProperties(originalObject, comparisonObject)

Compares two objects to determine if the properties in both are equivalent. The order of the objects in the parameters matters because the comparison is completed based on what does or does not exist in the comparisionObject.

#### parameters

originalObject(object)

comparisonObject(object)

#### return

object with arrays for newProperties, removedProperties and sameProperties


### groupObjectArrayByProperties(objectArray, keys)

Returns an array of arrays, one for each key including one named undefined for any items that don't have the key specified.

#### parameters

objectArray(Array): array of objects

keys(Array): values to group the items in the array

#### return

Array


### formatLowerCase(value)

Converts the value passed to all lowercase characters. Handles the situations in which the value passed is null or undefined and converts the value to a string if needed.

#### parameters

value

#### return

string


### formatUpperCase(value)

Converts the value passed to all uppercase characters. Handles the situations in which the value passed is null or undefined and converts the value to a string if needed.

#### parameters

value

#### return

string


### formatTrim(value)

Removes the white spaces at the beginning and end of the value passed. Handles the situations in which the value passed is null or undefined and converts the value to a string if needed.

#### parameters

value

#### return

string


### formatToString(value)

Converts the value to a string. Handles the situations in which the value passed is null or undefined.

#### parameters

value

#### return

string


### formatInt(value)

Converts the value to an integer. Handles the situations in which the value passed is null or undefined by returning an empty string.

#### parameters

value

#### return

integer


### formatFloat(value)

Converts the value to an float. Handles the situations in which the value passed is null or undefined by returning an empty string.

#### parameters

value

#### return

float


### formatSearchInput(value)

Removes the white spaces at the beginning and end of the value passed and converts the value passed to all lowercase characters. Handles the situations in which the value passed is null or undefined and converts the value to a string if needed.

#### parameters

value

#### return

string


### removeHTML(text)

Removes the HTML tags from the value passed. Handles the situations in which the value passed is null or undefined and converts the value to a string if needed.

#### parameters

text

#### return

string


### removeNonAlphanumericCharacters(text)

Removes all characters that aren't letters, numbers, spaces or a period. Handles the situations in which the value passed is null or undefined and converts the value to a string if needed.

#### parameters

text

#### return

string


### replaceSmartCharacters(jsonData)

Replaces some special characters that don't display in an HTML page consistently with their plain text equivalent.

#### parameters

jsonData(string)

#### return

string


### getQueryStringData()

Retrieves the querystring values and places them in a JavaScript object.

#### parameters

none

#### return

object


### addLog(baseURL, fetchAuthorization, databaseAvailable, allowLogging, logObject)

Posts to the log end point of an API.

#### parameters

baseURL(string): the root URL of the API

fetchAuthorization(string): the Authorization header property value

databaseAvailable(boolean): is the database available to be posted to

allowLogging(boolean): is the application allowing this to be logged to the database

logObject(object): the object to be posted to the API

#### return

string: the result of the Post request


### addErrorLog(baseURL, fetchAuthorization, databaseAvailable, allowLogging, errorObject)

Posts to the errorLogs end point of an API.

#### parameters

baseURL(string): the root URL of the API

fetchAuthorization(string): the Authorization header property value

databaseAvailable(boolean): is the database available to be posted to

allowLogging(boolean): is the application allowing this to be logged to the database

errorObject(object): the object to be posted to the API

#### return

string: the result of the Post request


