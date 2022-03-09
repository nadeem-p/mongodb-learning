/**
 * Comparison query operators: $gt, $gte, $lt, $lte, $ne, $in, $nin
 * Run: mongosh mongo_learning beginner/find-comparison-operators.js
 */
db = db.getSiblingDB("mongo_learning");
const c = db.demo_find_comparison;
c.drop();
c.insertMany([
  { n: 1, letter: "a" },
  { n: 5, letter: "b" },
  { n: 10, letter: "c" },
  { n: 10, letter: "d" },
]);

print("$gt 5:", c.find({ n: { $gt: 5 } }).toArray().length, "docs");
print("$gte 5:", c.find({ n: { $gte: 5 } }).toArray().length, "docs");
print("$lt 10:", c.find({ n: { $lt: 10 } }).toArray().length, "docs");
print("$in [5,10]:");
printjson(c.find({ n: { $in: [5, 10] } }, { _id: 0 }).toArray());
print("$nin [5]:");
printjson(c.find({ n: { $nin: [5] } }, { _id: 0 }).toArray());
