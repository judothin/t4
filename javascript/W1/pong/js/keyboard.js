//array of keys
var keys = [];

//keydown code
document.addEventListener(`keydown`, (e)=>{
    keys[e.key.toLowerCase()]=true;
    //console.log(e.key)
})


//keyup code
document.addEventListener(`keyup`, (e)=>{
    keys[e.key.toLowerCase()]=false;
})
