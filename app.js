const persons = document.getElementById('persons');
const moons = document.getElementById('moons');
const planets = document.getElementById('planets');
const naves = document.getElementById('naves');

function getData(){
  Promise.all([swapiGet('people/'), swapiGet('starships/'), swapiGet('planets/'), swapiGet('vehicles/')])
  .then(results => {
    persons.innerHTML = results[0].data.count;
    moons.innerHTML = results[1].data.count;
    planets.innerHTML = results[2].data.count;
    naves.innerHTML = results[3].data.count
  })
}

function swapiGet(param){
  return axios.get(`https://swapi.dev/api/${param}`);
}

getData();