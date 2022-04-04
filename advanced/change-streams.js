/**
 * Change streams — react to data changes (requires replica set or sharded cluster)
 * Run: mongosh mongo_learning advanced/change-streams.js
 */
db = db.getSiblingDB("mongo_learning");
const c = db.demo_change_streams;
c.drop();

try {
  const stream = c.watch([{ $match: { operationType: "insert" } }]);
  c.insertOne({ msg: "hello" });
  const ev = stream.tryNext();
  if (ev) {
    print("Caught insert event:", ev.operationType, ev.ns && ev.ns.coll);
    printjson(ev.fullDocument || {});
  } else {
    print("No event from tryNext().");
  }
  stream.close();
} catch (e) {
  print("Change streams are not available on this deployment (typical for standalone):");
  print(String(e.message));
  print("Use a replica set (e.g. rs.initiate()) or Atlas to try change streams.");
}
