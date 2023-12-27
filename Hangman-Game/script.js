const word_element = document.getElementById("word")
const popup = document.getElementById("popup-container")
const message_element = document.getElementById("success-message")
let selectedWord = getRandomWord();
const wrongLetters_element = document.getElementById("wrong-letters")
const items = document.querySelectorAll(".item");
const btn = document.getElementById("play-again")

const correctLetters = [];
const wrongLetters = [];

function getRandomWord(){
    const words = ["javascrıpt","java","python","css","html","angular","react","csharp","sql"]
    return words[Math.floor(Math.random()* words.length)]
}

function updateWrongLetters(){
    wrongLetters_element.innerHTML = `
    ${wrongLetters.length>0?"<h3>WRONG LETTERS</h3>":""}
    ${wrongLetters.map(letter => `<span>${letter}<span>`)}
    `
    
    items.forEach((items,index) =>{
        const errorCount = wrongLetters.length;

        if(index < errorCount){
            items.style.display = "block"
        }else{
            items.style.display ="none"
        }
    })

    if(wrongLetters.length === items.length){
        popup.style.display = "flex";
        message_element.innerText =" YOU LOSE !"
    }
    
}

function displayWord (){
    

    word_element.innerHTML = `
     ${selectedWord.split(``).map(letter => `
     <div class="letter">
        ${correctLetters.includes(letter) ? letter: ""}
     </div>
     `).join("")}
    `

    const w = word_element.innerText.replace(/\n/g,"");
    if(w === selectedWord){
        popup.style.display = "flex";
        message_element.innerText =" YOU WIN !"
    }
}

window.addEventListener("keydown",function(e){
    if(e.keyCode >= 65 && e.keyCode <= 90){
        const letter = e.key;

        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
            }else{

            }
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updateWrongLetters();
            }
        }
    }

    
})

btn.addEventListener("click",function(){
    correctLetters.splice(0)
    wrongLetters.splice(0)
    selectedWord = getRandomWord();
    displayWord();
    updateWrongLetters()
    popup.style.display = "none"
})

displayWord();