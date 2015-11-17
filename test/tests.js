(function (root, tests) {
    if (typeof exports === "object") {
        tests(require("expect.js"), require("../linq.js"));
    } else {
        tests(root.expect);
    }
})(this, function (expect) {
    "use strict";

    describe("linq.js", function () {
        it("should add linqArray property to arrays", function (done) {
            expect([].linqArray).to.be(true);
            done();
        });

        it("`first` should return first matching element", function (done) {
            var a = [{ value: 1 }, { value: 2 }, { value: 2 }];

            expect(a.first("x => x.value > 1")).to.be(a[1]);
            done();
        });

        it("`last` should return last matching element", function (done) {
            var a = [{ value: 1 }, { value: 2 }, { value: 2 }];

            expect(a.last("x => x.value > 1")).to.be(a[2]);
            done();
        });

        it("`where` should return only matching elements", function (done) {
            var a = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }];
            var b = a.where("x => x.value > 2");

            expect(b.length).to.be(2);
            expect(b[0]).to.be(a[2]);
            expect(b[1]).to.be(a[3]);
            done();
        });

        it("`select` should select returned value per each array element", function (done) {
            var a = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }];
            var b = a.select("x => x.value");

            expect(b.length).to.be(a.length);

            for (var i = 0; i < a.length; i++) {
                expect(b[i]).to.be(a[i].value);
            }

            done();
        });

        it("`selectMany` should join returned arrays per each array element", function (done) {
            var a = [{ value: [1, 1] }, { value: [2, 2] }, { value: [3, 3] }, { value: [4, 4] }];
            var b = a.selectMany("x => x.value");

            expect(b.length).to.be(a.length * 2);

            for (var i = 0; i < a.length; i++) {
                expect(b[i]).to.be(a[parseInt(i / 2)].value[i % 2]);
            }

            done();
        });

        it("`take` should return first N elements", function (done) {
            var a = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }];
            var b = a.take(2);

            expect(b.length).to.be(2);
            expect(b[0]).to.be(a[0]);
            expect(b[1]).to.be(a[1]);
            done();
        });

        it("`skip` should skip first N elements", function (done) {
            var a = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }];
            var b = a.skip(2);

            expect(b.length).to.be(2);
            expect(b[0]).to.be(a[2]);
            expect(b[1]).to.be(a[3]);
            done();
        });

        it("`clear` should remove all elements", function (done) {
            var a = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }];

            a.clear();
            expect(a.length).to.be(0);
            done();
        });

        it("`contains` should return true if element is whithin an array, false otherwise", function (done) {
            var a = [1, 2, 3, 4];

            expect(a.contains(1)).to.be(true);
            expect(a.contains(5)).to.be(false);
            done();
        });

        it("`group` should group array elements by selected value", function (done) {
            var a = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }];
            var b = a.group("x => x.value % 2");

            expect(b.length).to.be(2);
            expect(b[0].key).to.be(1);
            expect(b[0].length).to.be(2);
            expect(b[1].key).to.be(0);
            expect(b[1].length).to.be(2);

            done();
        });

        it("`sum` should return sum of all selected values", function (done) {
            var a = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }];

            expect(a.sum("x => x.value")).to.be(10);
            done();
        });

        it("`max` should return max value of all selected values", function (done) {
            var a = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }];

            expect(a.max("x => x.value")).to.be(4);
            done();
        });

        it("`min` should return min value of all selected values", function (done) {
            var a = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }];

            expect(a.min("x => x.value")).to.be(1);
            done();
        });

        it("`avg` should return average value of all selected values", function (done) {
            var a = [{ value: 1 }, { value: 1 }, { value: 3 }, { value: 3 }];

            expect(a.avg("x => x.value")).to.be(2);
            done();
        });

        it("`distinct` should return unique elements based on selected values", function (done) {
            var a = [{ value: 1 }, { value: 1 }, { value: 3 }, { value: 3 }];
            var b = a.distinct("x => x.value");

            expect(b.length).to.be(2);
            expect(b[0].value).to.be(1);
            expect(b[1].value).to.be(3);
            done();
        });

        it("`copy` should copy existing array", function (done) {
            var a = [{ value: 1 }, { value: 1 }, { value: 3 }, { value: 3 }];
            var b = a.copy();

            expect(b.length).to.be(a.length);

            for (var i = 0; i < a.length; i++) {
                expect(a[i]).to.be(b[i]);
            }

            done();
        });

        it("`any` should return true if any element found in array, false otherwise", function (done) {
            var a = [{ value: 1 }, { value: 1 }, { value: 3 }, { value: 3 }];

            expect(a.any("x => x.value == 1")).to.be(true);
            expect(a.any("x => x.value == 2")).to.be(false);
            done();
        });

        it("`orderBy` should sort array by selected value", function (done) {
            var a = [{ value: 1 }, { value: 3 }, { value: 2 }, { value: 0 }];
            var b = a.orderBy("x => x.value");

            expect(b.length).to.be(a.length);

            for (var i = 0; i < b.length; i++) {
                expect(b[i].value).to.be(i);
            }

            done();
        });

        it("`orderByDesc` should descending sort array by selected value", function (done) {
            var a = [{ value: 1 }, { value: 3 }, { value: 2 }, { value: 0 }];
            var b = a.orderByDesc("x => x.value");

            expect(b.length).to.be(a.length);

            for (var i = 0; i < b.length; i++) {
                expect(b[i].value).to.be(b.length - i - 1);
            }

            done();
        });

        it("`findIndex` should return index of found element", function (done) {
            var a = [{ value: 1 }, { value: 3 }, { value: 2 }, { value: 0 }];

            expect(a.findIndex("x => x.value == 3")).to.be(1);
            expect(a.findIndex("x => x.value == 0")).to.be(3);

            done();
        });

        it("`removeElement` should remove provided element", function (done) {
            var a = [{ value: 1 }, { value: 3 }, { value: 2 }, { value: 0 }];

            a.removeElement(a[1]);

            expect(a.length).to.be(3);
            expect(a[1].value).to.be(2);

            done();
        });

        it("`removeAt` should remove element at provided index", function (done) {
            var a = [{ value: 1 }, { value: 3 }, { value: 2 }, { value: 0 }];

            a.removeAt(1);

            expect(a.length).to.be(3);
            expect(a[1].value).to.be(2);

            done();
        });
    });
});