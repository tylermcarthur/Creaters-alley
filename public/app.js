const inputBox = document.querySelector('#inputBox');
const iframe = document.querySelector('#iframe')

// for selecting a scenario
inputBox.addEventListener('keypress', (e)=>{
    if(e.key == 'Enter' && inputBox.value.toLowerCase != 'play' && inputBox.value.toLowerCase != 'back' && inputBox.value.toLowerCase != 'delete'){
        iframe.setAttribute('src',`https://creaters-alley.herokuapp.com/api/public/${inputBox.value}`)
    }
})
// for selecting Back
inputBox.addEventListener('keypress', (e)=>{
    if(e.key == 'Enter' && inputBox.value.toLowerCase == 'back'){
        iframe.setAttribute('src',`https://creaters-alley.herokuapp.com/api/public/`)
    }
})