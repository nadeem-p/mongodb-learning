/**
 * $unwind, $facet — multiple sub-pipelines; unwind arrays
 * Run: mongosh mongo_learning intermediate/aggregation-unwind-facet.js
 */
db = db.getSiblingDB("mongo_learning");
const c = db.demo_agg_unwind_facet;
c.drop();
c.insertMany([
  { id: 1, tags: ["a", "b"] },
  { id: 2, tags: ["b"] },
]);

const out = c
  .aggregate([
    {
      $facet: {
        byTag: [{ $unwind: "$tags" }, { $sortByCount: "$tags" }],
        countDocs: [{ $count: "n" }],
      },
    },
  ])
  .toArray();
printjson(out);
