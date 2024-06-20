const btnSearch = document.getElementById("btnSearch");
const searchBar = document.getElementById('searchInput');
const beachVariations = ['beaches', 'beach', 'beachs'];
const countryVariations = ['country', 'countries', 'countrys', 'countries', 'county'];
const templeVariations = ['temple', 'tempel', 'temples', 'tempels', 'templs'];

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

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const destinations = data.countries.find(item => item.name.toLowerCase == input);
            if(destinations){
                console.log(destinations);
            }else{
                console.log("No country found by the name: "+input);
            }
            
        })
}

function filterData(data, input){
    
}

function checkKeyPressed(evt) {
    if (evt.keyCode == "13") {
        searchDestinations();

    }
}

btnSearch.addEventListener('click', searchDestinations);
searchBar.addEventListener('keypress',checkKeyPressed,false);