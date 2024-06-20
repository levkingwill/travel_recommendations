const btnSearch = document.getElementById("btnSearch");
const searchBar = document.getElementById('searchInput');
const btnClear = document.getElementById('btnClear');
const beachVariations = ['beaches', 'beach', 'beachs'];
const countryVariations = ['country', 'countries', 'countrys', 'countries', 'county'];
const templeVariations = ['temple', 'tempel', 'temples', 'tempels', 'templs'];
const ausVariations = ['austrailia', 'aus', 'austria','australia'];
const japVariations = ['japan','japn','jap'];
const brazilVariations = ['bra','brazil', 'brazl','brazel'];

function searchDestinations(){
    input = document.getElementById('searchInput').value.toLowerCase();

    if(templeVariations.find(item => item == input)){
        input = 'temples';
    }else if(countryVariations.find(item => item == input)){
        input = 'countries';
    }
    else if(beachVariations.find(item => item == input)){
        input = 'beaches';
    }
    else if(ausVariations.find(item => item == input)){
        input = 'australia';
    }
    else if(japVariations.find(item => item == input)){
        input = 'japan';
    }
    else if(brazilVariations.find(item => item == input)){
        input = 'brazil';
    }

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => filterData(data, input))
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while fetching data.');
          });
}

function filterData(data, input){
    switchOutput=0;
    output='Nothing Found';
    switch(input){
        case 'temples':
            output = data.temples;
            switchOutput=2;
        break;
        case 'countries':
            output = data.countries;
            switchOutput=1;
        break;
        case 'beaches':
            output = data.beaches;
            switchOutput=2;
        break;
        default:
            output = data.countries;
            output = getCountrySpecificData(output, input);
            console.log(output);
            if(output != 'Nothing Found'){
                switchOutput = 3;
            }
            break;
    }
    generateOutput(output, switchOutput);
}

function getCountrySpecificData(countries, input){
    for(const country of countries){
        console.log(country.name);
        if(country.name.toLowerCase() == input){
            output = country;
            break;
        }else{
            output = 'Nothing Found';
        }
    }
    console.log(output);
    return output;

}

function generateOutput(output, switchOutput){
    outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '<h2>Search Results</h2>';
    if(switchOutput==2){
        for(const item of output){
            outputDiv.innerHTML += '<h3>'+item.name+'</h3>'
            outputDiv.innerHTML += '<img src="'+item.imageUrl+'" width = "400px">';
            outputDiv.innerHTML += '<p>'+item.description+'</p>'
            outputDiv.innerHTML += '<br>';
        }
    }else if(switchOutput == 1){
        for(const country of output){
            outputDiv.innerHTML += '<h3>'+country.name+'</h3>'

            outputDiv = buildCityHTML(country,outputDiv);
        }
    }else if(switchOutput == 3){
        outputDiv = buildCityHTML(output, outputDiv);
    }
    else{
        outputDiv.innerHTML = '<h3>'+output+'</h3>';
    }

}

function buildCityHTML(country, outputDiv){
    possibleTimeZones = ['','America','Asia','Africa'];
    cityTime = '';
    for(const city of country.cities){
        possibleTimeZones[0] = country.name
        locationString = country.name.replaceAll(' ','_');
        if((cityTime=findTimeZone(locationString)) == 'No Time Zone Found'){
            for(zone in possibleTimeZones){
                locationString = (possibleTimeZones[zone]+'/'+(city.name.split(',')[0])).replaceAll(' ','_');
                cityTime=findTimeZone(locationString);
                if(cityTime != 'No Time Zone Found'){
                    break;
                }
            }
        }

        outputDiv.innerHTML += '<h4>'+city.name+'</h4>'
        outputDiv.innerHTML += '<h5>Current Time: '+cityTime+'</h5>'
        outputDiv.innerHTML += '<img src="'+city.imageUrl+'" width = "400px">';
        outputDiv.innerHTML += '<p>'+city.description+'</p>'
        outputDiv.innerHTML += '<br>';
    }
    return outputDiv
}

function findTimeZone(timeZone){
    cityLocalTime = '';
    try{
        const options = {timeZone: timeZone, hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric'};
        cityLocalTime = new Date().toLocaleTimeString('en-US', options);
    }catch(error){
        //console.log(error); //clean up logging
        cityLocalTime = 'No Time Zone Found';
    }
    return cityLocalTime;
}

function checkKeyPressed(evt) {
    if (evt.keyCode == "13") {
        searchDestinations();

    }
}

function clearOutput(){
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML="";
    searchBar.value = "";
}



btnSearch.addEventListener('click', searchDestinations);
searchBar.addEventListener('keypress',checkKeyPressed,false);
btnClear.addEventListener('click', clearOutput);