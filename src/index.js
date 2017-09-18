function asyncForEach(items, callback) {
    const FUNC_TYPE = "function";

    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            if (!Array.isArray(items)) {
                reject("asyncForEach accepts arrays only");
            } else if (typeof callback !== FUNC_TYPE) {
                reject("second argument is not a function");
            } else {
                for (let item of items) {
                    callback(item, items.indexOf(item), () => {});
                }
                resolve("Resolved");
            }
        }, 10);
    });
}

console.log("Before");
asyncForEach([1, 2, 3], function(item, index, next) {
    console.log("Item %s at %s", item, index);
    setTimeout(next, 10);
}).then(function() {
    console.log("Done");
});
console.log("After");

module.exports = asyncForEach;
