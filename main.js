document.querySelector('.control-buttons span').onclick = function () {
    let usrName = document.querySelector('.control-buttons input').value;
    if (usrName == null || usrName == '') {
        document.querySelector('.name span').innerHTML = 'Unknown';
    } else {
        document.querySelector('.name span').innerHTML = usrName;
    }
    document.querySelector('.control-buttons').remove();
    console.log(usrName);
}
// main variables
let duration = 1000;

let gameContainer = document.querySelector('.game-container');
let blocks = Array.from(gameContainer.children)
let orderRange = [...Array(blocks.length).keys()]

shuffle(orderRange)

blocks.forEach(function (block, index) {
    block.style.order = orderRange[index];
    // add event clicked
    block.addEventListener('click', flipBlock)
})

function shuffle(array) {
    // setting variables
    let current = array.length,
        temp, // قيمة مؤقتة 
        random; // الرقم العشوائي
    while (current > 0) {
        // Get Random Number
        random = Math.floor(Math.random() * current);
        // Decrease Length By One
        current--;
        // [1] Save Current Element in Stash
        temp = array[current];
        // [2] Current Element = Random Element
        array[current] = array[random];
        // [3] Random Element = Get Element From Stash
        array[random] = temp;
    }
    return array;
}

// flip block function
function flipBlock() {
    let selectedBlock = this;
    selectedBlock.classList.add('is-flipped');
    // all elements have class 'is-flipped'
    let allFlippedBlocks = 
    blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    if (allFlippedBlocks.length === 2) {
        // stopClicking function 
        stopClicking()
        // check Matched Blocks
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}

function stopClicking() {
    // add class to block container 
    gameContainer.classList.add('stop-clicking')

    setTimeout(() => {
        gameContainer.classList.remove('stop-clicking')
    },duration)
}

function checkMatchedBlocks(fBlock, lBlock) {
    let triesElement = document.querySelector('.tries span')

    if (fBlock.dataset.img === lBlock.dataset.img) {

        fBlock.classList.remove('is-flipped')
        lBlock.classList.remove('is-flipped')

        fBlock.classList.add('has-match')
        lBlock.classList.add('has-match')

        document.querySelector('#success').play()
    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        document.querySelector('#fail').currentTime = 0.8;
        document.querySelector('#fail').play()
        setTimeout(() => {
            document.querySelector('#fail').pause();
            fBlock.classList.remove('is-flipped')
            lBlock.classList.remove('is-flipped')
        },duration)
    }
}