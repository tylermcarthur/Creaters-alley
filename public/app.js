const actionBox = document.querySelector('#inputBox');
const scenarioBox = document.querySelector('#scenario-input-box');
const textContainer = document.querySelector('#text_container')
let dataHolder1 = '' // this is used to hold which scenario they selected
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
scenarioBox.addEventListener('keypress', (e)=>{
    if(e.key == 'Enter' && inputBox.value != 'play' && inputBox.value!= 'back' && inputBox.value != 'delete'){
        if(dataHolder1 == ""){
            iframe.setAttribute('src',`https://creaters-alley.herokuapp.com/api/public/${inputBox.value}`)
        }
        dataHolder1 = inputBox.value
        inputBox.value = ''
    }
})
// for selecting Back
scenarioBox.addEventListener('keypress', (e)=>{
    if(e.key == 'Enter' && inputBox.value == 'back'){
        iframe.setAttribute('src',`https://creaters-alley.herokuapp.com/api/public/opening_page`)
        dataHolder1 = ''
        inputBox.value = ''
    }
})
// for deleting the selected entry
scenarioBox.addEventListener('keypress', (e)=>{
    if(e.key == 'Enter' && inputBox.value == 'delete'){
        deleteEntry({scenario_name:dataHolder1});
        iframe.setAttribute('src',`https://creaters-alley.herokuapp.com/api/public/opening_page`)
        
        dataHolder1 = ''
        inputBox.value = ''
    }
})
// to start playing the scenario
scenarioBox.addEventListener('keypress', (e)=>{
    if(e.key == 'Enter' && inputBox.value == 'play'){
        iframe.setAttribute('src',`https://creaters-alley.herokuapp.com/api/page/${dataHolder1}/1`)
        inputBox.value = ''
    }
})

// on document load populate the main text box with stuff
textContainer.addEventListener('DOMContentLoaded', async (e)=>{
    const response = await fetch('https://creaters-alley.herokuapp.com/api/public/opening_page',{
        method: 'GET',
        mode: 'cors',
    })
    textContainer.innerHTML = response
})