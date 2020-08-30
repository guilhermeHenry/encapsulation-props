const foreach = require('lodash/forEach');
const camelCase = require('lodash/camelCase');
const isInteger = require('lodash/isInteger');

module.exports.define = function (data) {
    let names = [];

    const setAllProps = function (props, parent = [], key = null) {
        if (parent.length > 1){

            names.push(parent.join('') + (key ? key : ''));
        }

        foreach(props, (value, index) => {

            if (!Array.isArray(value) && typeof value === 'object'){
                parent.push(index + '.');
                setAllProps(value, parent, index);
            }

            
        });
    }

    setAllProps(data);

   console.log(names);
}

module.exports.encapsulation = function (...objs) {
    objs.forEach(access);
}

function access(obj) {
    obj.set = (name, value, index = null) => {
        name = camelCase(name);
        
        // ## IF EXISTS
        if (!obj.hasOwnProperty(name) || !value){return false}
        if (typeof index === 'string'){index = camelCase(index)}

        // ### get index of array
        if (index !== null && (isInteger(index) || typeof index === 'string')){
            obj[name][index] = value;
        }else{
            obj[name] = value;
        }
    }

    obj.get = (name, index = null) => {
        name = camelCase(name);

        // ## IF EXISTS
        if (!obj.hasOwnProperty(name)){return false}
        if (typeof index === 'string'){index = camelCase(index)}

        // ### get index of array or Object
        if (index !== null && (isInteger(index) || typeof index === 'string')){
            return obj[name][index] ? obj[name][index] : null
        }

        return obj[name];
    }

    obj.add = (name, value) => {
        name = camelCase(name);

        // ## IF EXISTS
        if (!obj && !obj.hasOwnProperty(name)){return false}

        // add value and index
        if (Array.isArray(obj[name])){
            obj[name].push(value);
        }
    }

    obj.has = (name, index = null) => {
        name = camelCase(name);
        index = index !== null && typeof index === 'string' ? camelCase(index) : index;
        
        // ## IF EXISTS
        if (!obj.hasOwnProperty(name)){
            return false
        }

        if (index !== null && !obj[name][index]){
            return false
        }

        return true;
    }
}