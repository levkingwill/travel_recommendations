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
        .then(data => filterData(data, input))
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while fetching data.');
          });
}

function filterData(data, input){
    switchOutput=0;
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
            output = 'Nothing found';
    }
    console.log(output, switchOutput);
    generateOutput(output, switchOutput);
}

function generateOutput(output, switchOutput){
    const outputDiv = document.getElementById('output');
    if(switchOutput==2){
        outputDiv.innerHTML = '<h2>Search Results</h2>';
        for(const item of output){
            console.log(item.name);
            outputDiv.innerHTML += '<h3>'+item.name+'</h3>'
            outputDiv.innerHTML += '<img src="'+item.imageUrl+'" width = "400px">';
            outputDiv.innerHTML += '<p>'+item.description+'</p>'
            outputDiv.innerHTML += '<br>';
        }
    }else if(switchOutput == 1){
        
    }
    else{
        outputDiv.innerHTML = '<h3>output</h3>';
    }

}

function checkKeyPressed(evt) {
    if (evt.keyCode == "13") {
        searchDestinations();

    }
}

btnSearch.addEventListener('click', searchDestinations);
searchBar.addEventListener('keypress',checkKeyPressed,false);