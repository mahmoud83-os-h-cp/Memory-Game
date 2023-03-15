document.querySelector(".button-control span").onclick = function() {

    let yourName = prompt("What Is Your Name ?");

    if (yourName == null || yourName == "") {

        document.querySelector(".name span").innerHTML = 'Unknown Person';
    } else {

        document.querySelector(".name span").innerHTML = yourName;
    }

    document.querySelector(".button-control").remove();
}
let duration = 1000;

let blockContainer = document.querySelector(".memory-block-container");

let blocks = Array.from(blockContainer.children);

let orderRange = [...Array(blocks.length).keys()];

//console.log(orderRange)

shuffle(orderRange);

//console.log(orderRange)

blocks.forEach((block, index) => {

    block.style.order = orderRange[index];

    block.addEventListener("click", function() {
        flipBlock(block);
    })
});


function flipBlock(selectedBlock) {

    selectedBlock.classList.add("is-fleped");

    let allFilepedBlocked = blocks.filter(filterblock => filterblock.classList.contains("is-fleped"));

    if (allFilepedBlocked.length == 2) {

        stopClicking();

        matchedFileped(allFilepedBlocked[0], allFilepedBlocked[1]);
    }
}

function stopClicking() {

    blockContainer.classList.add("no-click");

    setTimeout(() => {

        blockContainer.classList.remove("no-click")
    }, duration)
}


function matchedFileped(firstSelect, secondSelect) {

    const triesElment = document.querySelector(".tries span");

    if (firstSelect.dataset.technology === secondSelect.dataset.technology) {

        firstSelect.classList.remove("is-fleped");
        secondSelect.classList.remove("is-fleped");

        firstSelect.classList.add("has-match");
        secondSelect.classList.add("has-match");

        document.getElementById("sucsess").play();

    } else {

        triesElment.innerHTML = parseInt(triesElment.innerHTML) + 1;

        setTimeout(() => {

            firstSelect.classList.remove("is-fleped");
            secondSelect.classList.remove("is-fleped");
        }, duration);

        document.getElementById("fail").play();
    }


}

function shuffle(array) {

    let current = array.length,
        temp,
        random;

    while (current > 0) {

        random = Math.floor(Math.random() * current);

        current--;

        temp = array[current];

        array[current] = array[random];

        array[random] = temp;
    }

    return array;
}