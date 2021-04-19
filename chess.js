let field = document.querySelector("table");
let tds = document.querySelectorAll("td");
var figures = Array.from(document.querySelectorAll(".figure"));
for(let td of tds) td.onclick = onClickTd;

var activeElem = false;
var whoActieve = true;
var difference;

function checkRow(){
    let elem = activeElem.parentElement.getAttribute("id");
    if(elem>=1 && elem <=8)
        return [1,8];
    if(elem>=9 && elem<=16)
        return [9,16];
    if(elem>=17 && elem<=24)
        return [17,24];
    if(elem>=25 && elem<=32)
        return [25,32];
    if(elem>=33 && elem<=40)
        return [33,40];
    if(elem>=41 && elem<=48)
        return [41,48];
    if(elem>=49 && elem<=56)
        return [49,56];
    if(elem>=57 && elem<=64)
        return [57,64];
}

function checkJumpLodya(currentPos, targetPos,a,b){
    if(targetPos>=a && targetPos<=b){
        (currentPos<targetPos) ? currentPos += 1 : currentPos -= 1;
        while(currentPos!=targetPos){
            if(document.getElementById(`${currentPos}`).hasChildNodes()) {
                activeElem.firstChild.style.boxShadow = "";
                activeElem = false;
                return true;
            }
            (currentPos<targetPos) ? currentPos += 1 : currentPos -= 1;
        }
        return false;
    }
    if(difference%8==0){
        (difference>0) ? currentPos += 8 : currentPos -= 8;
        while(currentPos!=targetPos){
            if(document.getElementById(`${currentPos}`).hasChildNodes()) {
                activeElem.firstChild.style.boxShadow = "";
                activeElem = false;
                return true
            }
            (difference>0) ? currentPos += 8 : currentPos -= 8;
        }
        return false;
    }
}

function checkJumpElephant(currentPos, targetPos){
    if(difference%9==0){
        (currentPos < targetPos) ? currentPos+=9 : currentPos-=9; 
        while(currentPos!=targetPos){
            if(document.getElementById(`${currentPos}`).hasChildNodes()){
                activeElem.firstChild.style.boxShadow = "";
                activeElem = false;
                return true;
            }
            (currentPos < targetPos) ? currentPos+=9 : currentPos-=9;
        }
        return false;
    }
    if(difference%7==0){
        (currentPos < targetPos) ? currentPos+=7 : currentPos-=7; 
        while(currentPos!=targetPos){
            if(document.getElementById(`${currentPos}`).hasChildNodes()){
                activeElem.firstChild.style.boxShadow = "";
                activeElem = false;
                return true;
            }
            (currentPos < targetPos) ? currentPos+=7 : currentPos-=7;
        }
        return false;
    }
}

function checkJump(figure, currentPos, targetPos, a=0, b=0){
    currentPos = +currentPos;
    targetPos = +targetPos;
    if(figure == "lodya") return checkJumpLodya(currentPos, targetPos, a, b);
    if(figure == "elephant") return checkJumpElephant(currentPos, targetPos);
    if(figure == "queen") return (checkJumpLodya(currentPos, targetPos, a, b) || checkJumpElephant(currentPos, targetPos));
}

function onClickTd(event){
    let currentTd = event.target;
    if(activeElem && currentTd.className == "cell"){
        difference = currentTd.getAttribute("id")-activeElem.parentElement.getAttribute("id");
        switch(activeElem.dataset.type){
            case "pawn":
                if(whoActieve == true){
                    if(difference == -8){
                        activeElem.dataset.doubleStep = "yes";
                        currentTd.prepend(activeElem);
                        if(currentTd.getAttribute("id")>=1 && currentTd.getAttribute("id")<=8){
                            activeElem.dataset.type = "queen";
                            activeElem.firstChild.innerHTML = "&#9813";
                        }
                        field.style.transform = "rotate(180deg)";
                        field.style.boxShadow = "0px 0px 50px cyan";
                        figures.map((value)=>value.firstChild.style.transform = "rotate(180deg)");
                        whoActieve = false;
                    }
                    if(difference == -16 && activeElem.dataset.doubleStep == "no"){
                        activeElem.dataset.doubleStep = "yes";
                        currentTd.prepend(activeElem);
                        field.style.transform = "rotate(180deg)";
                        field.style.boxShadow = "0px 0px 50px cyan";
                        figures.map((value)=>value.firstChild.style.transform = "rotate(180deg)");
                        whoActieve = false;                        
                    }
                }
                    
                if(whoActieve == false){
                    if(difference == 8){
                        activeElem.dataset.doubleStep = "yes";
                        currentTd.prepend(activeElem);
                        if(currentTd.getAttribute("id")>=57 && currentTd.getAttribute("id")<=64){
                            activeElem.dataset.type = "queen";
                            activeElem.firstChild.innerHTML = "&#9819";
                        }
                        field.style.transform = "rotate(0deg)";
                        field.style.boxShadow = "0px 0px 50px green";
                        figures.map((value)=>value.firstChild.style.transform = "rotate(0deg)");
                        whoActieve = true;
                    }
                    if(difference == 16 && activeElem.dataset.doubleStep == "no"){
                        activeElem.dataset.doubleStep = "yes";
                        currentTd.prepend(activeElem);
                        field.style.transform = "rotate(0deg)";
                        field.style.boxShadow = "0px 0px 50px green";
                        figures.map((value)=>value.firstChild.style.transform = "rotate(0deg)");
                        whoActieve = true;
                    }
                }
                activeElem.firstChild.style.boxShadow = "";
                activeElem = false;
                break;
            case "horse":
                if(difference == -15 || difference == -17 || difference == 15 || difference == 17 || difference == -10 || difference == 10 || difference == -6 || difference == 6){
                    if(whoActieve==true){
                        field.style.transform = "rotate(180deg)";
                        field.style.boxShadow = "0px 0px 50px cyan";
                        figures.map((value)=>value.firstChild.style.transform = "rotate(180deg)");
                        whoActieve = false;
                    }
                    else{
                        field.style.transform = "rotate(0deg)";
                        field.style.boxShadow = "0px 0px 50px green";
                        figures.map((value)=>value.firstChild.style.transform = "rotate(0deg)");
                        whoActieve = true;
                    }
                    currentTd.prepend(activeElem);
                }
                activeElem.firstChild.style.boxShadow = "";
                activeElem = false;
                break;
            case "lodya":
                let [a,b] = checkRow();
                if(difference%8 == 0 || (currentTd.getAttribute("id")>=a && currentTd.getAttribute("id")<=b)){
                    if(checkJump("lodya",activeElem.parentElement.getAttribute("id"), currentTd.getAttribute("id"),a,b)) return;
                    if(whoActieve==true){
                        field.style.transform = "rotate(180deg)";
                        field.style.boxShadow = "0px 0px 50px cyan";
                        figures.map((value)=>value.firstChild.style.transform = "rotate(180deg)");
                        whoActieve = false;
                    }
                    else{
                        field.style.transform = "rotate(0deg)";
                        field.style.boxShadow = "0px 0px 50px green";
                        figures.map((value)=>value.firstChild.style.transform = "rotate(0deg)");
                        whoActieve = true;
                    }
                    currentTd.prepend(activeElem);
                }
                activeElem.firstChild.style.boxShadow = "";
                activeElem = false;
                break;
            case "elephant":
                if(difference%7 == 0 || difference%9 == 0){
                    if(checkJump("elephant",activeElem.parentElement.getAttribute("id"), currentTd.getAttribute("id"))) return;
                    if(whoActieve==true){
                        field.style.transform = "rotate(180deg)";
                        field.style.boxShadow = "0px 0px 50px cyan";
                        figures.map((value)=>value.firstChild.style.transform = "rotate(180deg)");
                        whoActieve = false;
                    }
                    else{
                        field.style.transform = "rotate(0deg)";
                        field.style.boxShadow = "0px 0px 50px green";
                        figures.map((value)=>value.firstChild.style.transform = "rotate(0deg)");
                        whoActieve = true;
                    }
                    currentTd.prepend(activeElem);
                }
                activeElem.firstChild.style.boxShadow = "";
                activeElem = false;
                break;
            case "king":
                if(difference == 1 || difference == -1 || difference == 8 || difference == -8 || difference == -7 || difference == 7 || difference == -9 || difference == 9){
                    if(whoActieve==true){
                        field.style.transform = "rotate(180deg)";
                        field.style.boxShadow = "0px 0px 50px cyan";
                        figures.map((value)=>value.firstChild.style.transform = "rotate(180deg)");
                        whoActieve = false;
                    }
                    else{
                        field.style.transform = "rotate(0deg)";
                        field.style.boxShadow = "0px 0px 50px green";
                        figures.map((value)=>value.firstChild.style.transform = "rotate(0deg)");
                        whoActieve = true;
                    }
                    currentTd.prepend(activeElem);
                }
                activeElem.firstChild.style.boxShadow = "";
                activeElem = false;
                break;
            case "queen":
                let [min,max] = checkRow();
                if(difference%8 == 0 || difference%7 == 0 || difference%9 == 0 || (currentTd.getAttribute("id")>=min && currentTd.getAttribute("id")<=max)){
                    if(checkJump("queen", activeElem.parentElement.getAttribute("id"), currentTd.getAttribute("id"), min, max)) return;
                    if(whoActieve==true){
                        field.style.transform = "rotate(180deg)";
                        field.style.boxShadow = "0px 0px 50px cyan";
                        figures.map((value)=>value.firstChild.style.transform = "rotate(180deg)");
                        whoActieve = false;
                    }
                    else{
                        field.style.transform = "rotate(0deg)";
                        field.style.boxShadow = "0px 0px 50px green";
                        figures.map((value)=>value.firstChild.style.transform = "rotate(0deg)");
                        whoActieve = true;
                    }
                    currentTd.prepend(activeElem);
                }
                activeElem.firstChild.style.boxShadow = "";
                activeElem = false;
                break;
        }
        checkEnd();
    } 
}

function handle(target){
    if(whoActieve==true && target.classList.contains("white")){
        target.firstChild.style.boxShadow = "0px 0px 20px green";
        if(activeElem) activeElem.firstChild.style.boxShadow = "";
        (activeElem!==target) ? activeElem = target : activeElem=false;
    }
    if(whoActieve==false && target.classList.contains("black")){
        target.firstChild.style.boxShadow = "0px 0px 20px cyan";
        if(activeElem) activeElem.firstChild.style.boxShadow = "";
        (activeElem!==target) ? activeElem = target : activeElem=false;
    }
    if(target.tagName=="P") target = target.parentElement;
    if(activeElem && target.classList.contains("figure") && target!=activeElem){
        difference = target.parentElement.getAttribute("id")-activeElem.parentElement.getAttribute("id");
        switch(activeElem.dataset.type){
            case "pawn":
                if(whoActieve == true && target.classList.contains("black") && (difference == -7 || difference == -9)){
                    target.parentElement.prepend(activeElem);
                    
                    if(target.parentElement.getAttribute("id")>=1 && target.parentElement.getAttribute("id")<=8){
                        activeElem.dataset.type = "queen";
                        activeElem.firstChild.innerHTML = "&#9813";
                    }
                    target.remove();
                    field.style.transform = "rotate(180deg)";
                    field.style.boxShadow = "0px 0px 50px cyan";
                    figures.map((value)=>value.firstChild.style.transform = "rotate(180deg)");
                    whoActieve = false;
                }
                if(whoActieve == false && target.classList.contains("white") && (difference == 7 || difference == 9)){
                    target.parentElement.prepend(activeElem);
                    
                    if(target.parentElement.getAttribute("id")>=57 && target.parentElement.getAttribute("id")<=64){
                        activeElem.dataset.type = "queen";
                        activeElem.firstChild.innerHTML = "&#9819";
                    }
                    target.remove();
                    field.style.transform = "rotate(0deg)";
                    field.style.boxShadow = "0px 0px 50px green";
                    figures.map((value)=>value.firstChild.style.transform = "rotate(0deg)");
                    whoActieve = true;
                }
                activeElem.firstChild.style.boxShadow = "";
                activeElem = false;
                break;
            case "horse":
                if(difference == -15 || difference == -17 || difference == 15 || difference == 17 || difference == -10 || difference == 10 || difference == -6 || difference == 6){
                    if(whoActieve == true && target.classList.contains("black")){
                        field.style.transform = "rotate(180deg)";
                        field.style.boxShadow = "0px 0px 50px cyan";
                        figures.map((value)=>value.firstChild.style.transform = "rotate(180deg)");
                        whoActieve = false;
                    }
                    if(whoActieve==false && target.classList.contains("white")){
                        field.style.transform = "rotate(0deg)";
                        field.style.boxShadow = "0px 0px 50px green";
                        figures.map((value)=>value.firstChild.style.transform = "rotate(0deg)");
                        whoActieve = true;
                    }
                    target.parentElement.prepend(activeElem);
                    target.remove();
                }
                activeElem.firstChild.style.boxShadow = "";
                activeElem = false;
                break;
            case "lodya":
                let [a,b] = checkRow();
                if(difference%8 == 0 || (target.parentElement.getAttribute("id")>=a && target.parentElement.getAttribute("id")<=b)){
                    if(checkJump("lodya",activeElem.parentElement.getAttribute("id"), target.parentElement.getAttribute("id"),a,b)) return;
                    if(whoActieve==true && target.classList.contains("black")){
                        field.style.transform = "rotate(180deg)";
                        field.style.boxShadow = "0px 0px 50px cyan";
                        figures.map((value)=>value.firstChild.style.transform = "rotate(180deg)");
                        whoActieve = false;
                    }
                    if(whoActieve==false && target.classList.contains("white")){
                        field.style.transform = "rotate(0deg)";
                        field.style.boxShadow = "0px 0px 50px green";
                        figures.map((value)=>value.firstChild.style.transform = "rotate(0deg)");
                        whoActieve = true;
                    }
                    target.parentElement.prepend(activeElem);
                    target.remove();
                }
                activeElem.firstChild.style.boxShadow = "";
                activeElem = false;
                break;
            case "elephant":
                if(difference%7 == 0 || difference%9 == 0){
                    if(checkJump("elephant",activeElem.parentElement.getAttribute("id"), target.parentElement.getAttribute("id"))) return;
                    if(whoActieve==true && target.classList.contains("black")){
                        field.style.transform = "rotate(180deg)";
                        field.style.boxShadow = "0px 0px 50px cyan";
                        figures.map((value)=>value.firstChild.style.transform = "rotate(180deg)");
                        whoActieve = false;
                    }
                    if(whoActieve==false && target.classList.contains("white")){
                        field.style.transform = "rotate(0deg)";
                        field.style.boxShadow = "0px 0px 50px green";
                        figures.map((value)=>value.firstChild.style.transform = "rotate(0deg)");
                        whoActieve = true;
                    }
                    target.parentElement.prepend(activeElem);
                    target.remove();
                }
                activeElem.firstChild.style.boxShadow = "";
                activeElem = false;
                break;
            case "king":
                if(difference == 1 || difference == -1 || difference == 8 || difference == -8 || difference == -7 || difference == 7 || difference == -9 || difference == 9){
                    if(whoActieve==true && target.classList.contains("black")){
                        field.style.transform = "rotate(180deg)";
                        field.style.boxShadow = "0px 0px 50px cyan";
                        figures.map((value)=>value.firstChild.style.transform = "rotate(180deg)");
                        whoActieve = false;
                    }
                    if(whoActieve==false && target.classList.contains("white")){
                        field.style.transform = "rotate(0deg)";
                        field.style.boxShadow = "0px 0px 50px green";
                        figures.map((value)=>value.firstChild.style.transform = "rotate(0deg)");
                        whoActieve = true;
                    }
                    target.parentElement.prepend(activeElem);
                    target.remove();
                }
                activeElem.firstChild.style.boxShadow = "";
                activeElem = false;
                break;
            case "queen":
                let [min,max] = checkRow();
                if(difference%8 == 0 || difference%7 == 0 || difference%9 == 0 || (target.parentElement.getAttribute("id")>=min && target.parentElement.getAttribute("id")<=max)){
                    if(checkJump("queen",activeElem.parentElement.getAttribute("id"), target.parentElement.getAttribute("id"))) return;
                    if(whoActieve==true && target.classList.contains("black")){
                        field.style.transform = "rotate(180deg)";
                        field.style.boxShadow = "0px 0px 50px cyan";
                        figures.map((value)=>value.firstChild.style.transform = "rotate(180deg)");
                        whoActieve = false;
                    }
                    if(whoActieve==false && target.classList.contains("white")){
                        field.style.transform = "rotate(0deg)";
                        field.style.boxShadow = "0px 0px 50px green";
                        figures.map((value)=>value.firstChild.style.transform = "rotate(0deg)");
                        whoActieve = true;
                    }
                    target.parentElement.prepend(activeElem);
                    target.remove();
                }
                activeElem.firstChild.style.boxShadow = "";
                activeElem = false;
                break;
        }
        checkEnd();
    }
}

function checkEnd(){

}