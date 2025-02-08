let Player = document.querySelector(".playerContainer");
let Dog = document.querySelector(".DogContainer");
let Obstacle = document.querySelector(".ObstacleContainer");
let ScoreCounter = document.getElementById("ScoreCounter");
let TimeRemain = document.getElementById("TimeRemain");
let TimeContainer = document.querySelector(".TimeContainer");
let SnackContainer = document.querySelector(".SnackContainer");


let PlayerHorPosition = 0 ;
let PlayerVerPosition =0;
let Speed=2;
function MovePlayer(event){
    switch (event.key) {
        case "ArrowUp":
            if (PlayerVerPosition - Speed >= 0) PlayerVerPosition -= Speed;
            break;
        case "ArrowDown":
            if (PlayerVerPosition + Speed <= 250) PlayerVerPosition += Speed;
            break;
        case "ArrowRight":
            if (PlayerHorPosition + Speed <= 350) PlayerHorPosition += Speed;
            break;
        case "ArrowLeft":
            if (PlayerHorPosition - Speed >= 0) PlayerHorPosition -= Speed;
            break;
    }
    Player.style.left= `${PlayerHorPosition}px`;
    Player.style.top= `${PlayerVerPosition}px`;

    CheckCatch();
    CheckSnack();
    
}

document.addEventListener('keydown', MovePlayer);

let DogHorPosition;
let DogVerPosition;


function RandomizeDog(){
    DogHorPosition = Math.floor(Math.random()*350);
    DogVerPosition = Math.floor(Math.random()*250);

    Dog.style.left = `${DogHorPosition}px`;
    Dog.style.top = `${DogVerPosition}px`;
}
RandomizeDog();
setInterval(RandomizeDog,4000);

let Counter=0;
let Distance=30;
function CheckCatch(){
    if(
        Math.abs(PlayerHorPosition-DogHorPosition)<Distance
        &&
        Math.abs(PlayerVerPosition-DogVerPosition)<Distance
    ){
        Counter++;
        ScoreCounter.textContent=Counter;
        RandomizeDog();
        RandomizeImgIndex();

    }


}

let SnackVerPosition;
let SnackHorPosition;

function RandomizeSnack(){
    SnackHorPosition = Math.floor(Math.random()*350);
    SnackVerPosition = Math.floor(Math.random()*250);

    SnackContainer.style.left = `${SnackHorPosition}px`;
    SnackContainer.style.top = `${SnackVerPosition}px`;
    

}
RandomizeSnack();
setInterval(RandomizeSnack,5000);

function CheckSnack(){
    if(
        Math.abs(SnackHorPosition-PlayerHorPosition)<Distance&&
        Math.abs(SnackVerPosition-PlayerVerPosition)<Distance
    ){
        Speed+=1;
        RandomizeSnack();
   
    }
}
let Time=30;

const Countdown = setInterval(()=>{
    Time -= 1;
    TimeRemain.textContent=Time;
    if(Time<0){
        TimeContainer.textContent = `Czas minął. Złapałeś ${Counter} pjemzgów`;
        clearInterval(Countdown);
        Player.style.display="none";
        Dog.style.display="none";
        SnackContainer.style.display="none";
    }
},1000)

function RandomizeImgIndex(){
    let DogIndex = Math.floor((Math.random()*6)+1);
    Dog.style.backgroundImage = `url('./puppy${DogIndex}.png')`;
    Dog.style.backgroundSize = 'cover';
    Dog.style.backgroundPosition = 'center';
}
Dog.style.backgroundImage = `url('./puppy1.png')`;
Dog.style.backgroundSize = 'cover';
Dog.style.backgroundPosition = 'center';