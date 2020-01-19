class ReferenceRA {
    list() {
        return fetch('/api/refs/list').then(x => x.json());
    }
}

export default new ReferenceRA();