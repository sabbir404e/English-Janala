const loadLessions = () => {

    fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
    .then((response) => response.json()) // request json system
    .then((json) => displayLession(json.data)); //display json
};

const loadLevelWord = (id) => {
    console.log(id);

    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    
    fetch(url)
    .then((res) => res.json())
    .then(data => displayLevelWord(data.data));
};

const displayLevelWord = (words) => {

       const wordContainer = document.getElementById("word-container");
    //    wordContainer.innerHTML = "";
       
       for(let word of words){
        const wordDiv = document.createElement("div");
        wordDiv.innerHTML = `
        
           <p>Cat</p>
        
        `;

        wordContainer.append(wordDiv);
       };
};

const displayLession = (lessions) => {

    //1- get the container and empty
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    //2- get into every lessons
    for(let lession of lessions){

        //3- create element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        
        <button onclick="loadLevelWord(${lession.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson - ${lession.level_no}</button>
        
        `;

        //4- append into contaienr
        levelContainer.append(btnDiv);
    }
};

loadLessions();