/**
 * Aggregation: $match, $group, $sum, $avg, $count
 * Run: mongosh mongo_learning intermediate/aggregation-match-group.js
 */
db = db.getSiblingDB("mongo_learning");
const c = db.demo_agg_match_group;
c.drop();
c.insertMany([
  { dept: "A", sales: 100 },
  { dept: "A", sales: 50 },
  { dept: "B", sales: 200 },
]);

const out = c
  .aggregate([
    { $match: { sales: { $gte: 50 } } },
    { $group: { _id: "$dept", total: { $sum: "$sales" }, avg: { $avg: "$sales" } } },
    { $sort: { _id: 1 } },
  ])
  .toArray();
printjson(out);
