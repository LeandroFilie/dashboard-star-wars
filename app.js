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
      naves.innerHTML = results[3].data.count;
    })
    .catch(response => {
      persons.innerHTML = 'X';
      moons.innerHTML = 'X';
      planets.innerHTML = 'X';
      naves.innerHTML = 'X';
    })
}

function swapiGet(param){
  return axios.get(`https://swapi.dev/api/${param}`);
}

async function getFilms(){
  const response = await swapiGet('films/');
  const dataFilms = response.data.results;

  const tableFilms = document.querySelector('#dataFilms tbody');

  const films = dataFilms.map(dataFilm => {
    const dateFilm = new Date(dataFilm.release_date)
    console.log();
    const item = `
      <tr>
        <td>${dataFilm.title}</td>
        <td>${dateFilm.getDate()}/${dateFilm.getMonth() + 1}/${dateFilm.getFullYear()}</td>
        <td>${dataFilm.director}</td>
        <td>${dataFilm.episode_id}</td>
      </tr>
    `

    return item;
  })

  tableFilms.innerHTML = films.join('');  
}

function pizzaGraphic(){
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);

  async function drawChart() {
    const response = await swapiGet('vehicles/');
    const vehiclesArray = response.data.results;
  
    const dataGraphicArray = [];
    dataGraphicArray.push(['Veículos', 'Passageiros']);

    vehiclesArray.forEach(vehicle => {
      dataGraphicArray.push([vehicle.name, Number(vehicle.passengers)])
    })
    document.getElementById('gaphicLoading').style.display = 'none';
    document.getElementById('piechart').style.display = 'block';
    var data = google.visualization.arrayToDataTable(dataGraphicArray);

    var options = {
      title: 'Maiores Veículos',
      legend: 'none'
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    
    chart.draw(data, options);
  }
}

getData();

getFilms();

pizzaGraphic();