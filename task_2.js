function makeObjectDeepCopy(objectToCopy) {
    if (typeof(objectToCopy) != "object" && objectToCopy != null) {
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
// + 2) Написать функцию, которая принимает три аргумента: массив чисел, первое значение интервала, второе значение интервала.
// + Результатом вызова функции должен быть массив из значений, переданного массива, которые входят в этот интервал (концы включая).
// + Договоримся использовать только массивы чисел.
// + При этом значения интервала могут быть только числами.
// + Если в качестве первого параметра передан не массив или массив, содержащий не только числа - кидать ошибку (throw new Error('error message')).
// + Если хотя бы одно из значений интервала - невалидное число - также кидать ошибку.
// + Если первое значение интервала < второго, то считать за интервал значения от первого до второго, в ином случае - от второго до первого.
// Функция должна называться selectFromInterval. Это важно, т.к. проверять буду тестами.
// > Примеры:
// Вызываем функцию: selectFromInterval([1,3,5], 5, 2)
// Получаем результат: [3,5]
// Вызываем функцию: selectFromInterval([-2, -15, 0, 4], -13, -5)
// Получаем результат: []
// Вызываем функцию: selectFromInterval(['aaa'], 2, 3)
// Получаем результат: Ошибка!



function selectFromInterval(arrayOfNumbers, first, second) {

    if ((Array.isArray(arrayOfNumbers) && !arrayOfNumbers.some(isNaN)) &&
        !isNaN(first) && Number.isInteger(+first) &&
        !isNaN(second) && Number.isInteger(+second)) {
        let [begin, end] = (first < second) ? [first, second] : [second, first];
        // условие и примеры прямо не требуют "реверсивного среза" массива
        // при отрицательных значениях интервалов
        if (begin > arrayOfNumbers.length ||
            end < 1) {
            return []
        }
        begin = (begin < 1) ? 1 : begin;
        end = (end > arrayOfNumbers.length) ? arrayOfNumbers.length : end;
        return arrayOfNumbers.slice(--begin, end)
    } else {
        throw new Error('Ошибка!');
    }
}
console.log(selectFromInterval([1, 3, 5], -2, 5));
console.log(selectFromInterval([1, 3, 5], 2, -5));
console.log(selectFromInterval([1, 3, 5], -2, -5));



// console.log(selectFromInterval([1, 3, 5], 5, 2));
// // [3,5]
// console.log(selectFromInterval([-2, -15, 0, 4], -13, -5));
// // []
// console.log(selectFromInterval(['aaa'], 2, 3))
// Ошибка
