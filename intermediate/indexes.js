/**
 * Indexes: createIndex, listIndexes, dropIndex, hint (basic)
 * Run: mongosh mongo_learning intermediate/indexes.js
 */
db = db.getSiblingDB("mongo_learning");
const c = db.demo_indexes;
c.drop();
c.insertMany([
  { user: "u1", year: 2023 },
  { user: "u2", year: 2024 },
  { user: "u1", year: 2024 },
]);

c.createIndex({ user: 1 });
c.createIndex({ user: 1, year: -1 }, { name: "user_year_desc" });
print("Indexes on demo_indexes:");
printjson(c.getIndexes());
print("Explain (IXSCAN if index used):");
printjson(c.find({ user: "u1" }).explain("executionStats").executionStats.executionStages.stage);

c.dropIndex("user_year_desc");
print("After drop one index:");
printjson(c.getIndexes().map((x) => x.name));
