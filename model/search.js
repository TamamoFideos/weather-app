const fs = require('fs');

const axios = require("axios");

class Search{
    history = [];
    dbPath = './db/database.json';
    constructor() {
        this.history = this.readDB();

    }

    get paramsMapBox(){
        return {
            'access_token' : process.env.MAPBOX_KEY,
            'limit': 5,
            'language' : 'es'
        }
    }

    get capitalizedHistory (){
        return this.history.map( place => {
            let words = place.split(' ');
            words = words.map( l => l[0].toUpperCase() + l.substring(1));

            return words.join(' ');
        })

    }

    get paramsOpenWeather(){
        return{
            'appid' : process.env.OPEN_WEATHER_KEY,
            'lang' : 'es',
            'units' : 'metric',
        }
    }

    async citySearch(place = ''){
        try{
            const axiosInstance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapBox
            })
            const response = await axiosInstance.get();

            return response.data.features.map( place => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1]
            }))
        }catch (err){
            return [];
        }


    }
    addHistory(place = ''){
        if(this.history.includes(place.toLocaleLowerCase())){
            return;
        }
        this.history.unshift(place.toLocaleLowerCase());
        this.saveDB();
    }

    async weatherPlaceSearch(lat, lon){
        try {
            const axiosInstance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsOpenWeather, lat, lon}
            })
            const response = await axiosInstance.get();
            const {weather,main} = response.data;
            return  {
                description : weather[0].description,
                temp        : main.temp,
                temp_min    : main.temp_min,
                temp_max    : main.temp_max
            }
        }catch (err){
            return{}
        }


    }
    saveDB (){
        const payload = {
            history : this.history
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    readDB (){
        if(!fs.existsSync(this.dbPath)){
            return [];
        }
        const data = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
        const object =  JSON.parse(data);
        return object.history;
    }



}

module.exports = Search;