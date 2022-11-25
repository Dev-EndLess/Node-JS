// https://docs.npmjs.com/
// CLI = Command Line Interface
// https://docs.npmjs.com/cli/v9/commands

const { format } = require('date-fns')
const { v4: uuid } = require('uuid')

// https://date-fns.org/
console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'))
// https://www.npmjs.com/package/uuid
console.log(uuid())

// JSON Semantic Version
// example: "nodemon" "^2.0.20"

// attention: change the major version can broke the code

// first number = major version
// second number = minor version
// third number = patch version
// ^ = upgrade minor and patch version if needed
// ~ = upgrade patch but dont touch the minor version
// * = upgrade everything all the time // not too safe //