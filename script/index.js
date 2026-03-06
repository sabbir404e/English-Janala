const loadLessions = () => {

    fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
    .then((response) => response.json()) // request json system
    .then((json) => displayLession(json.data)); //display json
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
        
        <button class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson - ${lession.level_no}</button>
        
        `;

        //4- append into contaienr
        levelContainer.append(btnDiv);
    }
};

loadLessions();