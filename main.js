let gameElems = document.querySelectorAll(".game");
let background = document.getElementById("background");
for(let gameElem of gameElems){
    gameElem.onmouseover = changeBack;
    gameElem.onmouseout = changeBackD;
}

function changeBack(event){
    let elem = event.target.closest(".game");
    if(elem.classList.contains("chess")){
        background.style.backgroundImage = "url('/images/backChess.jpg')";
        document.querySelector(".pyatnashki").style.opacity = "0";
        document.querySelector(".yoga").style.opacity = "0";
    }
    if(elem.classList.contains("pyatnashki")){
        background.style.backgroundImage = "url('/images/backPyatnashki.jpg')";
        elem.style.backgroundColor = "rgba(235, 229, 80, 0.8)";
        document.querySelector(".chess").style.opacity = "0";
        document.querySelector(".yoga").style.opacity = "0";
    }
    if(elem.classList.contains("yoga")){
        background.style.backgroundImage = "url('/images/backYoga.png')";
        document.querySelector(".pyatnashki").style.opacity = "0";
        document.querySelector(".chess").style.opacity = "0";
    }
}
function changeBackD(event){
    background.style.backgroundImage = "";
    let elem = event.target.closest(".game");
    if(elem.classList.contains("chess")){
        document.querySelector(".pyatnashki").style.opacity = "";
        document.querySelector(".yoga").style.opacity = "";
    }
    if(elem.classList.contains("pyatnashki")){
        document.querySelector(".pyatnashki").style.backgroundColor = "rgba(199, 230, 66)";
        document.querySelector(".chess").style.opacity = "";
        document.querySelector(".yoga").style.opacity = "";
    }
    if(elem.classList.contains("yoga")){
        document.querySelector(".pyatnashki").style.opacity = "";
        document.querySelector(".chess").style.opacity = "";
    }
}