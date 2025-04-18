const audioTurn=new Audio("playturn.mp3");
const winner=new Audio("winner.mp3");
let turn ="X";
let gameover=false;
let isResponsive=false;
let resolution=window.matchMedia("(max-width: 900px)");

//change turn
const changeTurn=()=>{
    return turn==="X"?"O":"X";
}

//to check winner
const checkWinner=()=>{
    let boxContainer=document.getElementsByClassName("boxContainer");
    let win=[
        [0,1,2,0,5,0],
        [3,4,5,0,15,0],
        [6,7,8,0,25,0],
        [0,3,6,-10,15,90],
        [1,4,7,0,15,90],
        [2,5,8,10,15,90],
        [0,4,8,0,15,45],
        [2,4,6,0,15,135],
    ]
    let win2=[
        [0,1,2,0,10,0],
        [3,4,5,0,30,0],
        [6,7,8,0,50,0],
        [0,3,6,-20,30,90],
        [1,4,7,0,30,90],
        [2,5,8,20,30,90],
        [0,4,8,0,30,45],
        [2,4,6,0,30,135],
    ]
    if (resolution.matches) {
        win2.forEach(e=>{
            if((boxContainer[e[0]].innerText===boxContainer[e[1]].innerText)&&(boxContainer[e[2]].innerText===boxContainer[e[1]].innerText)&&(boxContainer[e[0]].innerText!=="")){
                gameover=true;
                winner.play();
                document.querySelector(".imagebox").getElementsByTagName("img")[0].style.opacity="1";
                document.getElementsByClassName("info")[0].innerText=boxContainer[e[0]].innerText + " Won.";
                responsiveLine(resolution);
                document.querySelector(".line").style.transform=`translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`;
                document.querySelector(".line").style.opacity='1';
            }
        })
    }else{
        win.forEach(e=>{
            if((boxContainer[e[0]].innerText===boxContainer[e[1]].innerText)&&(boxContainer[e[2]].innerText===boxContainer[e[1]].innerText)&&(boxContainer[e[0]].innerText!=="")){
                gameover=true;
                winner.play();
                document.querySelector(".imagebox").getElementsByTagName("img")[0].style.opacity="1";
                document.getElementsByClassName("info")[0].innerText=boxContainer[e[0]].innerText + " Won.";
                document.querySelector(".line").style.transform=`translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`;
                document.querySelector(".line").style.opacity='1';
                if(isResponsive===false){
                    document.querySelector(".line").style.width='30vw';
                }
                responsiveLine(resolution);
            }
        })
    }
    
}

//Reset 
const reset=()=>{
    let boxContainer=document.getElementsByClassName("boxContainer");
    Array.from(boxContainer).forEach(element=>{
        element.innerText="";
    });
    turn="X";
    document.querySelector(".imagebox").getElementsByTagName("img")[0].style.opacity="0";
    gameover=false;
    document.getElementsByClassName("info")[0].innerText="Turn for "+turn;
    document.querySelector(".line").style.width='0vw';
    document.querySelector(".line").style.opacity='0';
}

//Game Logic
let box=document.getElementsByClassName("box");
Array.from(box).forEach(element=>{
    let boxContainer=element.querySelector(".boxContainer");
    element.addEventListener("click",()=>{
        if(boxContainer.innerText===''){
            boxContainer.innerText=turn;
            turn=changeTurn();
            audioTurn.play();
            checkWinner();
            if(!gameover){
                document.getElementsByClassName("info")[0].innerText="Turn for "+turn;
            }
        }
    })
})

//event listner for reset
let Reset=document.getElementById("reset");
Reset.addEventListener("click",()=>{
    reset();
})

//Responsive line animation
const responsiveLine=(res)=>{
    if(res.matches){
        isResponsive=true;
        document.querySelector(".line").style.width='60vw';
        document.querySelector(".line").style.opacity='0';
        console.log("responsive")
    }
}
resolution.addEventListener("change",responsiveLine);