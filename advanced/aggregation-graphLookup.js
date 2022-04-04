/**
 * $graphLookup — recursive graph traversal (e.g. org chart, referrals)
 * Run: mongosh mongo_learning advanced/aggregation-graphLookup.js
 */
db = db.getSiblingDB("mongo_learning");
const c = db.demo_graph;
c.drop();
c.insertMany([
  { _id: "root", parent: null },
  { _id: "child1", parent: "root" },
  { _id: "child2", parent: "root" },
  { _id: "grand", parent: "child1" },
]);

const out = c
  .aggregate([
    { $match: { _id: "root" } },
    {
      $graphLookup: {
        from: "demo_graph",
        startWith: "$_id",
        connectFromField: "_id",
        connectToField: "parent",
        as: "descendants",
        maxDepth: 4,
      },
    },
    { $project: { _id: 1, descendants: "$descendants._id" } },
  ])
  .toArray();
printjson(out);
