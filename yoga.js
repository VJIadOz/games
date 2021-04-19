let chips = document.getElementsByClassName("elem");
Array.from(chips).forEach(element => {
    element.onmousedown = clickdown;
});
let table = document.getElementsByTagName("table")[0];
let oldParent, elem;

function clickdown(event){
    event.target.style.height = event.target.clientHeight + "px";
    event.target.style.width = event.target.clientWidth + "px";
    this.style.position = "fixed";
    elem = this;
    oldParent = elem.parentElement;
    move(event);  
    
    function move(event){
        elem.style.left = event.clientX - elem.offsetWidth/2 + "px";
        elem.style.top = event.clientY - elem.offsetHeight/2 + "px";
    }
    document.body.onmousemove = function(event){move(event)};

    this.onmouseup = function(event){
        let newParent = document.elementsFromPoint(event.clientX, event.clientY)[1];
        let oldIdParent = oldParent.getAttribute("id");
        let newIdParent = newParent.getAttribute("id");
        if(newParent.hasAttribute("id") && !newParent.firstChild && (Math.abs(oldIdParent - newIdParent)==2 || Math.abs(oldIdParent-newIdParent)==14)){
            let remElement;
            switch (newIdParent-oldIdParent){
                case 2:
                    remElement = document.getElementById(newIdParent-1);
                    if(!remElement.firstChild){
                        oldParent.prepend(elem);
                        elem.style.position = "static";
                        return;
                    }
                    remElement.removeChild(remElement.firstChild);
                    break;
                case -2:
                    remElement = document.getElementById(+newIdParent+1);
                    if(!remElement.firstChild){
                        oldParent.prepend(elem);
                        elem.style.position = "static";
                        return;
                    }
                    remElement.removeChild(remElement.firstChild);
                    break;
                case 14:
                    remElement = document.getElementById(newIdParent-7);
                    if(!remElement.firstChild){
                        oldParent.prepend(elem);
                        elem.style.position = "static";
                        return;
                    }
                    remElement.removeChild(remElement.firstChild);
                    break;
                case -14:
                    remElement = document.getElementById(+newIdParent+7);
                    if(!remElement.firstChild){
                        oldParent.prepend(elem);
                        elem.style.position = "static";
                        return;
                    }
                    remElement.removeChild(remElement.firstChild);
                    break;
            }
            newParent.prepend(elem);
            elem.style.position = "static";
            event.target.style.height = "75%";
            event.target.style.width = "75%";
        }else{
            oldParent.prepend(elem);
            elem.style.position = "static";
        }
        document.body.onmousemove = null;
        this.onmouseup = null;
        checkEnd();
    }

}

function checkEnd(){
    let cells = document.querySelectorAll(".cell");
    for(cell of cells){
        if(cell.firstChild) count++;
    }
    if(count==1){
        let finalElem = document.querySelector(".labelEndGame");
        finalElem.style.display = "flex";
        finalElem.style.top = 40+"%";
    }
}
