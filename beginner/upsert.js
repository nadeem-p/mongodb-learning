/**
 * upsert — update if match; insert if no match (upsert: true)
 * Run: mongosh mongo_learning beginner/upsert.js
 */
db = db.getSiblingDB("mongo_learning");
const c = db.demo_upsert;
c.drop();

const r1 = c.updateOne(
  { slug: "only-one" },
  { $set: { slug: "only-one", visits: 1 } },
  { upsert: true },
);
print("First upsert — upsertedId present?", r1.upsertedId != null);
const r2 = c.updateOne(
  { slug: "only-one" },
  { $inc: { visits: 1 } },
  { upsert: true },
);
print("Second upsert — modifiedCount:", r2.modifiedCount);
printjson(c.find({}, { _id: 0 }).toArray());
