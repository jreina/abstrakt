class ReferenceRA {
    list() {
        return fetch('/api/entries/refs').then(x => x.json());
    }
}

export default new ReferenceRA();