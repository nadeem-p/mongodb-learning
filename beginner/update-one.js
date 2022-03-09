/**
 * updateOne — update first matching document
 * Run: mongosh mongo_learning beginner/update-one.js
 */
db = db.getSiblingDB("mongo_learning");
const c = db.demo_update_one;
c.drop();
c.insertMany([
  { id: 1, status: "new" },
  { id: 2, status: "new" },
]);

const r = c.updateOne({ id: 1 }, { $set: { status: "done" } });
print("matchedCount:", r.matchedCount, "modifiedCount:", r.modifiedCount);
printjson(c.find({}, { _id: 0 }).sort({ id: 1 }).toArray());
