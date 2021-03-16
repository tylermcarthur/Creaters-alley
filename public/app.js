const inputBox = document.querySelector('#inputBox');
const iframe = document.querySelector('#iframe')

inputBox.addEventListener('keydown', (e)=>{
    if(e.code == 'Enter'){
        iframe.setAttribute('src',`https://creaters-alley.herokuapp.com/api/public/${inputBox.value}`)
    }
})