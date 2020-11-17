const dbPromised = idb.open("Football Area ", 1, (upgradeDb) => {
    const articlesObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
    });
    articlesObjectStore.createIndex("name", "name", {
        unique: false
    });
});


const saveForLater = teams => {
    dbPromised
        .then(function (db) {
            const tx = db.transaction("teams", "readwrite");
            const store = tx.objectStore("teams");
            console.log(teams);
            store.put(teams); //ubah add jadi put
            return tx.complete;
        })
        .then(function () {
            console.log("Artikel berhasil di simpan.");
            M.toast({
                html: 'Your favorite Club has been saved',
                classes: 'rounded'
            });
        });
}

const getAll = () => {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                const tx = db.transaction("teams", "readonly");
                const store = tx.objectStore("teams");
                return store.getAll();
            })
            .then(function (teams) {
                resolve(teams);
            });
    });
}


const getById = id => {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                const tx = db.transaction("teams", "readonly");
                const store = tx.objectStore("teams");
                return store.get(parseInt(id));
            })
            .then(function (team) {
                resolve(team);
            });
    });
}


const deleteTeamFav = id => {
    dbPromised
        .then(function (db) {
            const tx = db.transaction("teams", "readwrite");
            const store = tx.objectStore("teams");
            store.delete(id);
            console.log(id);
            return tx.complete;
        }).then(function () {
            console.log("Team berhasil dihapus");
            M.toast({
                html: 'Success Delete Your favorite Club',
                classes: 'rounded'
            });
        });
}