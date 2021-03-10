// 1) Написать свою функцию для глубокого копирования объектов. При этом алгоритм должен осуществляться вручную (никаких вариантов с использованием готовых библиотек и даже JSON.stringify() + JSON.parse(), за это сразу 0 баллов за первую задачу). Функция должна называться makeObjectDeepCopy. Принимать функция должна один параметр - объект, копию которого нужно сделать. Это важно, т.к. проверять буду тестами.


let another_sample_object = {
    'instanceOfFunction': new Function('return "test"'),
    'undefiendCheck': undefined,
    0: null,
    1: 'one',
    2: 'two',
    foo: n => {
        return n;
    },
    nestedObjects: {
        nastedArrays: [
            [0, 1, 2],
            [3, 4, {
                objInArray: 12334
            }], {
                nike: 'sneakers'
            }
        ],
        nestedFunction: {
            prostoPrivet: function() {
                return 'test';
            }
        }
    }
}

let sample_object = {
    lev_1_first_key: "first_value",
    lev_1_second_key: 10,
    lev_1_third_key: {
        lev_2_first_key: "first_value",
        lev_2_second_key: 20,
        lev_2_third_key: {
            lev_3_first_key: "first_value",
            lev_3_second_key: 30
        }
    }
}

function makeObjectDeepCopy(objectToCopy) {
    if (typeof objectDeepCopy == "undefined") {
        var objectDeepCopy = {};
    };
    if (!isObject(objectToCopy)) {
        console.log("function \'makeObjectDeepCopy()\' requires object as the only argument), otherwise \"undefined\" is returned");
        return undefined;
    } else {

        for (let key in objectToCopy) {
            if (isObject(objectToCopy[key])) {
                objectDeepCopy[key] = makeObjectDeepCopy(objectToCopy[key]);
            } else {
                objectDeepCopy[key] = objectToCopy[key];
            }
        }
        return objectDeepCopy
    }
}

function isObject(variable) {
    return (typeof(variable) == "object" && variable != null)
}

function compareObjects(first, second) {
    let keysMatch = true;
    let lenghFirst = Object.keys(first).length;
    console.log("first object has: " + lenghFirst + " keys.")
    let lenghSecond = Object.keys(second).length;
    console.log("second object has: " + lenghSecond + " keys.")
    keysMatch = (lenghFirst == lenghSecond)
    console.log("number of keys match: " + keysMatch)

    for (let keyFirst in first) {
        let keyMatchFound = false;
        for (let keySecond in second) {
            if (keyFirst == keySecond) {
                keyMatchFound = true;
            }
        }
        if (keyMatchFound == false) {
            keysMatch = false;
            break
        }
    }
    if (!keysMatch) {
        console.log("keys DO NOT match in both objects. Objects are different")
        return false
    } else {
        console.log("keys match in both objects")
        return compareKeyObj(first, second)
    }

}

function compareKeyObj(first, second) {
    let valuesMatch = true
    for (let key in first) {
        if (first[key] == second[key] && !isObject(first[key]) && !isObject(second[key])) {
            console.log("values for key " + key + " match in both objects")
            continue
        } else if (isObject(first[key]) && isObject(second[key])) {
            console.log("values for key " + key + " are both objects")
            valuesMatch = compareKeyObj(first[key], second[key])
        } else {
            console.log("values for key " + key + " DO NOT match in both objects. Objects are different")
            valuesMatch = false
        }
    }
    return valuesMatch
}

let deepCopy = makeObjectDeepCopy(sample_object)

console.log(sample_object)
console.log(deepCopy)

let equal = compareObjects(deepCopy, sample_object)
console.log(equal)
// console.log(sample_object == deepCopy)
