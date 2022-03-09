/**
 * find with projection — choose returned fields (include / exclude)
 * Run: mongosh mongo_learning beginner/find-projection.js
 */
db = db.getSiblingDB("mongo_learning");
const c = db.demo_find_projection;
c.drop();
c.insertMany([
  { title: "Doc1", secret: "x", views: 100 },
  { title: "Doc2", secret: "y", views: 200 },
]);

print("Only title + views (exclude secret, hide _id):");
printjson(c.find({}, { title: 1, views: 1, _id: 0 }).toArray());
print("Exclude views only:");
printjson(c.find({}, { views: 0 }).toArray());
