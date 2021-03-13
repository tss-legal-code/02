function makeObjectDeepCopy(objectToCopy) {
    if (typeof(objectToCopy) != "object" || objectToCopy == null) {
        return undefined;
    };
    if (typeof objectDeepCopy == "undefined") {
        var objectDeepCopy = {};
    };
    for (let key in objectToCopy) {
        if (typeof(objectToCopy[key]) == "object" && objectToCopy[key] != null) {
            if (Array.isArray(objectToCopy[key])) {
                objectDeepCopy[key] = Object.values(makeObjectDeepCopy(objectToCopy[key]))
            }
            objectDeepCopy[key] = makeObjectDeepCopy(objectToCopy[key]);
        }
        objectDeepCopy[key] = objectToCopy[key];
    }
    return objectDeepCopy
}

function selectFromInterval(arrayOfNumbers, first, second) {
    if ((Array.isArray(arrayOfNumbers) && !arrayOfNumbers.some(isNaN)) &&
        !isNaN(first) && Number.isInteger(+first) &&
        !isNaN(second) && Number.isInteger(+second)) {
        let [begin, end] = (first < second) ? [first, second] : [second, first];
        if (begin > arrayOfNumbers.length ||
            end < 1) {
            return [];
        }
        begin = (begin < 1) ? 1 : begin;
        end = (end > arrayOfNumbers.length) ? arrayOfNumbers.length : end;
        return arrayOfNumbers.slice(--begin, end);
    }
    throw new Error('Ошибка!');
}

const myIterable = {
    from: 1,
    to: 4,
    [Symbol.iterator]: function() {
        if (typeof(this.from) == "number" &&
            typeof(this.to) == "number" &&
            this.from < this.to) {
            return {
                current: this.from,
                last: this.to,
                next() {
                    if (this.current <= this.last) {
                        return {
                            value: this.current++,
                            done: false,
                        };
                    };
                    return {
                        done: true,
                    };
                },
            };
        };
        throw new Error('Ошибка!');
    },
}

for (let num of myIterable) {
    console.log(num);
}
