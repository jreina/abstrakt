class EntryRA {
  start(id: string) {
    return fetch(`/api/entries/start/${id}`, { method: "POST" });
  }
}

export default new EntryRA();
