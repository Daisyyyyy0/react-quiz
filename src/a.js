const numbers = [10, 20, 30, 40, 50];
const average = numbers.reduce((acc, curr, index, array) => {
  acc += curr;
  if (index === array.length - 1) {
    return acc / array.length; // 最後一個元素處理完後計算平均值
  }
  return acc;
}, 0);
console.log(average); // 30

const fruits = [
  'apple',
  'banana',
  'orange',
  'apple',
  'orange',
  'banana',
  'apple',
];
const count = fruits.reduce((acc, curr) => {
  acc[curr] = (acc[curr] || 0) + 1;
  return acc;
}, {});
console.log(count);
// { apple: 3, banana: 2, orange: 2 }

const nestedArray = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const flatArray = nestedArray.reduce((acc, curr) => acc.concat(curr), []);
console.log(flatArray); // [1, 2, 3, 4, 5, 6]

const arrayWithDuplicates = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = arrayWithDuplicates.reduce((acc, curr) => {
  if (!acc.includes(curr)) {
    acc.push(curr);
  }
  return acc;
}, []);
console.log(uniqueArray); // [1, 2, 3, 4, 5]

const people = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 },
];
const peopleObject = people.reduce((acc, curr) => {
  acc[curr.name] = curr.age;
  return acc;
}, {});
console.log(peopleObject);
// { Alice: 25, Bob: 30, Charlie: 35 }
