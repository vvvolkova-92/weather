import './App.css';
import React, {useState} from 'react';
const API_KEY = '3e414d62e193348a63663b62133b945d';
const API_URL = 'http://api.openweathermap.org/data/2.5/'

// let latitude, longitude;
// navigator.geolocation.getCurrentPosition(position => {
//   latitude = position.coords.latitude;
//   longitude = position.coords.longitude;
// }, error => {
//   console.error(error)
// })

function App() {
  const [value, setValue] = useState('');
  const [weather, setWeather] = useState('');
  const [city, setCity] = useState('');
  let weatherHtml;

   const getWeather = (evt) => {

    if (evt.key === 'Enter') {
      fetch(`${API_URL}/find?q=${value}&type=like&APPID=${API_KEY}&lang=ru&units=metric`)
        .then(res => res.json())
        //для городов рф
        .then(res => {
          const result = res.list.find(city => {return city.sys.country === 'RU'});
          setCity(value.toUpperCase());
          setWeather(result);
          setValue('');
          console.log(result);
        })
        .catch(err => {console.log(err)})
    }
  }

  if (weather === '') weatherHtml = '';
  else if (weather === undefined) weatherHtml = (<div className="weather">
    <div className="country">
      <h1>Ошибка</h1>
      <h3>Возможно такой город еще не построили или вы ошиблись при вводе названия</h3>
    </div>
    </div>)
  else weatherHtml = (<div className="weather">
    <h1 className="country">{city}</h1>
    <div className="temp">{Math.floor(weather.main.temp)}&deg;C</div>
    <h3 className="feels_like">по ощущениям {Math.floor(weather.main.feels_like)}&deg;С</h3>
    <h2 className="description">{weather.weather[0].description}</h2>
  </div>)
  let classNameApp;
  //TODO заменить на свитч
  if (weather === '' || weather === undefined) classNameApp = 'App';
  else switch (weather.weather[0].main) {
    case ('Clouds' || 'Drizzle'):
      classNameApp = 'App app__cloud'
      break;
    case 'Clear':
      classNameApp = 'App app__clear'
      break;  
    case 'Thunderstorm':
      classNameApp = 'App app__storm'
      break; 
    case 'Rain':
      classNameApp = 'App app__rain'
      break;   
    case 'Snow':
      classNameApp = 'App app__snow'
      break; 
  }
  return (
    <div className={classNameApp}>
      <main className = "container">
        <input 
        className= "input"
        type = "text"
        placeholder = "Введите город и нажмите Enter..."
        value = {value}
        onChange = {evt => {
          setValue(evt.target.value)
        }}
        onKeyPress = {getWeather}
        />
        {weatherHtml}
      </main>
    </div>
  );
}

export default App;
