/**
 * Update operators: $set, $unset, $inc, $mul, $rename, $min, $max,
 * $push, $pull, $addToSet, $pop (subset shown)
 * Run: mongosh mongo_learning beginner/update-field-operators.js
 */
db = db.getSiblingDB("mongo_learning");
const c = db.demo_update_field_ops;
c.drop();
c.insertOne({ n: 1, arr: ["x"], counts: { a: 1 } });

c.updateOne({ n: 1 }, { $set: { label: "hi" }, $inc: { "counts.a": 2 } });
c.updateOne({ n: 1 }, { $push: { arr: "y" } });
c.updateOne({ n: 1 }, { $addToSet: { arr: "x" } });
c.updateOne({ n: 1 }, { $rename: { label: "title" } });
printjson(c.findOne({ n: 1 }));
