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
       wordContainer.innerHTML = "";
       
       for(let word of words){
        const wordDiv = document.createElement("div");
        wordDiv.innerHTML = `
        
           <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-3">
            <h2 class="text-2xl font-bold">${word.word}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <p class="text-2xl font-medium bangla-font">"${word.meaning} / ${word.pronunciation}"</p>

            <div class="btn flex justify-between items-center bg-white shadow-none border-none">
               
               <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>

               <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>

            </div>
       </div>
        
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