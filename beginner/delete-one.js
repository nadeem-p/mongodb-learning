/**
 * deleteOne — delete first matching document
 * Run: mongosh mongo_learning beginner/delete-one.js
 */
db = db.getSiblingDB("mongo_learning");
const c = db.demo_delete_one;
c.drop();
c.insertMany([{ v: 1 }, { v: 2 }, { v: 1 }]);

const r = c.deleteOne({ v: 1 });
print("deletedCount:", r.deletedCount);
print("Remaining:");
printjson(c.find({}, { _id: 0 }).toArray());
