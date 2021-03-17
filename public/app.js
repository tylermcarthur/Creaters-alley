const actionBox = document.querySelector('#action-input-box');
const scenarioBox = document.querySelector('#scenario-input-box');
const textContainer = document.querySelector('#text_container')
let dataHolder1 = "" // this is used to hold which scenario they selected
let dataholder2 = [] // this will be used to hold all the page objects that will get pushed once play is used
let dataholder3 = 1 // this will hold the current page id so that actions knows whats going on

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
        fetch(`https://creaters-alley.herokuapp.com/api/page/${dataHolder1}/${dataholder3}`)
        .then((resp)=> resp.json())
        .then(function(data){
            console.log(data.rows[0])
            dataholder3 = data.rows[0].page_number
            textContainer.innerHTML = data.rows[0].page_text
            scenarioBox.value = ''
        })
    }
})
// when playing the game the action entered here will point to dataholder 2 and if it contains the object with name of the action then it will go to the page the action describes
// to save all the actions to an array once play is called
scenarioBox.addEventListener('keypress', async(e)=>{
    if(e.key == 'Enter' && scenarioBox.value == 'play'){
        fetch(`https://creaters-alley.herokuapp.com/api/actions/${dataHolder1}/${dataholder3}`)
        .then((resp)=> resp.json())
        .then(function(data){
            for(let i = 0; i < data.rows.length; i++){
                dataholder2.push(
                    {
                        action:data.rows[i].actions_text,
                        toPage:data.rows[i].to_page_number
                    }
                )

            }
            console.log(dataholder2)
            scenarioBox.value = ''
        })
    }
})

// time to deal with actions
actionBox.addEventListener('keypress', async(e)=>{
    if(e.key == 'Enter'){
        if(dataholder2.map(x => x.action).includes(actionBox.value)){
            dataholder2 = dataholder2[(dataholder2.map(x => x.action)).indexOf(actionBox.value)].toPage
            console.log(dataholder3)
            fetch(`https://creaters-alley.herokuapp.com/api/page/${dataHolder1}/${dataholder3}`)
        .then((resp)=> resp.json())
        .then(function(data){
            console.log(data.rows[0])
            dataholder3 = data.rows[0].page_number
            textContainer.innerHTML = data.rows[0].page_text
            scenarioBox.value = ''
            dataholder3 = [];
            console.log(dataholder3)
        })
        } else {
            window.alert("The action you picked does not work here.")
        }
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