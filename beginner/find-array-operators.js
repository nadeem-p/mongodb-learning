/**
 * Array operators: $all, $elemMatch, $size
 * Run: mongosh mongo_learning beginner/find-array-operators.js
 */
db = db.getSiblingDB("mongo_learning");
const c = db.demo_find_array;
c.drop();
c.insertMany([
  { tags: ["a", "b"], scores: [8, 9] },
  { tags: ["b", "c"], scores: [10] },
  { tags: ["a"], scores: [7, 8, 9] },
]);

print("tags has a AND b ($all):");
printjson(c.find({ tags: { $all: ["a", "b"] } }, { _id: 0 }).toArray());
print("scores elemMatch >= 8 and <= 9:");
printjson(c.find({ scores: { $elemMatch: { $gte: 8, $lte: 9 } } }, { _id: 0 }).toArray());
print("tags array size 2:");
printjson(c.find({ tags: { $size: 2 } }, { _id: 0 }).toArray());
