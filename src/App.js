import './App.css';

const API_KEY = '9f9d777d-be85-4c8f-ae74-7fc9319f33d1';
const API_URL = 'https://api.weather.yandex.ru/v2/informers?';

let latitude, longitude;
navigator.geolocation.getCurrentPosition(position => {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
}, error => {
  console.error(error)
})

function App() {
   const getWeather = () => {
    return fetch(`${API_URL}lat=${latitude}&lon=${longitude}`, {
      headers: {
        'X-Yandex-API-Key': API_KEY 
      }
    })
      .then(res => console.log (res));
  }



  return (
    <div className="App">
     <button onClick={getWeather}>click</button>
    </div>
  );
}

export default App;
