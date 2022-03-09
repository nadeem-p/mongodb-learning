/**
 * Element operators: $exists, $type
 * Run: mongosh mongo_learning beginner/find-element-operators.js
 */
db = db.getSiblingDB("mongo_learning");
const c = db.demo_find_element;
c.drop();
c.insertMany([
  { a: 1 },
  { a: 2, b: null },
  { a: "text" },
]);

print("Field b exists:");
printjson(c.find({ b: { $exists: true } }, { _id: 0 }).toArray());
print("Field a is number (type 1 = double/int in BSON):");
printjson(c.find({ a: { $type: ["int", "long", "double"] } }, { _id: 0 }).toArray());
