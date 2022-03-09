/**
 * find — read documents (basic filters)
 * Run: mongosh mongo_learning beginner/find.js
 */
db = db.getSiblingDB("mongo_learning");
const c = db.demo_find;
c.drop();
c.insertMany([
  { name: "alpha", score: 10, active: true },
  { name: "beta", score: 25, active: false },
  { name: "gamma", score: 25, active: true },
]);

print("--- all ---");
printjson(c.find().toArray());
print("--- score 25 ---");
printjson(c.find({ score: 25 }).toArray());
print("--- active true ---");
printjson(c.find({ active: true }).toArray());
