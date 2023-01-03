export default class Memo {
  constructor(content) {
    this.content = content;
    this.createdAt = new Date().toLocaleString();
    this.updatedAt = this.createdAt;
  }
  getMemo() {
    return {
      ...this,
    };
  }
  setMemo(content) {
    this.content = content;
    this.updatedAt = new Date().toLocaleString();
  }
}
