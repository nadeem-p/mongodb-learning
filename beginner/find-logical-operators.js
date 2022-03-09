/**
 * Logical operators: $and, $or, $nor, $not
 * Run: mongosh mongo_learning beginner/find-logical-operators.js
 */
db = db.getSiblingDB("mongo_learning");
const c = db.demo_find_logical;
c.drop();
c.insertMany([
  { a: 1, b: 1 },
  { a: 1, b: 2 },
  { a: 2, b: 1 },
]);

print("$and [{a:1},{b:2}]:");
printjson(c.find({ $and: [{ a: 1 }, { b: 2 }] }).toArray());
print("$or [{a:2},{b:2}]:");
printjson(c.find({ $or: [{ a: 2 }, { b: 2 }] }, { _id: 0 }).toArray());
print("$nor [{a:1},{b:1}]:");
printjson(c.find({ $nor: [{ a: 1 }, { b: 1 }] }, { _id: 0 }).toArray());
