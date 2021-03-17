const actionBox = document.querySelector('#inputBox');
const scenarioBox = document.querySelector('#scenario-input-box');
const textContainer = document.querySelector('#text_container')
let dataHolder1 = "" // this is used to hold which scenario they selected
let dataholder2 = [] // this will be used to hold all the page objects that will get pushed once play is used


// this is where all the helper functions are

// this is the helper function for deleting the entry
async function deleteEntry(data){
    const response = await fetch(`https://creaters-alley.herokuapp.com/api/public/`,{
    method: 'DELETE',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    return response.json()
}


// these are my main functions that will be directly called

// for selecting a scenario
scenarioBox.addEventListener('keypress', async(e)=>{
    if(e.key == 'Enter' && scenarioBox.value != 'play' && scenarioBox.value!= 'back' && scenarioBox.value != 'delete'){
        if(dataHolder1 == ""){
            fetch(`https://creaters-alley.herokuapp.com/api/public/${scenarioBox.value}`)
            .then((resp)=> resp.json())
            .then(function(data){
                console.log(data)
                textContainer.innerHTML = data[0].opening_text
                
                dataHolder1 = scenarioBox.value
                dataholder2 = []
                scenarioBox.value = ''
            })
        }
    }
})
// for selecting Back
scenarioBox.addEventListener('keypress', async(e)=>{
    if(e.key == 'Enter' && scenarioBox.value == 'back'){
        fetch(`https://creaters-alley.herokuapp.com/api/public/opening_page`)
        .then((resp)=> resp.json())
        .then(function(data){
            console.log(data)
            textContainer.innerHTML = data
            
            dataHolder1 = ''
            dataholder2 = []
            scenarioBox.value = ''
        })
    }
})
// for deleting the selected entry
scenarioBox.addEventListener('keypress', async(e)=>{
    if(e.key == 'Enter' && scenarioBox.value == 'delete'){
        deleteEntry({scenario_name:dataHolder1});
        fetch(`https://creaters-alley.herokuapp.com/api/public/opening_page`)
        .then((resp)=> resp.json())
        .then(function(data){
            console.log(data)
            textContainer.innerHTML = data
            
            dataHolder1 = ''
            dataholder2 = []
            scenarioBox.value = ''
        })
    }
})
// to start playing the scenario
scenarioBox.addEventListener('keypress', async(e)=>{
    if(e.key == 'Enter' && scenarioBox.value == 'play'){
        // TO  go to page 1 and start them on their journey
        fetch(`https://creaters-alley.herokuapp.com/api/page/${dataHolder1}/1`)
        .then((resp)=> resp.json())
        .then(function(data){
            console.log(data.rows[0])
            textContainer.innerHTML = data.rows[0].page_text
            scenarioBox.value = ''
        })
    }
})
// when playing the game the action entered here will point to dataholder 2 and if it contains the object with name of the action then it will go to the page the action describes
// to save all the actions to an array once play is called
scenarioBox.addEventListener('keypress', async(e)=>{
    if(e.key == 'Enter' && scenarioBox.value == 'play'){
        fetch(`https://creaters-alley.herokuapp.com/api/actions/${dataHolder1}`)
        .then((resp)=> resp.json())
        .then(function(data){
            
            //dataholder2.push()
            console.log(data)
            scenarioBox.value = ''
        })
    }
})

// on document load populate the main text box with stuff
window.addEventListener('DOMContentLoaded', async(e)=>{
    fetch('https://creaters-alley.herokuapp.com/api/public/opening_page')
    .then((resp)=> resp.json())
    .then(function(data){
        console.log(data)
        textContainer.innerHTML = data

    })
})