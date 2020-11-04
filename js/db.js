let dbPromised = idb.open("Football Area ", 1, function (upgradeDb) {
    let articlesObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
    });
    articlesObjectStore.createIndex("name", "name", {
        unique: false
    });
});


function saveForLater(teams) {
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

function getAll() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("teams", "readonly");
                var store = tx.objectStore("teams");
                return store.getAll();
            })
            .then(function (teams) {
                resolve(teams);
            });
    });
}


function getById(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("teams", "readonly");
                var store = tx.objectStore("teams");
                return store.get(parseInt(id));
            })
            .then(function (team) {
                resolve(team);
            });
    });
}


function deleteTeamFav(id) {
    dbPromised
        .then(function (db) {
            var tx = db.transaction("teams", "readwrite");
            var store = tx.objectStore("teams");
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