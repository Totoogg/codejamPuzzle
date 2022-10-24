let mainDiv = document.createElement('div');

let contain = document.createElement('div');
let select = document.createElement('select');
let size3 = document.createElement('option');
let size4 = document.createElement('option');
let size5 = document.createElement('option');
let size6 = document.createElement('option');
let size7 = document.createElement('option');
let size8 = document.createElement('option');

let buttons = document.createElement('div');
let buttonShuffle = document.createElement('button');
let stopBtn = document.createElement('button');
let save = document.createElement('button');
let result = document.createElement('button');
let sound = document.createElement('button');

let info = document.createElement('div');
let move = document.createElement('div');
let time = document.createElement('div');

size3.innerHTML = `3x3`;
size4.innerHTML = `4x4`;
size5.innerHTML = `5x5`;
size6.innerHTML = `6x6`;
size7.innerHTML = `7x7`;
size8.innerHTML = `8x8`;

size3.setAttribute('value', `3`);
size4.setAttribute('value', `4`);
size5.setAttribute('value', `5`);
size6.setAttribute('value', `6`);
size7.setAttribute('value', `7`);
size8.setAttribute('value', `8`);

let fifteenDiv = document.createElement('div');

let bgScore = document.createElement('div');
let score = document.createElement('div');

let winArr;
let countsItems;
let matrix;
let itemNodes;
let field = 3;
playingField(field);
console.log(itemNodes[itemNodes.length - 1]);


let arrPos = [1,2,3,4,5,6,7,8,9,10];
let arrMoves = [9999999,9999998,9999997,9999996,9999995,9999994,9999993,9999992,9999991,9999990];
let arrMinutesOne = [5,5,5,5,5,5,5,5,5,5];
let arrMinutesTwo = [9,9,9,9,9,9,9,9,9,9];
let arrSecondsOne = [5,5,5,5,5,5,5,5,5,5];
let arrSecondsTwo = [9,8,7,6,5,4,3,2,1,0];



document.body.append(mainDiv);
mainDiv.append(contain);
contain.append(select);
select.append(size3);
select.append(size4);
select.append(size5);
select.append(size6);
select.append(size7);
select.append(size8);
mainDiv.append(buttons);
mainDiv.append(info);
info.append(move);
info.append(time);
mainDiv.append(fifteenDiv);
buttons.append(buttonShuffle);
buttons.append(stopBtn);
buttons.append(save);
buttons.append(result);
buttons.append(sound);

document.body.append(bgScore);
bgScore.append(score);


buttonShuffle.innerHTML = `Shuffle and start`;
stopBtn.innerHTML = `Stop`;
save.innerHTML = `Save`;
result.innerHTML = `Result`;
sound.innerHTML = `Sound`;

let timerBol = true;
let saveMoves = 0;
let moves = 0;
move.innerHTML = `Moves: ${moves}`
let minutesOne = 0;
let minutesTwo = 0;
let secondsOne = 0;
let secondsTwo = 0;
let saveMinutesOne = 0;
let saveMinutesTwo = 0;
let saveSecondsOne = 0;
let saveSecondsTwo = 0;

time.innerHTML = `Time: ${minutesOne}${minutesTwo}:${secondsOne}${secondsTwo}`;

mainDiv.classList.add('page');
fifteenDiv.classList.add('fifteen');
buttons.classList.add('buttons');
buttonShuffle.classList.add('btn');
stopBtn.classList.add('btn');
save.classList.add('btn');
result.classList.add('btn');
sound.classList.add('btn');
info.classList.add('info');
contain.classList.add('contain');

bgScore.classList.add('bg-score');
bgScore.classList.add('display-none');
score.classList.add('score');


scoreItem();

let itemsScore2 = Array.from(score.querySelectorAll('.span2'));
let itemsScore3 = Array.from(score.querySelectorAll('.span3'));


result.addEventListener('click', () => {
    bgScore.classList.remove('display-none');
})

bgScore.addEventListener('click', e => {
    if (e.target.classList.contains('bg-score')) {
        bgScore.classList.add('display-none');
    }
})

score.addEventListener('click', e => {
    if (e.target.classList.contains('score')) {
        bgScore.classList.add('display-none');
    }
})

save.addEventListener('click', () => {
    stop();
    timerBol = true;
    localStorage.setItem('matrix', matrix);
    localStorage.setItem('field', field);
    localStorage.setItem('moves', moves);
    localStorage.setItem('minutesOne', minutesOne);
    localStorage.setItem('minutesTwo', minutesTwo);
    localStorage.setItem('secondsOne', secondsOne);
    localStorage.setItem('secondsTwo', secondsTwo);
})

select.addEventListener('change', function(){
	field = this.value;
    playingField(field);
 
    let shuffleArr = shuffle(matrix.flat());

    matrix = getMatrix(shuffleArr, field);
    moves = 0;
    movesUp();
    stop();
    minutesOne = 0;
    minutesTwo = 0;
    secondsOne = 0;
    secondsTwo = 0;
    timeUp();
    timerBol = true;
    setPositionMatrix(matrix);
});

const audio = new Audio();
audio.src = './multyashnyiy-zvuk-najatiya-na-knopku-30362.mp3';
let isPlay = true;

function playAudio() {
   
    audio.currentTime = 0;
    if(isPlay){
        audio.play();
    }
}

sound.addEventListener('click', () => {
    if (isPlay) {
        isPlay = false;
    } else {
        isPlay = true;
    }
})

matrix = getMatrix(shuffle(matrix.flat()), field);

setPositionMatrix(matrix);



buttonShuffle.addEventListener('click', () => {
    let shuffleArr = shuffle(matrix.flat());
    matrix = getMatrix(shuffleArr, field);
    moves = 0;
    movesUp();
    stop();
    minutesOne = 0;
    minutesTwo = 0;
    secondsOne = 0;
    secondsTwo = 0;
    timeUp();
    timerBol = true;
    setPositionMatrix(matrix);
})

fifteenDiv.addEventListener('click', e => {
    const buttonNode = e.target.closest('button');
    if (!buttonNode) {
        return;
    }
    const buttonNumber = Number(buttonNode.dataset.matrixId);
    const buttonCoords = findCoords(buttonNumber, matrix);
    const blankCoords = findCoords(countsItems, matrix);
    const isValid = isValidForSwap(buttonCoords, blankCoords);

    if (isValid) {
        playAudio();
        start();
        timerBol = false;
        moves++;
        movesUp();
        swap(blankCoords, buttonCoords, matrix);
        setPositionMatrix(matrix);
    }
})

stopBtn.addEventListener('click', () =>{
    stop();
    timerBol = true;
})

/* fifteenDiv.addEventListener('mouseover', (e) => {
    const buttonNode = e.target.closest('button');
    if(buttonNode !== null) {
        if(isValidForSwap(findCoords(Number(buttonNode.dataset.matrixId), matrix), findCoords(countsItems, matrix))) {
            buttonNode.onmousedown = function(event) {
                let matrixOne = 0;
                let matrixTwo = 0;
                for (let i = 0; i <matrix.length; i++) {
                    for (let j = 0; j<matrix[i].length; j++) {
                        if (matrix[i][j] === Math.max.apply(null, matrix.flat())) {
                            matrixOne = i;
                            matrixTwo = j;
                        }
                    }
                }
                console.log(buttonNode.innerHTML);
               
                let shiftX = event.clientX - buttonNode.getBoundingClientRect().left;
                let shiftY = event.clientY - buttonNode.getBoundingClientRect().top;

                //moveAt(event.pageX, event.pageY);

                function moveAt(pageX, pageY) {
                    buttonNode.style.transform = `translate3d(${pageX}%, ${pageY}%, 0)`;
                }
                if (buttonNode.innerHTML === matrix[matrixOne - 1][matrixTwo]){

                } else if (buttonNode.innerHTML === matrix[matrixOne + 1][matrixTwo]) {

                } else if (buttonNode.innerHTML === matrix[matrixOne][matrixTwo - 1]) {
                    
                } else if (buttonNode.innerHTML === matrix[matrixOne][matrixTwo+ 1]) {
                    
                }

                let a = event.pageY;
                let b = buttonNode.style.transform.split('').slice(12, buttonNode.style.transform.length-4).join('').split('').filter(x => x!== '%').join('').split(',').map(x => Number(x));
                let c = event.pageX;
                console.log(b)
                function onMouseMove(event) {
                    moveAt(-c + event.pageX+b[0], -a + event.pageY+b[1]);
                }

                document.addEventListener('mousemove', onMouseMove);

                buttonNode.onmouseup = function() {
                    document.removeEventListener('mousemove', onMouseMove);
                    buttonNode.onmouseup = null;
                };
            }
            buttonNode.ondragstart = function() {
                return false;
            };
        }
    }
}) */



if(localStorage.field) {
    localSave();
}


function playingField(field) {
    fifteenDiv.innerHTML = '';
    mainDiv.style.maxWidth = `${field * 100}px`;
    for(let i = 0; i < field**2; i++) {
        let itemsButton = document.createElement('button');
        itemsButton.classList.add('item');
        itemsButton.style.width = `${100 / field}%`;
        itemsButton.style.height = `${100 / field}%`;
        itemsButton.innerHTML = `${i+1}`;
        itemsButton.setAttribute('data-matrix-id', `${i+1}`);
        fifteenDiv.append(itemsButton);
    }
    winArr = new Array(field**2).fill(0).map((x,i) => i+1);
    countsItems = field ** 2;
    itemNodes = Array.from(fifteenDiv.querySelectorAll('.item'));
    itemNodes[countsItems - 1].style.display = 'none';
    matrix = getMatrix(itemNodes.map(x => Number(x.dataset.matrixId)), field);
}

function getMatrix(arr, field) {
    let matrix = [];
    let y = 0;
    let x = 0;
    for(let i = 0; i<field; i++) {
        matrix.push([]);
    }
    for(let i = 0; i<arr.length; i++) {
        if (x >= field) {
            y++;
            x = 0;
        }
        matrix[y][x] = arr[i];
        x++;
    }
    return matrix;
}

function setPositionMatrix(matrix) {
    for(let y = 0; y < matrix.length; y++) {
        for(let x = 0; x < matrix[y].length; x++) {
            
            const value = matrix[y][x];
            const node = itemNodes[value - 1];
            setNodeStyle(node, x, y);
        }
    }
   
};

function setNodeStyle(node, x, y) {
    const shiftPS = 100;
    node.style.transform = `translate3d(${x * shiftPS}%, ${y * shiftPS}%, 0)`;
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function findCoords(number, matrix) {
    for(let y = 0; y < matrix.length; y++) {
        for(let x = 0; x < matrix[y].length; x++) {
            if(matrix[y][x] === number) {
                return {x, y}
            }
        }
    }
    return null;
}

function isValidForSwap(coords1, coords2) {
    const diffX = Math.abs(coords1.x - coords2.x);
    const diffY = Math.abs(coords1.y - coords2.y);

    return (diffX === 1 || diffY === 1) && (coords1.x === coords2.x || coords1.y === coords2.y)
}

function swap(coords1, coords2, matrix) {
    const coords1Number = matrix[coords1.y][coords1.x];
    matrix[coords1.y][coords1.x] = matrix[coords2.y][coords2.x];
    matrix[coords2.y][coords2.x] = coords1Number;

    if (isWon(matrix)) {
        stop();
        saveMoves = moves;
        saveMinutesOne = minutesOne;
        saveMinutesTwo = minutesTwo;
        saveSecondsOne = secondsOne;
        saveSecondsTwo = secondsTwo;
        arrMoves.push(saveMoves);
        arrMinutesOne.push(saveMinutesOne);
        arrMinutesTwo.push(saveMinutesTwo);
        arrSecondsOne.push(saveSecondsOne);
        arrSecondsTwo.push(saveSecondsTwo);
        saveTop();
        getSaveTop()
        addWon();
    }
}

function isWon(matrix) {
    let flatmatrix = matrix.flat();
    for (let i = 0; i < winArr.length; i++) {
        if (flatmatrix[i] !== winArr[i]) {
            return false;
        }
    }
    return true;
}

function addWon() {
    setTimeout( () => {
        let text = `Hooray! You solved the puzzle in ${minutesOne}${minutesTwo}:${secondsOne}${secondsTwo} and ${moves} moves!`;
        alert(text);
        if(alert) {
            let shuffleArr = shuffle(matrix.flat());
            matrix = getMatrix(shuffleArr, field);
            moves = 0;
            movesUp();
            stop();
            minutesOne = 0;
            minutesTwo = 0;
            secondsOne = 0;
            secondsTwo = 0;
            timeUp();
            timerBol = true;
            setPositionMatrix(matrix);
        }
        
    }, 200)
}

function movesUp() {
    move.innerHTML = `Moves: ${moves}`;
}

function timeUp() {
    time.innerHTML = `Time: ${minutesOne}${minutesTwo}:${secondsOne}${secondsTwo}`;
}

function timer(){
    
    if(secondsTwo >= 9) {
        console.log(secondsTwo)
        secondsTwo = 0;
        secondsOne++;
        timeUp();
    } else {
        secondsTwo++;
        timeUp();
    }
    if(minutesTwo === 10) {
        minutesTwo = 0;
        minutesOne++;
        timeUp();
    }
    if(secondsOne === 6) {
        secondsOne = 0;
        minutesTwo++;
        timeUp();
    }
 }
 
 function start() {
    if (timerBol) {
        window.TimerId = window.setInterval(timer, 1000);
    }
 }
 
 function stop() {
    window.clearInterval(window.TimerId);
 }

function localSave() {
    moves = localStorage.moves;


    field = localStorage.field;


    minutesOne = localStorage.minutesOne;


    minutesTwo = localStorage.minutesTwo;


    secondsOne = localStorage.secondsOne;
    

    secondsTwo = localStorage.secondsTwo;

    playingField(field);

    for (let a of select.querySelectorAll('option')) {
        if (field === a.value) {
            a.setAttribute('selected', 'true');
        }
    }

    matrix = getMatrix(localStorage.matrix.split(',').filter(x => x!== ',').map(x => Number(x)),localStorage.field);

    setPositionMatrix(matrix);
    movesUp();
    timeUp();
}

function scoreItem() {
    score.innerHTML = '';
    for(let i = 0; i < 10; i++){
        let item = document.createElement('div');
        item.classList.add('pos-top');
        let span1 = document.createElement('span');
        let span2 = document.createElement('span');
        let span3 = document.createElement('span');
        item.append(span1);
        item.append(span2);
        item.append(span3);
        span2.classList.add('span2');
        span3.classList.add('span3');
        span1.innerHTML = `${i+1}`;
        span2.innerHTML = `99999999`;
        span3.innerHTML = `59:59`;
        score.append(item);
    }
}

function saveTop() {
    localStorage.setItem('position', arrPos);
    localStorage.setItem('arrMoves', arrMoves);
    localStorage.setItem('arrMinutesOne', arrMinutesOne);
    localStorage.setItem('arrMinutesTwo', arrMinutesTwo);
    localStorage.setItem('arrSecondsOne', arrSecondsOne);
    localStorage.setItem('arrSecondsTwo', arrSecondsTwo);
}

function getSaveTop(){
    let a = [];
   
    arrMoves = localStorage.arrMoves.split(',').filter(x => x!== ',').map(x => Number(x));
    arrMinutesOne = localStorage.arrMinutesOne.split(',').filter(x => x!== ',').map(x => Number(x));
    arrMinutesTwo = localStorage.arrMinutesTwo.split(',').filter(x => x!== ',').map(x => Number(x));
    arrSecondsOne = localStorage.arrSecondsOne.split(',').filter(x => x!== ',').map(x => Number(x));
    arrSecondsTwo = localStorage.arrSecondsTwo.split(',').filter(x => x!== ',').map(x => Number(x));

    for(let i = 0; i< arrMoves.length; i++) {
        a.push({
            moves : arrMoves[i],
            minutesOne : arrMinutesOne[i],
            minutesTwo : arrMinutesTwo[i],
            secOne : arrSecondsOne[i],
            secTwo : arrSecondsTwo[i],
        })
    }
    a.sort((a, b) => a.moves > b.moves ? 1 : -1);

    for(let i = 0; i < 10; i++) {
        arrMoves[i] = a[i].moves;
        arrMinutesOne[i] = a[i].minutesOne;
        arrMinutesTwo[i] = a[i].minutesTwo;
        arrSecondsOne[i] = a[i].secOne;
        arrSecondsTwo[i] = a[i].secTwo;
        itemsScore2[i].innerHTML = `${a[i].moves}`;
        itemsScore3[i].innerHTML = `${a[i].minutesOne}${a[i].minutesTwo}:${a[i].secOne}${a[i].secTwo}`;
    }

    arrMoves = arrMoves.slice(0,10);
    arrMinutesOne = arrMinutesOne.slice(0,10);
    arrMinutesTwo = arrMinutesTwo.slice(0,10);
    arrSecondsOne = arrSecondsOne.slice(0,10);
    arrSecondsTwo = arrSecondsTwo.slice(0,10);

    saveTop();
}

if (localStorage.arrMoves) {
    getSaveTop();
}
