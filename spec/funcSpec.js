describe("Promise", function() {
    var asyncForEach = require("../src/index.js");
    const EXP_OUTSIDE_STRING = "Before\nAfter\n";
    const EXP_INSIDE_STRING =
        "Before\nAfter\nItem 1 at 0\nItem 2 at 1\nItem 3 at 2\nDone\n";

    beforeAll(function() {
        this.output = "";
    });

    it("should be resolved", function() {
        asyncForEach([1, 2, 3], function(item, index, next) {
            console.log("Item %s at %s", item, index);
            setTimeout(next, 10);
        }).then(function(result) {
            expect(result).toEqual("Resolved");
        });
    });

    it("should be rejected", function() {
        var promise = asyncForEach("A string", function(item, index, next) {
            console.log("Item %s at %s", item, index);
            setTimeout(next, 10);
        }).catch(function(error) {
            expect(error).toEqual("asyncForEach accepts arrays only");
        });
    });

    it("should be rejected", function() {
        var promise = asyncForEach([1, 2, 3], null).catch(function(error) {
            expect(error).toEqual("second argument is not a function");
        });
    });

    it("should log in right order", function(done) {
        this.output += "Before\n";
        var that = this;
        asyncForEach([1, 2, 3], function(item, index, next) {
            that.output +=
                "Item " +
                JSON.stringify(item) +
                " at " +
                JSON.stringify(index) +
                "\n";
            setTimeout(next, 10);
        }).then(function() {
            that.output += "Done\n";
            expect(that.output).toEqual(EXP_INSIDE_STRING);
            done();
        });
        this.output += "After\n";

        expect(this.output).toEqual(EXP_OUTSIDE_STRING);
    });
});
