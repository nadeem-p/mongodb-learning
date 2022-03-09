/**
 * insertMany — insert multiple documents at once
 * Run: mongosh mongo_learning beginner/insert-many.js
 */
db = db.getSiblingDB("mongo_learning");
const c = db.demo_insert_many;
c.drop();

const r = c.insertMany([
  { sku: "A1", price: 10 },
  { sku: "A2", price: 20 },
  { sku: "A3", price: 15 },
]);
print("insertedCount:", r.insertedCount);
print("insertedIds keys:", Object.keys(r.insertedIds));
printjson(c.find().sort({ sku: 1 }).toArray());
