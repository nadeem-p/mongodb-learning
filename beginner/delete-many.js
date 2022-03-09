/**
 * deleteMany — delete all matching documents
 * Run: mongosh mongo_learning beginner/delete-many.js
 */
db = db.getSiblingDB("mongo_learning");
const c = db.demo_delete_many;
c.drop();
c.insertMany([{ t: "x" }, { t: "x" }, { t: "y" }]);

const r = c.deleteMany({ t: "x" });
print("deletedCount:", r.deletedCount);
printjson(c.find({}, { _id: 0 }).toArray());
