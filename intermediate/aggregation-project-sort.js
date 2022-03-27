/**
 * Aggregation: $project, $sort, $limit, $addFields, $cond
 * Run: mongosh mongo_learning intermediate/aggregation-project-sort.js
 */
db = db.getSiblingDB("mongo_learning");
const c = db.demo_agg_project;
c.drop();
c.insertMany([
  { name: "p1", price: 10, qty: 2 },
  { name: "p2", price: 15, qty: 1 },
]);

const out = c
  .aggregate([
    { $addFields: { lineTotal: { $multiply: ["$price", "$qty"] } } },
    { $project: { name: 1, lineTotal: 1, pricey: { $cond: [{ $gt: ["$price", 12] }, true, false] } } },
    { $sort: { lineTotal: -1 } },
    { $limit: 5 },
  ])
  .toArray();
printjson(out);
