/**
 * Multi-document transactions (requires replica set or sharded cluster)
 * Run: mongosh mongo_learning advanced/transactions.js
 *
 * On standalone, the script explains the limitation and runs non-atomic demo updates.
 */
db = db.getSiblingDB("mongo_learning");
const a = db.demo_tx_a;
const b = db.demo_tx_b;
a.drop();
b.drop();
a.insertOne({ _id: 1, bal: 100 });
b.insertOne({ _id: 1, bal: 0 });

const hello = db.adminCommand({ hello: 1 });
const isReplicaSet = hello.setName != null;

if (!isReplicaSet) {
  print("This mongod is standalone (no replica set name in hello).");
  print("Multi-document transactions are not available — showing two sequential updates (not atomic):");
  a.updateOne({ _id: 1 }, { $inc: { bal: -30 } });
  b.updateOne({ _id: 1 }, { $inc: { bal: 30 } });
  printjson({ a: a.findOne(), b: b.findOne() });
  print("On a replica set, wrap both updates in session.withTransaction(...) for atomicity.");
} else {
  const session = db.getMongo().startSession();
  try {
    session.withTransaction(() => {
      a.updateOne({ _id: 1 }, { $inc: { bal: -30 } }, { session });
      b.updateOne({ _id: 1 }, { $inc: { bal: 30 } }, { session });
    });
    print("Transaction committed.");
    printjson({ a: a.findOne(), b: b.findOne() });
  } finally {
    session.endSession();
  }
}
