/**
 * Schema validation — JSON Schema on collection (validator + validationLevel)
 * Run: mongosh mongo_learning advanced/schema-validation.js
 */
db = db.getSiblingDB("mongo_learning");
const name = "demo_schema_validation";
db[name].drop();

db.createCollection(name, {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "age"],
      properties: {
        email: { bsonType: "string", pattern: "^.+@.+\\..+$" },
        age: { bsonType: "int", minimum: 0 },
      },
    },
  },
  validationLevel: "strict",
  validationAction: "error",
});

const col = db[name];
print("Valid insert:");
printjson(col.insertOne({ email: "a@b.com", age: NumberInt(20) }));

print("Invalid insert (expect error):");
try {
  col.insertOne({ email: "bad", age: NumberInt(1) });
} catch (e) {
  print(String(e.message).slice(0, 200));
}
