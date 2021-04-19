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
}

module.exports = Repository;
