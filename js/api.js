const api_token = "eeb1851372aa4319a5ec275525604472";
const base_url = "https://api.football-data.org/v2/";

const league_id = 2021;


const ENDPOINT_teams = `${base_url}competitions/${league_id}/teams`;

/*const fetchAPI = url => {
  return fetch(url, {
    headers: {
      'X-Auth-Token': api_token
    }
  })
}*/
// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getArticles() {
  if ("caches" in window) {
    caches.match(ENDPOINT_teams).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          let articlesHTML = "";
          data.teams.forEach((team) => {
            let crest = team.crestUrl;
            crest = crest.replace(/^http:\/\//i, 'https://');
            articlesHTML += `
                  <div class="card">
                    <a href="./article.html?id=${team.id}">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${crest}" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${team.name}</span>
                      <p>${team.shortName}</p>
                    </div>
                  </div>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("teams").innerHTML = articlesHTML;
        });
      }
    });
  }



  fetch(base_url + "competitions/" + league_id + "/teams", {
      headers: {
        'X-Auth-Token': api_token
      },
    })
    .then(status)
    .then(json)
    .then(function (data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun komponen card artikel secara dinamis
      let articlesHTML = "";
      data.teams.forEach((team) => {
        let crest = team.crestUrl;
        crest = crest.replace(/^http:\/\//i, 'https://');
        articlesHTML += `
              <div class="card">
                <a href="./article.html?id=${team.id}">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${crest}" />
                  </div>
                </a>
                <div class="card-content">
                  <span class="card-title truncate">${team.name}</span>
                  <p>${team.shortName}</p>
                </div>
              </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("teams").innerHTML = articlesHTML;
    })
    .catch(error);
}


function getArticleById() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");
    if ("caches" in window) {
      caches.match(base_url + "team/" + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            let crest = team.crestUrl;
            crest = crest.replace(/^http:\/\//i, 'https://');
            let articleHTML = `
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${data.crest}" />
              </div>
              <div class="card-content">
                <span class="card-title">${data.name}</span>
                ${snarkdown(data.venue)}
              </div>
            </div>
          `;
            // Sisipkan komponen card ke dalam elemen dengan id #content

            document.getElementById("body-content").innerHTML = articleHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }
    return fetch(base_url + "teams/" + idParam, {

        headers: {

          "X-Auth-Token": api_token


        },

      })
      .then(status)
      .then(json)
      .then(function (data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log(data);
        // Menyusun komponen card artikel secara dinamis
        let articleHTML = `
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img src="${data.crestUrl}" />
            </div>
            <div class="card-content">
              <span class="card-title">${data.name}</span>
              ${snarkdown(data.venue)}
            </div>
          </div>
        `;
        // Sisipkan komponen card ke dalam elemen dengan id #content

        document.getElementById("body-content").innerHTML = articleHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}

//Catatan : awalnya <a href="./article.html?id=${article.ID}"> menjadi  <a href="./article.html?id=${article.ID}&saved=true">


function getSavedArticles() {
  getAll().then(function (teams) {
    console.log(teams);
    // Menyusun komponen card artikel secara dinamis
    var articlesHTML = "";
    teams.forEach(function (team) {
      /*let crest = team.crestUrl;
      crest = crest.replace(/^http:\/\//i, 'https://');*/
      /* let venue = teams.venue.substring(0, 100);*/
      articlesHTML += `
                  <div class="card">
                   <a href="./article.html?id=${team.id}&saved=true">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${team.crestUrl}" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${team.name}</span>
                      <p>${team.venue}</p>
                    </div>
                  </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = articlesHTML;
  });
}

function getSavedArticleById() {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");

  getById(idParam).then(function (team) {
    /*let crest = team.crestUrl;
    crest = crest.replace(/^http:\/\//i, 'https://');*/
    //articleHTML = '';
    let articleHTML = `
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img src="${team.crestUrl}" />
      </div>
      <div class="card-content">
        <span class="card-title">${team.name}</span>
        ${snarkdown(team.venue)}
      </div>
    </div>
  `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = articleHTML;
  });
}