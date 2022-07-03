import React, { useState, useEffect } from "react";
import './App.css'
import moment from "moment";
import "moment/locale/pt-br";

function App() {
  const lang = 'pt_br'
  const units = 'metric'
  const apiKey = '5a381863b38a92047958619972b11522'
  const [weatherData, setWeatherData] = useState([{}])
  const [city, setCity] = useState("")
  const [clima, setClima] = useState('sunny')
  moment.locale('pt-br')
  const now = moment();

  // Pega a localização do navegador
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&lang=${lang}&units=${units}&appid=${apiKey}`).then(
        response => response.json()
      ).then(
        data => {
          setWeatherData(data)
          setCity("")
          setClima(data.weather[0].main)
        }
      )
    })
  }, [])

  // Busca a cidade pelo nome
  const getWeather = (event) => {
    if (event.key === "Enter") {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&units=${units}&appid=${apiKey}`).then(
        response => response.json()
      ).then(
        data => {
          setWeatherData(data)
          setCity("")
          setClima(data.weather[0].main)
        }
      )
    }
  }

  return (
    <div className="container-bg"
      style={{
        backgroundImage: `url(https://source.unsplash.com/all/1600x900?${clima}}})`,
        backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover", transition: "ease-out 2s"
      }}
      alt="................"
    >
      <div className="container">
        <div className="top">
          <input
            className="input"
            placeholder="Nome da Cidade"
            onChange={e => setCity(e.target.value)}
            value={city}
            onKeyPress={getWeather}
            required
          />
        </div>

        {typeof weatherData.main === 'undefined' ? (
          <div className="welcome">
            <p>Bem-vindo ao aplicativo de climaTempo!
              Digite uma cidade para obter o clima</p>
          </div>
        ) : (
          <div className="mid">
            <div className="desc">
              <div className="name">
                <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                <p>{now.format("LL")}</p>
              </div>
              <div className="temp">
                <h1>{weatherData.main.temp.toFixed()}ºc</h1>
              </div>
              <div className="description">
                <p>{weatherData.weather[0].description}</p>
              </div>
            </div>

            <div className="weatherIcon">
              {
                (() => {
                  switch (weatherData.weather[0].icon) {
                    case "01d": return (<div className="cd"></div>)
                    case "01n": return (<div className="cn"></div>)
                    case "02d": return (<div className="fcd"></div>)
                    case "02n": return (<div className="fcn"></div>)
                    case "03d": return (<div className="scd"></div>)
                    case "03n": return (<div className="scn"></div>)
                    case "04d": return (<div className="bcd"></div>)
                    case "04n": return (<div className="bcn"></div>)
                    case "09d": return (<div className="srd"></div>)
                    case "09n": return (<div className="srn"></div>)
                    case "10d": return (<div className="rd"></div>)
                    case "10n": return (<div className="rn"></div>)
                    case "11d": return (<div className="td"></div>)
                    case "11n": return (<div className="tn"></div>)
                    case "13d": return (<div className="sd"></div>)
                    case "13n": return (<div className="sn"></div>)
                    case "50d": return (<div className="md"></div>)
                    case "50n": return (<div className="mn"></div>)
                    default:
                      break;
                  }
                })()
              }
            </div>


            <div className="bottom">
              <div className="fLike">
                <span></span>
                <p>Sensação</p>
                <p>{Math.round(weatherData.main.feels_like)}ºc</p>
              </div>
              <div className="humidity">
                <span></span>
                <p>Umidade</p>
                <p>{weatherData.main.humidity} %</p>
              </div>
              <div className="wind">
                <span></span>
                <p>Vento</p>
                <p>{parseInt(weatherData.wind.speed.toFixed() * 3.6)} KM/H</p>
              </div>
            </div>
          </div>
        )}

        {weatherData.cod === "404" ? (
          <div className="msgError">
            <p>Cidade não encontrada</p>
          </div>
        ) : (
          <>
          </>
        )}

        <div className="copy">
          <p>By <a href="https://github.com/QuantumSystem" target="_blank" rel="noopener noreferrer" > Quantum System </a></p>
        </div>
      </div>
    </div>
  )
}

export default App;