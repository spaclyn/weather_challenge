import React, { Component } from "react";
import { getPositionOfLineAndCharacter } from "typescript";

type WeatherStuff = {
    lon: number,
    lat: number,
    temp: number,
    maxTemp: number,
    minTemp: number
}

class Weather extends Component <{}, WeatherStuff> {
    constructor(props: {}){
        super(props)
        this.state = {
            lon: 0,
            lat: 0,
            temp: 0,
            maxTemp: 0,
            minTemp: 0
        }
        this.weatherGet = this.weatherGet.bind(this)
        this.locationGet = this.locationGet.bind(this)
    }

    async weatherGet() : Promise<void> {
        let lon = this.state.lon
        let lat = this.state.lat
        let apiKey = '64ed35eee79544f4599ab013b7284012'

        try{
            let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
            let json = await res.json()
            console.log(json)

            console.log(Math.round(json.main.temp))

            this.setState({
                maxTemp: json.main.temp_max,
                minTemp: json.main.temp_min,
                temp: json.main.temp
            })
        } catch (err) {
            console.log(err);
        }
    }

    locationGet(): void{
        navigator.geolocation.getCurrentPosition(position => {
            console.log("Lon is", position.coords.longitude)
            console.log("Lat is", position.coords.latitude)

            this.setState({
                lon: position.coords.longitude,
                lat: position.coords.latitude
            })
        })
    }

    componentDidMount() {
        this.locationGet()
    }

    render() {
        return(
            <div>
                <h1>Temperature: {this.state.temp}</h1>
                <h1>High(s): {this.state.maxTemp}</h1>
                <h1>Lows(s): {this.state.minTemp}</h1>
                <button onClick={this.weatherGet}>Local Weather Forcast is...?</button>
            </div>
        )
    }
}

export default Weather