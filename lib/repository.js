class Repository {
  constructor() {
    this.records = {};
  }

  add(record) {
    this.records[record._id] = record;
  }

  size() {
    return Object.keys(this.records).length;
  }

  findById(id) {
    return this.records[id];
  }
}

module.exports = Repository;
