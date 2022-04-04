/**
 * Views — read-only virtual collection from aggregation pipeline
 * Run: mongosh mongo_learning advanced/views.js
 */
db = db.getSiblingDB("mongo_learning");
const src = db.demo_views_source;
const viewName = "demo_views_active_only";
db[viewName].drop();
src.drop();

src.insertMany([
  { name: "x", active: true },
  { name: "y", active: false },
]);

db.createView(viewName, "demo_views_source", [{ $match: { active: true } }, { $project: { _id: 0, name: 1 } }]);

print("View contents (only active):");
printjson(db[viewName].find().toArray());
print("Underlying collection unchanged:");
printjson(src.find({}, { _id: 0 }).toArray());
