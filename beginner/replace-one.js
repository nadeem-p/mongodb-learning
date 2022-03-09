/**
 * replaceOne — replace entire document (except _id) when filter matches
 * Run: mongosh mongo_learning beginner/replace-one.js
 */
db = db.getSiblingDB("mongo_learning");
const c = db.demo_replace_one;
c.drop();
const ins = c.insertOne({ key: "k1", oldField: 1, keep: "maybe" });
const id = ins.insertedId;

c.replaceOne({ _id: id }, { key: "k1", replaced: true });
print("After replace (old fields gone unless in replacement):");
printjson(c.find().toArray());
