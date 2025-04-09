const audioTurn = new Audio("playturn.mp3");
const winnerSound = new Audio("winner.mp3");

let turn = "X";
let gameover = false;
let isResponsive = false;
const resolution = window.matchMedia("(max-width: 900px)");
const box=document.getElementsByClassName("box");

const winPatternsDesktop = [
    [0, 1, 2, 0, 5, 0],
    [3, 4, 5, 0, 15, 0],
    [6, 7, 8, 0, 25, 0],
    [0, 3, 6, -10, 15, 90],
    [1, 4, 7, 0, 15, 90],
    [2, 5, 8, 10, 15, 90],
    [0, 4, 8, 0, 15, 45],
    [2, 4, 6, 0, 15, 135],
];

const winPatternsMobile = [
    [0, 1, 2, 0, 10, 0],
    [3, 4, 5, 0, 30, 0],
    [6, 7, 8, 0, 50, 0],
    [0, 3, 6, -20, 30, 90],
    [1, 4, 7, 0, 30, 90],
    [2, 5, 8, 20, 30, 90],
    [0, 4, 8, 0, 30, 45],
    [2, 4, 6, 0, 30, 135],
];


// Change turn
const changeTurn = () => (turn === "X" ? "O" : "X");

// Responsive line adjustment
const responsiveLine = (res) => {
    isResponsive = res.matches;
    const line = document.querySelector(".line");
    line.style.width = res.matches ? "60vw" : "0vw";
    
};
responsiveLine(resolution);
resolution.addEventListener("change", responsiveLine);

// Check Winner
const checkWinner = () => {
    const boxContainer = document.getElementsByClassName("boxContainer");
    
    const winArray = resolution.matches ? winPatternsMobile : winPatternsDesktop;

    winArray.forEach((e) => {
        const [a, b, c] = e;
        if (
            boxContainer[a].innerText &&
            boxContainer[a].innerText === boxContainer[b].innerText &&
            boxContainer[a].innerText === boxContainer[c].innerText
        ) {
            gameover = true;
            winnerSound.play();
            document.querySelector(".imagebox img").style.opacity = "1";
            document.querySelector(".info").innerText = boxContainer[a].innerText + " Won.";
            const line = document.querySelector(".line");
            line.style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            line.style.opacity = "1";
            line.style.width = isResponsive ? "60vw" : "30vw";

            // Highlight winning boxes
            [a, b, c].forEach(index => {
                box[index].classList.add("winner");
            });
        }
    });
};

// Reset game
const reset = () => {
    const boxContainer = document.getElementsByClassName("boxContainer");
    Array.from(boxContainer).forEach((element) => {
        element.innerText = "";
    });
    Array.from(box).forEach((element) => {
        element.classList.remove("winner");
    });
    turn = "X";
    gameover = false;
    document.querySelector(".info").innerText = "Turn for " + turn;
    document.querySelector(".imagebox img").style.opacity = "0";
    const line = document.querySelector(".line");
    line.style.width = "0vw";
    line.style.opacity = "0";
};

// Game Logic
const boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
    const boxContainer = element.querySelector(".boxContainer");
    element.addEventListener("click", () => {
        if (boxContainer.innerText === "" && !gameover) {
            boxContainer.innerText = turn;
            boxContainer.classList.add("pop");
            audioTurn.play();
            checkWinner();
            if (!gameover) {
                turn = changeTurn();
                document.querySelector(".info").innerText = "Turn for " + turn;
            }
        }
    });
});

// Reset listener
document.getElementById("reset").addEventListener("click", reset);
