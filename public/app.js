const inputBox = document.querySelector('#inputBox');
const iframe = document.querySelector('#iframe')

inputBox.addEventListener('keypress', (e)=>{
    if(e.key == 'Enter'){
        iframe.setAttribute('src',`https://creaters-alley.herokuapp.com/api/public/${inputBox.value}`)
    }
})