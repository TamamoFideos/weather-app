require('dotenv').config();

//-------------------------------------------------------------- REQUIRES ------------------------------------------------------------------------------
const {
    inquirerMenu,
    pause,
    readInput,
    selectPlace}  = require('./helpers/inquirer')


//-------------------------------------------------------------- MODEL---------------------------------------------------------------------------------
const Search = require('./model/search');




const main = async() => {
    let option = '';
    const search = new Search();

    do{
        option = await  inquirerMenu();
        switch (option){
            case '1':
                const input = await readInput("Ingrese el lugar a buscar:");
                console.log(input);
                //Obtain the array places by the MapBox API
                const places = await search.citySearch(input);
                //Get the selected id of the results found
                const id = await selectPlace(places);

                if(id === '0'){
                    continue;
                }
                const place = places.find( p => p.id === id);
                search.addHistory(place.name);
                //Get the weather data by the lat and lon
                const weather = await search.weatherPlaceSearch(place.lat, place.lng);

                console.log(`\n ********* ${'Información de la ciudad'.yellow} ********* \n`);
                console.log(`${'Ciudad'.red.bold}: ${place.name}`);
                console.log(`${'Latitud'.blue.bold}: ${place.lat}`);
                console.log(`${'Longitud'.blue.bold}: ${place.lng}`);
                console.log(`${'Temperatura'.red.bold}: ${weather.temp}${'°C'.yellow}`);
                console.log(`${'Max'.cyan.bold}: ${weather.temp_max}${'°C'.yellow}`);
                console.log(`${'Min'.cyan.bold}: ${weather.temp_min}${'°C'.yellow}`);
                console.log(`${'Description'.cyan.bold}: ${weather.description}`);

                break;
            case '2':
                search.capitalizedHistory.forEach( (name, i) => {
                    const idx = `${(i+1)}.`.green
                    console.log(`${idx} ${name}`)
                })
                break;
            case '3':

                break;
            case '4':

                break;
        }
        await pause();

    }while(option !== '0')
}

main();


