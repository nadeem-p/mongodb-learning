/**
 * $lookup — left outer join to another collection
 * Run: mongosh mongo_learning intermediate/aggregation-lookup.js
 */
db = db.getSiblingDB("mongo_learning");
const orders = db.demo_agg_orders;
const customers = db.demo_agg_customers;
orders.drop();
customers.drop();

customers.insertMany([
  { _id: "c1", name: "Ann" },
  { _id: "c2", name: "Ben" },
]);
orders.insertMany([
  { oid: 1, customerId: "c1", amount: 10 },
  { oid: 2, customerId: "c2", amount: 20 },
]);

const out = orders
  .aggregate([
    {
      $lookup: {
        from: "demo_agg_customers",
        localField: "customerId",
        foreignField: "_id",
        as: "cust",
      },
    },
    { $unwind: "$cust" },
    { $project: { oid: 1, amount: 1, customerName: "$cust.name", _id: 0 } },
  ])
  .toArray();
printjson(out);
