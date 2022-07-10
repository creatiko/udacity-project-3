/* Global Variables */
const apiKey = 'e0b4bd8e97604b93f3c43309ce6be10f&units=imperial';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';

document.getElementById('generate').addEventListener('click', performAction);


function performAction(e){
    const newZip =  document.getElementById('zip').value;
    const feels =  document.getElementById('feelings').value;
  
    getWeatherData(baseURL,newZip,apiKey)
    
    .then(function(data){
      // Add data
      postData('/add', {temp: data.main.temp, feeling: feels, date: newDate});
      updateUI()
    })
  }

const getWeatherData = async (baseURL,newZip,apiKey) =>{
	const res = await fetch(baseURL+newZip+'&APPID='+apiKey)
	try{
		const data = await res.json();
		console.log(data)
		return data;
	}catch(error) {
        console.log("error", error);
		//handle the error
	}
}

const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      console.log(allData)
      // Write updated data to DOM elements
     
         let i = allData.length - 1
    
      console.log(allData.length)
      
      document.getElementById('entryHolder').style.display='block';
      document.getElementById('temp').innerHTML = Math.round(allData[i].temp)+ ' degrees';
      document.getElementById('content').innerHTML = allData[i].feeling;
      document.getElementById("date").innerHTML =allData[i].date;
  
    }catch(error){
      console.log("error", error);
    }
  }

  const postData = async ( url = '', data= {})=>{
	// console.log(data)
	const response = await fetch(url, {
		method: 'POST', // GET, POST, PUT, DELETE
		credentials: 'same-origin', // include, same-origin, omit
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data), // body data type must match "content-type"
	});
	
	try {
		const newData = await response.json();
		console.log(newData);
		return newData
	}catch(error) {
		console.log("error", error);
		//handle the error
	}
}