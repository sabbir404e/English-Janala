const createElements = (arr) => {

    const htmlElements = arr.map(el => `<span class="btn">${el}</span>`);
    return (htmlElements.join(" "));
};


const manageSpinner = (status) => {

    if(status == true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }
    else{
        document.getElementById("spinner").classList.add("hidden");
        document.getElementById("word-container").classList.remove("hidden");
    }
};


const loadLessions = () => {

    fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
    .then((response) => response.json()) // request json system
    .then((json) => displayLession(json.data)); //display json
};

const removeActive = () => {

    const lessionButtons = document.querySelectorAll(".lession-btn");
    // console.log(lessionButtons);
    lessionButtons.forEach(btn => { 
    btn.classList.remove("active");
    btn.classList.add("btn-outline");

    });
};

const loadLevelWord = (id) => {
    manageSpinner(true);

    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    
    fetch(url)
    .then((res) => res.json())
    .then(data => {

        removeActive(); //remove all active class
        const clickBtn = document.getElementById(`lession-btn-${id}`);
        // console.log(clickBtn);
           clickBtn.classList.remove("btn-outline");
           clickBtn.classList.add("active"); //add active class
        
        displayLevelWord(data.data);
  });
};

const loadWordDetail = async (id) => {

     const url = `https://openapi.programming-hero.com/api/word/${id}`;

     const res = await fetch(url);
     const details = await res.json();
     displayWordDetails(details.data);
}

const displayWordDetails = (word) => {

    console.log(word);
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
    
        <div class="">
            <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
         </div>
         <div class="">
           <h2 class="font-bold">Meaning</h2>
           <p>${word.meaning}</p>
         </div>
         <div class="">
           <h2 class="font-bold">Example</h2>
           <p>${word.sentence}</p>
         </div>
         <div class="">
           <h2 class="font-bold">সমার্থক শব্দ গুলো</h2>
           <div class="">${createElements(word.synonyms)}</div>
         </div>
         <div class="btn btn-primary">Complete Learning</div>
    `;
    document.getElementById("word_modal").showModal();
}

const displayLevelWord = (words) => {

       const wordContainer = document.getElementById("word-container");
       wordContainer.innerHTML = "";

       if(words.length == 0){
         wordContainer.innerHTML = `
         
        <div class="text-center col-span-full rounded-xl py-10 space-y-6">
            <img class="mx-auto" src="assets/alert-error.png" alt="">
            <p class="text-xl font-medium text-gray-600 bangla-font">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bold text-2xl bangla-font text-gray-600">নেক্সট Lesson এ যান</h2>
        </div>
         `;
         manageSpinner(false);
         return;
       }
       
       for(let word of words){
        const wordDiv = document.createElement("div");
        wordDiv.innerHTML = `
        
           <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-3">
            <h2 class="text-2xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <p class="text-2xl font-medium bangla-font">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"}"</p>

            <div class="btn flex justify-between items-center bg-white shadow-none border-none">
               
               <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>

               <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>

            </div>
       </div>
        
        `;

        wordContainer.append(wordDiv);
       };

       manageSpinner(false);
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
        
        <button id="lession-btn-${lession.level_no}" onclick="loadLevelWord(${lession.level_no})" class="btn btn-outline btn-primary lession-btn"><i class="fa-solid fa-book-open"></i>Lesson - ${lession.level_no}</button>
        
        `;

        //4- append into contaienr
        levelContainer.append(btnDiv);
    }
};

loadLessions();


document.getElementById("btn-search").addEventListener("click", () => {

    removeActive();
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue);

    fetch("https://openapi.programming-hero.com/api/words/all")

    .then((res) => res.json())
    .then((data) => {

        const allWords = data.data;
        console.log(allWords);

        const filterWords = allWords.filter(word => word.word.toLowerCase().includes(searchValue));

        displayLevelWord(filterWords);
    });
});