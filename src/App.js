import { useEffect, useState } from 'react';
import bg from './assets/imgWeatherApp.png';
import Descriptions from './components/Descriptions';
import {getFormWetaherData} from './weatherService';


function App() {
  const [city, setCity] = useState('paris', 'metric');
  const [weather, setWeather] = useState()
  const [units, setUnits] = useState('metric');
  useEffect(() => {
    const fetchWeatherDate = async () => {
      const data = await getFormWetaherData(city, units);
      setWeather(data);
    };
    
    fetchWeatherDate();
  }, [units, city]);


  const handleUnits =  (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCesius = currentUnit === 'C';
    button.innerText = isCesius ? '°F' : '°C';
    setUnits(isCesius ? 'metric': 'imperial'); 
  }

  const enterKeyPresses = (e) => {
    if (e.keyCode === 13) {
      setCity(e.target.value);
      e.tager.blur();
    }
  }

  return (
    <div className='app' style={{
      backgroundImage: `url(${bg})`,
    }}>
      <div className="overlay">
        {weather && (
            <div className="container">
              <div className="section section_inputs">
                <input type="text" name="city" placeholder="Введите город..." onKeyDown={enterKeyPresses}/>
                <button onClick={(e) => handleUnits(e)}>°F</button>
              </div>
              <div className="section section_temperature">
                  <div className="icon">
                    <h3>{`${weather.name}, ${weather.country}`}</h3>
                    <img 
                      src ={weather.iconUrl} 
                      alt="weacther_icon"
                      />
                      <h3>{`${weather.description}`}</h3> 
                  </div>
                  <div className="temperature">
                    <h1>{`${weather.temp.toFixed()} °${
                      units === 'metric' ? "C" : "F"
                    }`}</h1>
                  </div>
              </div>
              <Descriptions weather={weather} units = {units}/>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default App;
