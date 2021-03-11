let sample_object = {
    lev_1_first_key: "first_value",
    lev_1_second_key: 10,
    lev_1_third_key: {
        lev_2_first_key: "first_value",
        lev_2_second_key: [1, 2, { 1:22, 2:[5, 4 , 2 , 6 ,8] }, 4],
        lev_2_third_key: {
            lev_3_first_key: "first_value",
            lev_3_second_key: 30
        }
    }
}

function makeObjectDeepCopy(objectToCopy) {
    if (typeof(objectToCopy) != "object" && objectToCopy != null) {
        console.log("function \'makeObjectDeepCopy()\' requires object as the only argument), otherwise \"undefined\" is returned");
        return undefined;
    }
    if (typeof objectDeepCopy == "undefined") {
        var objectDeepCopy = {};
    };
    for (let key in objectToCopy) {
            if (typeof(objectToCopy[key]) == "object" && objectToCopy[key] != null) {
                if (Array.isArray(objectToCopy[key])) {
                    objectDeepCopy[key] = Object.values(makeObjectDeepCopy(objectToCopy[key]))
                } else {
                    objectDeepCopy[key] = makeObjectDeepCopy(objectToCopy[key]);
                }
            } else {
                objectDeepCopy[key] = objectToCopy[key];
            }
        }
        return objectDeepCopy
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

// Object.assign

// object spread

let test = sample_object
let deepCopy = makeObjectDeepCopy(test)
console.log(test)
console.log(deepCopy)

let equal = compareObjects(deepCopy, test)
console.log(equal)
// console.log(sample_object == deepCopy)
