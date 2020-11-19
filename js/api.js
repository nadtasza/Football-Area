const api_token = "eeb1851372aa4319a5ec275525604472";
const base_url = "https://api.football-data.org/v2/";

const league_id = 2021;


const ENDPOINT_teams = `${base_url}competitions/${league_id}/teams`;
const ENDPOINT_standing = `${base_url}competitions/${league_id}/standings`;
const ENDPOINT_schedule = `${base_url}competitions/${league_id}/matches`;


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
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${crest}" />
                      </div>
                    <div class="card-content">
                      <span class="card-title truncate">${team.name}</span>
                      <p>${team.shortName}</p>
                    </div>
                    <div class="card-action">
                    <a href="./article.html?id=${team.id}">VIEW PROFILE</a>
                    </div>
                  </div>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("articles").innerHTML = articlesHTML;
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
    <div class="col s12 m6">
      <div class="card deep-purple lighten-5 z-depth-5">
            <div class="card-image  waves-effect waves-block waves-light style-image">
              <img src="${crest}" />
            </div>
          <div class="card-content" style="font-weight : bolder">
            <span class="card-title">
              <h5>${team.name}</h5>
              <h6>${team.shortName}</h6>
            </span>
          </div>
          <div class="card-action purple darken-3">
           <center><a class="waves-effect waves-light blue btn-large z-depth-5" href="./article.html?id=${team.id}">VIEW PROFILE</a></button></center>
                    </div>
      </div>
    </div>`;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("articles").innerHTML = articlesHTML;
    })
    .catch(error);
}


function getArticleById() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");
    //let scheduleHTML = "";
    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam).then((response) => {

        if (response) {
          response.json().then(function (data) {
            let crest = data.crestUrl;
            crest = crest.replace(/^http:\/\//i, 'https://');
            let articleHTML = `
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${crest}" />
              </div>
              <div class="card-content">
                <span class="card-title">${data.name}</span>
                
                <p>Venue :${data.venue}</p>
                      <p>Adress :${data.adress}</p>
                      <p>Phone :${data.phone}</p>
                      <p>Club Colors :${data.clubColors}</p>
                      <p>Website :${data.website}</p>
                      <p>Email :${data.email}</p>
                      <p>Last Update :${data.lastUpdated}</p>
                      
              </div>
            </div>
          `;
            data.squad.forEach(function (squad) {
              // Menyusun komponen card artikel secara dinamis
              articleHTML += `
      <div class="card z-depth-4">
          <div class="card-content">
          <h5>Player Info</h5>
                <table>
                    <tbody>
                        <tr>
                            <td>Name:</td>
                            <td id="plyName">${squad.name}</td>
                        </tr>
                        <tr>
                            <td>Date Of Birth:</td>
                            <td id="dateOfBirth">${squad.dateOfBirth}</td>
                        </tr>
                        <tr>
                            <td>Nationality:</td>
                            <td id="nationality">${squad.nationality}</td>
                        </tr>
                        <tr>
                            <td>Position:</td>
                            <td id="position">${squad.position}</td>
                        </tr>
                        <tr>
                            <td>Role:</td>
                            <td id="role">${squad.role}</td>
                        </tr>
                    </tbody>
                </table>
               
          </div>
      </div>  `;
            });





            /*${snarkdown(data.shortName)}*/
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = articleHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);

          });
        }
      });
    }
    fetch(base_url + "teams/" + idParam, {

        headers: {

          "X-Auth-Token": api_token


        },

      })
      .then(status)
      .then(json)
      .then(function (data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.

        // Menyusun komponen card artikel secara dinamis
        let articleHTML = `
          <div class="card indigo lighten-5 red-text text-red-accent-4 z-depth-5" style="font-weight : bolder;border-radius : 15%; ">
            <div class="card-image waves-effect waves-block waves-light">
              <img src="${data.crestUrl}" />
            </div>
            <div class="card-content">
              <span class="card-title"><h5>${data.name}</h5></span>
              <p>Short name : ${data.shortName}</p>
              <p>Venue : ${data.venue}</p>
              <p>Adress :${data.address}</p>
              <p>Phone : ${data.phone}</p>
              <p>Club Colors : ${data.clubColors}</p>
              <p>Email : ${data.email}</p>
              <p>Last Update : ${data.lastUpdated}</p>
            </div>       
          </div>
          <div class="card-action"> 
           <center><a class="waves-effect waves-light blue btn z-depth-5" href=" ${data.website}">Go to Official Website</a></button></center>
           </div>  

        `;
        data.squad.forEach(function (squad) {
          // Menyusun komponen card artikel secara dinamis
          articleHTML += `
  <div class="card z-depth-4">
      <div class="card-content amber lighten-2 black-text text-black" style="font-weight:bolder">
      <h5>Detail Player</h5>
            <table class="striped">
                <tbody>
                    <tr>
                        <td>Name:</td>
                        <td id="plyName">${squad.name}</td>
                    </tr>
                    <tr>
                        <td>Date Of Birth:</td>
                        <td id="dateOfBirth">${squad.dateOfBirth}</td>
                    </tr>
                    <tr>
                        <td>Nationality:</td>
                        <td id="nationality">${squad.nationality}</td>
                    </tr>
                    <tr>
                        <td>Position:</td>
                        <td id="position">${squad.position}</td>
                    </tr>
                    <tr>
                        <td>Role:</td>
                        <td id="role">${squad.role}</td>
                    </tr>
                </tbody>
            </table>
           
      </div>
  </div>  `;
        });
        // Sisipkan komponen card ke dalam elemen dengan id #content

        document.getElementById("body-content").innerHTML = articleHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}




function getSavedArticles() {
  getAll().then(function (teams) {
    console.log(teams);
    // Menyusun komponen card artikel secara dinamis
    var articlesHTML = "";
    teams.forEach(function (team) {


      articlesHTML += `
                  <div class="card deep-purple lighten-5 z-depth-5">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${team.crestUrl}" />
                      </div>
                    <div class="card-content style="font-weight : bolder">
                       <h5>${team.name}</h5>
                       <h6>${team.shortName}</h6>
                    </div>
                    <div class="card-action  purple darken-3">
           <center><a class="waves-effect waves-light blue btn-large z-depth-5" href="./article.html?id=${team.id}&saved=true">VIEW PROFILE</a></button></center>
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
  // let squadsHTML = "";
  getById(idParam).then(function (team) {
    let articleHTML = `
    <div class="card indigo lighten-5 red-text text-red-accent-4 z-depth-5" style="font-weight : bolder;border-radius : 15%; ">
      <div class="card-image waves-effect waves-block waves-light">
        <img src="${team.crestUrl}" />
      </div>
      <div class="card-content">
        <span class="card-title"><h5>${team.name}</h5></span>
        <p>Short Name :${team.shortName}</p>
        <p>Venue :${team.venue}</p>
                      <p>Adress :${team.adress}</p>
                      <p>Phone :${team.phone}</p>
                      <p>Club Colors :${team.clubColors}</p>
                      <p>Email :${team.email}</p>
                      <p>Last Update :${team.lastUpdated}</p>             
      </div>
    </div>
    <div class="card-action">
           <center><a class="waves-effect waves-light blue btn z-depth-5" href=" ${team.website}">Go to Official Website</a></button></center>
                    </div>
  `;
    team.squad.forEach(function (squad) {
      // Menyusun komponen card artikel secara dinamis
      articleHTML += `
<div class="card z-depth-4">
<div class="card-content amber lighten-2 black-text text-black" style="font-weight:bolder">
<h5>Player Info</h5>
      <table class="striped">
          <tbody>
              <tr>
                  <td>Name:</td>
                  <td id="plyName">${squad.name}</td>
              </tr>
              <tr>
                  <td>Date Of Birth:</td>
                  <td id="dateOfBirth">${squad.dateOfBirth}</td>
              </tr>
              <tr>
                  <td>Nationality:</td>
                  <td id="nationality">${squad.nationality}</td>
              </tr>
              <tr>
                  <td>Position:</td>
                  <td id="position">${squad.position}</td>
              </tr>
              <tr>
                  <td>Role:</td>
                  <td id="role">${squad.role}</td>
              </tr>
          </tbody>
      </table>
     
</div>
</div>  `;
    });

    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = articleHTML;
  });
}





//------------------fungsi untuk klasemen---------------------
function getAllStandings() {
  // check in caches
  if ("cachs" in window) {
    caches.match(ENDPOINT_standing).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          showStanding(data);
        });
      }
    });
  }

  fetch(ENDPOINT_standing, {

      headers: {

        "X-Auth-Token": api_token


      },

    })
    .then(status)
    .then(json)
    .then(function (data) {
      showStanding(data);
    })
    .catch(error);
}

function showStanding(data) {
  let standings = "";
  let standingElement = document.getElementById("standing");

  data.standings[0].table.forEach(function (standing) {
    standings += `
                <tr>
                    <td>${standing.position}</td>
                    <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                    <td>${standing.team.name}</td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.points}</td>
                    <td>${standing.goalsFor}</td>
                    <td>${standing.goalsAgainst}</td>
                    <td>${standing.goalDifference}</td>
                </tr>
        `;
  });

  standingElement.innerHTML = `
              <table class="striped responsive-table centered highlight black text-red red-text z-depth-5">
                  <thead>
                      <tr>
                          <th>Position</th>
                          <th>Logo</th>
                          <th>Team Name</th>
                          <th>Won</th>
                          <th>Draw</th>
                          <th>Lost</th>
                          <th>Points</th>
                          <th>Goals For</th>
                          <th>Goals Against</th>
                          <th>Goal Difference</th>
                      </tr>
                   </thead>
                  <tbody id="standing" class=" grey darken-2 text-white white-text" style="font-weight:bolder">
                      ${standings}
                  </tbody>
              </table>
  `;
}


//-------------------FUNGSI UNTUK BUAT SCHEDULE--------------
function getAllSchedule() {
  // check in caches
  if ("cachs" in window) {
    caches.match(ENDPOINT_schedule).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          showSchedule(data);
        });
      }
    });
  }

  fetch(ENDPOINT_schedule, {

      headers: {

        "X-Auth-Token": api_token


      },

    })
    .then(status)
    .then(json)
    .then(function (data) {
      showSchedule(data);
    })
    .catch(error);
}

function showSchedule(data) {
  let matches = "";
  let scheduleElement = document.getElementById("schedule");

  data.matches.forEach(function (match) {
    startDate = `${match.season.startDate}`;
    endDate = `${match.season.endDate}`;
    currentday = `${match.season.currentMatchday}`;
    matches += `
                    
                  <tr style="font-weight :bolder;color:red;">
                    <td>${match.utcDate}</td>
                    <td>${match.homeTeam.name}</td>
                    <td>${match.awayTeam.name}</td>
                    <td>${match.matchday}</td>
                    <td>${match.status}</td>
                    <td>${match.score.fullTime.homeTeam} - ${match.score.fullTime.awayTeam}</td>
                  </tr>
                    
                    
                
        `;
  });


  scheduleElement.innerHTML = `
  
  <table class=" responsive-table centered red text-white white-text z-depth-5" style="margin-bottom: 30px;font-weight:bolder">
  <tr>
  <td>Start day : ${startDate}</td>
  <td>End day : ${endDate}</td>
  <td>Current Matchday : ${currentday}</td>
  </tr>
  </table>
  
        
              
              
              <table class="striped responsive-table centered highlight  lime lighten-3 z-depth-5">
                  <thead>
                         <tr>
                          <th>Date</th>
                          <th>Home Team</th>
                          <th>Away Team</th>
                          <th>Day</th>
                          <th>Status</th>
                          <th>Score</th>
                        </tr>
                     
                   </thead>
                  <tbody id="schedule">
                      ${matches}
                  </tbody>
              </table>
              
              
  `;
}

/*<div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">*/