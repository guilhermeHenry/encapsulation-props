module.exports = function (...objs) {
    objs.forEach(obj => {
        obj.set = (name, value, index = null) => {
            name = camelCase(name);
            
            // ## IF EXISTS
            if (!obj && !obj.hasOwnProperty(name)){
                return false
            }

            // ### get index of array
            if (index !== null && (isInteger(index) || typeof index === 'string')){
                obj[name][index] = value;
            }else{
                obj[name] = value;
            }
        }

        obj.add = (name, value) => {
            name = camelCase(name);

            // ## IF EXISTS
            if (!obj && !obj.hasOwnProperty(name)){
                return false
            }

            // add value and index
            if (Array.isArray(obj[name])){
                obj[name].push(value);
            }
        }

        obj.get = (name, index = null) => {
            name = camelCase(name);

            // ## IF EXISTS
            if (!obj && !obj.hasOwnProperty(name)){
                return false
            }

            // ### get index of array
            if (index !== null && (isInteger(index) || typeof index === 'string')){
                return obj[name][index] ? obj[name][index] : null
            }

            return obj[name];
        }
    });
}