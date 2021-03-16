const inputBox = document.querySelector('#inputBox');
const iframe = document.querySelector('#iframe')
let dataHolder1 = "" // this is used to hold which entry they selected

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


// for selecting a scenario
inputBox.addEventListener('keypress', (e)=>{
    if(e.key == 'Enter' && inputBox.value != 'play' && inputBox.value!= 'back' && inputBox.value != 'delete'){
        dataHolder1 = inputBox.value
        iframe.setAttribute('src',`https://creaters-alley.herokuapp.com/api/public/${inputBox.value}`)
    }
})
// for selecting Back
inputBox.addEventListener('keypress', (e)=>{
    if(e.key == 'Enter' && inputBox.value == 'back'){
        iframe.setAttribute('src',`https://creaters-alley.herokuapp.com/api/public/opening_page`)
    }
})
// for deleting the selected entry
inputBox.addEventListener('keypress', (e)=>{
    if(e.key == 'Enter' && inputBox.value == 'delete'){
        deleteEntry({scenario_name:dataHolder1});
        iframe.setAttribute('src',`https://creaters-alley.herokuapp.com/api/public/`)
    }
})