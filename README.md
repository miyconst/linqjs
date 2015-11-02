# linqjs
JavaScript linq methods

### Methods

Name            | Parameters                                  | Return        | Description
----------------|---------------------------------------------|---------------|------------------------
`Array.lambda`  | (predicate: string*)                        | function      | Converts linq string expression into JavaScript function. For example `"x=>x.value"` would be converted to `function (x) { return x.value; }`.
`forEach`       | (predicate: function*)                      | void          | Executes provided function per each element in array. Return `false` or `{ stop: true }` to break iteration.
`first`         | (predicate: function)                       | object        | Returns first matching element.
`last`          | (predicate: function)                       | object        | Returns last matching element.
`where`         | (predicate: function*)                      | array         | Returns new array with matching elements.
`select`        | (predicate: function*)                      | array         | Returns new array with returned values per each element.
`selectMany`    | (predicate: function*)                      | array         | Returns new array which contains all of the elements of returned arrays per each element. 
`take`          | (n: integer*)                               | array         | Returns new array with N first elements of the original array.
`skip`          | (n: integer*)                               | array         | Returns new array without N first elements of the original array.
`clear`         |                                             | void          | Removes all of the array elements.
`contains`      | (element: object*)                          | boolean       | Returns `true` if provided element is within array, `false` otherwise.
`group`         | (predicate: function*)                      | array         | Groups array items by value, returns array of groups, where each groups is an array of element with `key` property.
`sum`           | (predicate: function, defaultValue: object) | number/string | Returns sum of all selected values or default value if no elements in array.
`max`           | (predicate: function, defaultValue: object) | number/string | Returns max value of all selected values or default value if no elements in array.
`min`           | (predicate: function, defaultValue: object) | number/string | Returns min value of all selected values or default value if no elements in array.
`avg`           | (predicate: function, defaultValue: object) | number/string | Returns average value of all selected values or default value if no elements in array.
`distinct`      | (predicate: function)                       | array         | Returns new array with unique elements from the original array.
`copy`          |                                             | array         | Returns a copy of the original array, same as `array.slice()`.
`any`           | (predicate: function)                       | boolean       | Returns `true` if an element was found in the array, `false` otherwise.
`orderBy`       | (predicate: function*, desc: boolen)        | array         | Returns new array with elements from the original array sorted by value provided.
`orderByDesc`   | (predicate: function*)                      | array         | Same as `array.orderBy(expression, true)`;
`findIndex`     | (predicate: function*)                      | integer       | Returns index of matching element, -1 if no elements match the predicate.
`removeElement` | (element: object*)                          | void          | Removes element from array.
`removeAt`      | (index: integer*)                           | void          | Removes element at position `index`, equals to `array.splice(index, 1)`.

- The parameters marked with * are required.
- The predicate function may be passed as a function or as a string which will be converted to a function with `Array.lambda` method.

### Examples

The following array will be used in all examples:
```js
var array = [{ value: 0 }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }, { value: 7 }, { value: 8 }, { value: 9 }];
```

#### forEach

```js
array.forEach(function (item, index) {
	item.value++;

	if (item.value > 4) {
		return false;
	}
});

console.log(array);
```

```js
[{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 5 }, { value: 6 }, { value: 7 }, { value: 8 }, { value: 9 }]
```

#### first

```js
console.log(array.first("x => x.value > 1"));
```

```js
{ value: 2 }
```

#### last

```js
console.log(array.last("x => x.value > 1"));
```

```js
{ value: 9 }
```

#### where

```js
console.log(array.where("x => x.value % 2 == 0"));
```

```js
[{ value: 0 }, { value: 2 }, { value: 4 }, { value: 6 }, { value: 8 }]
```

#### select

```js
console.log(array.select("x => x.value"));
```

```js
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

#### selectMany

```js
console.log(array.selectMany(function(item, index) {
	return [item.value, item.value];
}));
```

```js
[0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
```

#### take

```js
console.log(array.take(2));
```

```js
[{ value: 0 }, { value: 1 }]
```

#### skip

```js
console.log(array.skip(8));
```

```js
[{ value: 8 }, { value: 9 }]
```

#### contains

```js
console.log([1, 2, 3].contains(2));
console.log([1, 2, 3].contains(5));
```

```js
true
false
```

#### group

```js
var b = array.group("x => x.value % 2");

console.log(b);
console.log(b.select("x => x.key"));
```

```js
[
	[{ value: 0 }, { value: 2 }, { value: 4 }, { value: 6 }, { value: 8 }], 
	[{ value: 1 }, { value: 3 }, { value: 5 }, { value: 7 }, { value: 9 }]
]

[0, 1]
```

#### sum

```js
console.log(array.sum("x => x.value"));
```

```js
45
```

#### max

```js
console.log(array.max("x => x.value"));
```

```js
9
```

#### min

```js
console.log(array.min("x => x.value"));
```

```js
0
```

#### avg

```js
console.log(array.avg("x => x.value"));
```

```js
4.5
```

#### distinct

```js
console.log([1, 2, 1, 3, 3, 4, 5].distinct("x => x"));
```

```js
[1, 2, 3, 4, 5]

#### any

```js
console.log([1, 2, 3].any("x => x == 2"));
console.log([1, 2, 3].any("x => x == 5"));
```

```js
true
false
```

#### orderBy

```js
console.log([1, 2, 1, 3, 3, 4, 5].orderBy("x => x"));
```

```js
[1, 1, 2, 3, 3, 4, 5]
```

#### orderByDesc

```js
console.log([1, 2, 1, 3, 3, 4, 5].orderBy("x => x"));
```

```js
[5, 4, 3, 3, 2, 1, 1]
```

#### findIndex

```js
console.log(array.findIndex("x => x.value == 2"));
console.log(array.findIndex("x => x.value == 10"));
```

```js
2
-1
```