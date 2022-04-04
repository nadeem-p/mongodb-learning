/**
 * bulkWrite — batch inserts, updates, deletes in one request
 * Run: mongosh mongo_learning advanced/bulk-write.js
 */
db = db.getSiblingDB("mongo_learning");
const c = db.demo_bulk_write;
c.drop();
c.insertMany([{ _id: 1, v: 0 }, { _id: 2, v: 0 }]);

const r = c.bulkWrite([
  { insertOne: { document: { _id: 3, v: 1 } } },
  { updateOne: { filter: { _id: 1 }, update: { $set: { v: 10 } } } },
  { deleteOne: { filter: { _id: 2 } } },
]);
printjson(r);
print("Final docs:");
printjson(c.find().sort({ _id: 1 }).toArray());
