const createBtn = document.querySelector('#createNewBtn')    
const createBox = document.querySelector('#createBox')
const actionBox = document.querySelector('#action-input-box');
const scenarioBox = document.querySelector('#scenario-input-box');
const textContainer = document.querySelector('#text_container')
let dataHolder1 = "" // this is used to hold which scenario they selected
let dataholder2 = [] // this will be used to hold all the page objects that will get pushed once play is used
let dataholder3 = 1 // this will hold the current page id so that actions knows whats going on
let dataholder4 = 1 // this will be used to count the number of create pages made

// this is where all the helper functions are

// this is the helper function for deleting the entry
async function deleteEntry(data){
    const response = await fetch(`https://creaters-alley.herokuapp.com/api/public/`,{
    method: 'DELETE',
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
            scenarioBox.value = ''
        })
    }
})

// time to deal with actions
actionBox.addEventListener('keypress', async(e)=>{
    if(e.key == 'Enter'){
        if(dataholder2.map(x => x.action).includes(actionBox.value)){
            dataholder3 = dataholder2[(dataholder2.map(x => x.action)).indexOf(actionBox.value)].toPage
            console.log(dataholder3)
            fetch(`https://creaters-alley.herokuapp.com/api/page/${dataHolder1}/${dataholder3}`)
        .then((resp)=> resp.json())
        .then(function(data){
            console.log(data.rows[0])
            dataholder3 = data.rows[0].page_number
            textContainer.innerHTML = data.rows[0].page_text
            scenarioBox.value = ''
            dataholder2 = [];
            console.log(dataholder2)
        })
        .then(function(){
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
        })
        } else {
            window.alert("The action you picked does not work here.")
        }
    }
})

// toggle btn for the visibilty of the create menu
createBtn.addEventListener("click",()=>{
    if(createBox.style.zIndex == -1){
        createBox.style.zIndex = 2;
    } else {
        createBox.style.zIndex = -1;
    }
})
// the add page btn
document.querySelector('#pageBtn1').addEventListener('click', ()=>{
    dataholder4 ++;
    let newPage = document.createElement("div")
    newPage.classList.add("page")
    newPage.setAttribute("id",`newPage${dataholder4}`)

    let newPageNumberInput = document.createElement("INPUT")
    newPageNumberInput.setAttribute("type","number")
    newPageNumberInput.setAttribute("id",`pageNumber${dataholder4}`)
    newPageNumberInput.setAttribute("placeholder", "Page Number")
    newPage.appendChild(newPageNumberInput)

    let newPageTextInput = document.createElement("INPUT")
    newPageTextInput.setAttribute("type","text")
    newPageTextInput.setAttribute("placeholder","page text")
    newPageTextInput.setAttribute("id",`pageText${dataholder4}`)
    newPage.appendChild(newPageTextInput)

    let newActionBtn = document.createElement("button")
    newActionBtn.setAttribute("id",`actionBtn${dataholder4}`)
    newActionBtn.setAttribute("type","button")
    newActionBtn.innerHTML = "Add an action to current page"
    newPage.appendChild(newActionBtn)
    
    let newHR = document.createElement("HR")
    newPage.appendChild(newHR)
    
    let textDiv = document.createElement("div")
    textDiv.innerHTML = "Actions for This page"
    newPage.appendChild(textDiv)
    
    let newActionHolder = document.createElement("div")
    newActionHolder.classList.add("actions")
    newActionHolder.setAttribute("id",`actionHolder${dataholder4}`)
    newPage.appendChild(newActionHolder)
    // this will be the create new action for that page button
    newActionBtn.addEventListener('click', (e)=>{
        let targetNum = (e.target.id.slice(9))
        let targetActionHolder = document.querySelector(`#actionHolder${targetNum}`)

        let newActionTextInput = document.createElement("INPUT")
        newActionTextInput.setAttribute("type","text")
        newActionTextInput.setAttribute("placeholder","What the action is called")
        newActionTextInput.classList.add("inputActionText")
        targetActionHolder.appendChild(newActionTextInput)
        
        let newActionNumberInput = document.createElement("INPUT")
        newActionNumberInput.setAttribute("type","number")
        newActionNumberInput.setAttribute("placeholder","What page the action goes to")
        newActionNumberInput.classList.add("inputActionNumber")

        targetActionHolder.appendChild(newActionNumberInput)
        
    })
    document.querySelector('#createBox').appendChild(newPage)
})
document.querySelector('#actionBtn1').addEventListener('click', (e)=>{
    let targetNum = (e.target.id.slice(9))
    let targetActionHolder = document.querySelector(`#actionHolder${targetNum}`)

    let newActionTextInput = document.createElement("INPUT")
    newActionTextInput.setAttribute("type","text")
    newActionTextInput.setAttribute("placeholder","What the action is called")
    newActionTextInput.classList.add("inputActionText")
    targetActionHolder.appendChild(newActionTextInput)
    
    let newActionNumberInput = document.createElement("INPUT")
    newActionNumberInput.setAttribute("type","number")
    newActionNumberInput.setAttribute("placeholder","What page the action goes to")
    newActionNumberInput.classList.add("inputActionNumber")
    targetActionHolder.appendChild(newActionNumberInput)
    
})
// submit all the infromation that was put into EVERY input box
document.querySelector('#createSubmitBtn').addEventListener('click', async(e)=>{
    let dataHolder5 = 0
    let scenarioName = document.querySelector('#createScenarioName').value
    let scenarioText = document.querySelector('#createScenarioDescription').value
    let arrOfPage = (document.querySelectorAll(".page"))
    let arrOfActionInputNumber = document.querySelectorAll(`.inputActionNumber`)
    let arrOfActionInputText = document.querySelectorAll('.inputActionText')
        let data = {
            sqlCommand: `INSERT INTO scenarios (scenario_name,opening_text) VALUES ('${scenarioName}','${scenarioText}');` 
        }
    
    arrOfPage.forEach(element => {
        let pageNumber = (document.querySelector(`#pageNumber${element.id.slice(7)}`).value)
        let pageText = (document.querySelector(`#pageText${element.id.slice(7)}`).value)
        let pageCommand = `INSERT INTO pages (scenario_name,page_number,page_text) VALUES ('${scenarioName}',${pageNumber},'${pageText}');`
        data.sqlCommand += pageCommand
        
        let numOfActions = ((document.querySelector(`#actionHolder${element.id.slice(7)}`).childElementCount)/2)
        for(let i = 0; i < numOfActions; i++){
            let actionText = arrOfActionInputText[dataHolder5].value;
            let actionNumberToGoTo = arrOfActionInputNumber[dataHolder5].value
            let actionCommand = `INSERT INTO actions (actions_text,page_number,scenario_name,to_page_number) VALUES ('${actionText}',${pageNumber},'${scenarioName}',${actionNumberToGoTo});`
            data.sqlCommand += actionCommand;

            dataHolder5++
        }
    });



    data.sqlCommand = (data.sqlCommand.slice(0,-1))
    console.log(data)
    fetch('https://creaters-alley.herokuapp.com/api/public/',{
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
})
// on document load populate the main text box with stuff
window.addEventListener('DOMContentLoaded', async(e)=>{
    window.alert("The diffrent scenarios are listed in the blue box to select one type in its name in the input box at the top right. \n after you type in the name you can either play it by typing play in the same box or delete it by typing delete.")
    fetch('https://creaters-alley.herokuapp.com/api/public/opening_page')
    .then((resp)=> resp.json())
    .then(function(data){
        console.log(data)
        textContainer.innerHTML = data

    })
})
