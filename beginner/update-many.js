/**
 * updateMany — update all matches
 * Run: mongosh mongo_learning beginner/update-many.js
 */
db = db.getSiblingDB("mongo_learning");
const c = db.demo_update_many;
c.drop();
c.insertMany([
  { batch: "A", ok: false },
  { batch: "A", ok: false },
  { batch: "B", ok: false },
]);

const r = c.updateMany({ batch: "A" }, { $set: { ok: true } });
print("matchedCount:", r.matchedCount, "modifiedCount:", r.modifiedCount);
printjson(c.find({}, { _id: 0 }).sort({ batch: 1 }).toArray());
