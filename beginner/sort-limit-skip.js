/**
 * cursor modifiers: sort, limit, skip
 * Run: mongosh mongo_learning beginner/sort-limit-skip.js
 */
db = db.getSiblingDB("mongo_learning");
const c = db.demo_sort_limit_skip;
c.drop();
c.insertMany([
  { rank: 3, label: "c" },
  { rank: 1, label: "a" },
  { rank: 2, label: "b" },
]);

print("sort by rank ascending:");
printjson(c.find({}, { _id: 0 }).sort({ rank: 1 }).toArray());
print("limit 2:");
printjson(c.find({}, { _id: 0 }).sort({ rank: 1 }).limit(2).toArray());
print("skip 1, limit 2:");
printjson(c.find({}, { _id: 0 }).sort({ rank: 1 }).skip(1).limit(2).toArray());
