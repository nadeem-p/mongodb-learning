# MongoDB learning module — how to run scripts and database effects

All scripts use the database **`mongo_learning`** and are **idempotent per collection**: each file drops or recreates its own demo collection(s) before inserting sample data, so you can re-run safely.

**Requirements:** MongoDB running locally (default `mongodb://127.0.0.1:27017`), `mongosh` on your PATH.

**General command** (from the `mongodb-learning` directory):

```bash
mongosh mongo_learning <path-to-script.js>
```

**From the repository root** (`MongoRevision`):

```bash
mongosh mongo_learning mongodb-learning/beginner/insert-one.js
```

**Run all scripts in order** (optional):

```bash
cd mongodb-learning
for f in beginner/*.js intermediate/*.js advanced/*.js; do echo ">>> $f"; mongosh mongo_learning "$f"; done
```

---

## Beginner (`beginner/`)

| File | Run command | Collections touched | What changes |
|------|----------------|----------------------|--------------|
| `insert-one.js` | `mongosh mongo_learning beginner/insert-one.js` | `demo_insert_one` | Drop → insert **1** document (`item`, `qty`, `tags`). |
| `insert-many.js` | `mongosh mongo_learning beginner/insert-many.js` | `demo_insert_many` | Drop → insert **3** documents (`sku`, `price`). |
| `find.js` | `mongosh mongo_learning beginner/find.js` | `demo_find` | Drop → insert 3 docs → **read-only** queries (`find` with filters). |
| `find-projection.js` | `mongosh mongo_learning beginner/find-projection.js` | `demo_find_projection` | Drop → insert 2 docs → **read-only** (`projection`). |
| `find-comparison-operators.js` | `mongosh mongo_learning beginner/find-comparison-operators.js` | `demo_find_comparison` | Drop → insert 4 docs → **read-only** (`$gt`, `$in`, etc.). |
| `find-logical-operators.js` | `mongosh mongo_learning beginner/find-logical-operators.js` | `demo_find_logical` | Drop → insert 3 docs → **read-only** (`$and`, `$or`, `$nor`). |
| `find-element-operators.js` | `mongosh mongo_learning beginner/find-element-operators.js` | `demo_find_element` | Drop → insert 3 docs → **read-only** (`$exists`, `$type`). |
| `find-array-operators.js` | `mongosh mongo_learning beginner/find-array-operators.js` | `demo_find_array` | Drop → insert 3 docs → **read-only** (`$all`, `$elemMatch`, `$size`). |
| `sort-limit-skip.js` | `mongosh mongo_learning beginner/sort-limit-skip.js` | `demo_sort_limit_skip` | Drop → insert 3 docs → **read-only** (cursor `sort` / `limit` / `skip`). |
| `update-one.js` | `mongosh mongo_learning beginner/update-one.js` | `demo_update_one` | Drop → insert 2 docs → **updates 1** doc (`$set`). |
| `update-many.js` | `mongosh mongo_learning beginner/update-many.js` | `demo_update_many` | Drop → insert 3 docs → **updates 2** docs matching `batch: "A"`. |
| `replace-one.js` | `mongosh mongo_learning beginner/replace-one.js` | `demo_replace_one` | Drop → insert 1 doc → **replaces** it (new shape; `_id` kept). |
| `upsert.js` | `mongosh mongo_learning beginner/upsert.js` | `demo_upsert` | Drop → **upsert** creates then increments `visits`. |
| `update-field-operators.js` | `mongosh mongo_learning beginner/update-field-operators.js` | `demo_update_field_ops` | Drop → insert 1 doc → **several `$set` / `$inc` / `$push` / `$addToSet` / `$rename`**. |
| `delete-one.js` | `mongosh mongo_learning beginner/delete-one.js` | `demo_delete_one` | Drop → insert 3 docs → **deletes 1** matching `{ v: 1 }`. |
| `delete-many.js` | `mongosh mongo_learning beginner/delete-many.js` | `demo_delete_many` | Drop → insert 3 docs → **deletes 2** with `t: "x"`. |

---

## Intermediate (`intermediate/`)

| File | Run command | Collections touched | What changes |
|------|----------------|----------------------|--------------|
| `indexes.js` | `mongosh mongo_learning intermediate/indexes.js` | `demo_indexes` | Drop → insert 3 docs → **creates 2 indexes**, prints explain, **drops** named index `user_year_desc`. |
| `aggregation-match-group.js` | `mongosh mongo_learning intermediate/aggregation-match-group.js` | `demo_agg_match_group` | Drop → insert 3 docs → **read-only** aggregation (`$match`, `$group`, `$sum`, `$avg`). |
| `aggregation-project-sort.js` | `mongosh mongo_learning intermediate/aggregation-project-sort.js` | `demo_agg_project` | Drop → insert 2 docs → **read-only** (`$addFields`, `$project`, `$sort`, `$limit`). |
| `aggregation-lookup.js` | `mongosh mongo_learning intermediate/aggregation-lookup.js` | `demo_agg_orders`, `demo_agg_customers` | Drop both → insert customers + orders → **read-only** `$lookup` join. |
| `aggregation-unwind-facet.js` | `mongosh mongo_learning intermediate/aggregation-unwind-facet.js` | `demo_agg_unwind_facet` | Drop → insert 2 docs → **read-only** (`$facet`, `$unwind`, `$sortByCount`). |
| `text-index-search.js` | `mongosh mongo_learning intermediate/text-index-search.js` | `demo_text_search` | Drop → insert 2 docs → **creates text index** on `title` + `body` → **read-only** `$text` search. |

---

## Advanced (`advanced/`)

| File | Run command | Collections touched | What changes |
|------|----------------|----------------------|--------------|
| `bulk-write.js` | `mongosh mongo_learning advanced/bulk-write.js` | `demo_bulk_write` | Drop → seed 2 docs → **bulkWrite**: 1 insert, 1 update, 1 delete. |
| `schema-validation.js` | `mongosh mongo_learning advanced/schema-validation.js` | `demo_schema_validation` | **Drops collection** → **createCollection** with JSON Schema validator → **1 valid insert**, **1 rejected** invalid insert. |
| `views.js` | `mongosh mongo_learning advanced/views.js` | `demo_views_source`, view `demo_views_active_only` | Drop view + source → insert 2 rows in source → **createView** → read view (read-only on view). |
| `transactions.js` | `mongosh mongo_learning advanced/transactions.js` | `demo_tx_a`, `demo_tx_b` | Drop both → insert starting balances → **standalone:** two sequential `$inc` updates (not transactional); **replica set:** would use `withTransaction`. |
| `change-streams.js` | `mongosh mongo_learning advanced/change-streams.js` | `demo_change_streams` | Drop → **standalone:** `watch()` errors — caught; **replica set:** would show one insert event. |
| `aggregation-graphLookup.js` | `mongosh mongo_learning advanced/aggregation-graphLookup.js` | `demo_graph` | Drop → insert 4 tree nodes → **read-only** `$graphLookup`. |

---

## Notes

1. **`sampledb`** (from earlier setup) is **not** used by these scripts; only **`mongo_learning`** is modified.
2. **Change streams** and **multi-document transactions** need a **replica set** (or sharded cluster). Homebrew standalone `mongod` scripts explain or degrade gracefully.
3. After **`text-index-search.js`**, collection `demo_text_search` has a **text index**; re-running the script drops the collection and recreates it.
4. **`schema-validation.js`** replaces the collection via `createCollection`; invalid documents fail with `Document failed validation`.
