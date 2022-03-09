/**
 * insertOne — insert a single document
 * Run: mongosh mongo_learning beginner/insert-one.js
 */
db = db.getSiblingDB("mongo_learning");
const c = db.demo_insert_one;
c.drop();

const r = c.insertOne({ item: "notebook", qty: 2, tags: ["office"] });
print("insertOne acknowledged:", r.acknowledged);
print("insertedId:", r.insertedId);
print("Documents:");
printjson(c.find().toArray());
