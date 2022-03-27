/**
 * Text index + $text search ($search score via $meta)
 * Run: mongosh mongo_learning intermediate/text-index-search.js
 */
db = db.getSiblingDB("mongo_learning");
const c = db.demo_text_search;
c.drop();
c.insertMany([
  { title: "MongoDB tutorial", body: "learn database basics" },
  { title: "SQL basics", body: "relational database intro" },
]);

c.createIndex({ title: "text", body: "text" });
const q = "MongoDB database";
const out = c
  .find({ $text: { $search: q } }, { score: { $meta: "textScore" } })
  .sort({ score: { $meta: "textScore" } })
  .toArray();
printjson(out);
