class DuplicateKeyError extends Error {
  constructor(message) {
    super(message);
    this.name = "DuplicateKeyError";
  }
}

class Repository {
  constructor() {
    this.records = {};
  }

  add(record) {
    const id = record._id;
    if (!id) {
      throw new TypeError("Record must have an _id");
    }
    if (this.records.hasOwnProperty(id)) {
      throw new DuplicateKeyError(`Record with id ${id} already exists.`);
    }
    this.records[id] = record;
  }

  size() {
    return Object.keys(this.records).length;
  }

  findById(id) {
    return this.records[id];
  }

  where(predicate) {
    return Object.values(this.records).filter(predicate);
  }
}

module.exports = Repository;
