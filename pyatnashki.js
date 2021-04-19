
let checkNewActive = false;

let ranNumbers = new Set();
let squares = document.querySelectorAll(".cell");

while(ranNumbers.size<15){ ranNumbers.add(Math.round(Math.random()*14+1)); }

let index=0;
for(let elem of ranNumbers){
    Array.from(squares)[index].firstChild.firstChild.innerHTML = elem;
    index++;
}

for(let elem of Array.from(squares)){
    elem.onclick = handleClick;
}

let heightCell;
let widthCell;

let activeElem, activeElem2;
function handleClick(event){
    let elem = event.target;
    if(elem.className==="cell" && elem.firstChild) return;
    if(elem.className==="cell" && !elem.firstChild){
        activeElem2 = activeElem;
        let difference = elem.getAttribute("id")-activeElem2.parentElement.getAttribute("id");
        if(difference==1||difference==-1||difference==-4||difference==4){
            activeElem2.style.height = "95%";
            activeElem2.style.width = "95%";
        }else return;
        heightCell = document.getElementsByClassName("cell")[0].clientHeight;
        widthCell = document.getElementsByClassName("cell")[0].clientWidth;
        // alert(heightCell + " " + widthCell);
        elem.prepend(activeElem2);
        
        switch(difference){
            case -1:              
                activeElem2.style.transform = `translate(${widthCell}px, 0px)`; 
                break;
            case 1:
                activeElem2.style.transform = `translate(${-widthCell}px, 0px)`;
                break;
            case 4:
                activeElem2.style.transform = `translate(0px, ${-heightCell}px)`;
                break;
            case -4:
                activeElem2.style.transform = `translate(0px, ${heightCell}px)`;
                break;
            }
        setTimeout(function(){
            switch(difference){
                case -1:              
                    activeElem2.style.transform = "translate(0px, 0px)"; 
                    break;
                 case 1:
                    activeElem2.style.transform = "translate(0px, 0px)";
                    break;
                 case 4:
                    activeElem2.style.transform = "translate(0px, 0px)";
                    break;
                case -4:
                    activeElem2.style.transform = "translate(0px, 0px)";
                    break;
                }
        },100);

        setTimeout(function(){
            activeElem2.style.height = "88%";
            activeElem2.style.width = "88%";
            activeElem2.style.position = "flex";
            checkEnd();
        },300);
    }
    if(elem.className=="square"){
        elem.style.boxShadow = "0px 0px 0px 2px rgb(116, 75, 41),0px 0px 0px 4px rgb(92, 58, 30), 0px 0px 0px 6px rgb(66, 42, 22),0px 0px 0px 4px cyan inset";
        if(activeElem)activeElem.style.boxShadow = "0px 0px 0px 2px rgb(116, 75, 41), 0px 0px 0px 4px rgb(92, 58, 30), 0px 0px 0px 6px rgb(66, 42, 22), 0px 0px 0px 2px rgb(92, 58, 30) inset, 0px 0px 0px 4px rgb(66, 42, 22) inset";
        (activeElem!==elem) ? activeElem = elem : activeElem=false;
    }
    if(elem.tagName=="P"){
        elem.parentElement.style.boxShadow = "0px 0px 0px 2px rgb(116, 75, 41),0px 0px 0px 4px rgb(92, 58, 30), 0px 0px 0px 6px rgb(66, 42, 22),0px 0px 0px 4px cyan inset";
        if(activeElem)activeElem.style.boxShadow = "0px 0px 0px 2px rgb(116, 75, 41), 0px 0px 0px 4px rgb(92, 58, 30), 0px 0px 0px 6px rgb(66, 42, 22), 0px 0px 0px 2px rgb(92, 58, 30) inset, 0px 0px 0px 4px rgb(66, 42, 22) inset";
        (activeElem!==elem.parentElement) ? activeElem = elem.parentElement : activeElem=false;
    }
}

function checkEnd(){
    let cells = Array.from(squares);
    for(let i=0;i<15;i++){
        if(cells[i].getAttribute("id")!==cells[i].firstChild.firstChild.innerHTML) return;
    }
    document.querySelector(".endGameLabel").style.display = "flex";
    document.querySelector(".endGameLabel").style.opacity = "1";
}