// Loader function
const togleLoader = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('hidden')
    }
    else{
        loaderSection.classList.add('hidden')
    }

}
// show spinner until load data
togleLoader(true)


// function to load every news category
const LoadNewsCatagory = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => newsCategory(data.data.news_category))
    .catch(error => console.log(error));
}

// call function to start loading news category
LoadNewsCatagory();

// load data for news for releted category
const loadSingleCatagoryNews = categoryId => {
    fetch(`https://openapi.programming-hero.com/api/news/category/0${categoryId}`)
    // fetch(`https://openapi.programming-hero.com/api/news/category/01`)
    .then(res => res.json())
    .then(data => displayNewse(data.data))
    .catch(error => console.log(error));
}

// load data to display single news in modal
const  modal= news_id =>{
    fetch(`https://openapi.programming-hero.com/api/news/${news_id}`)
    .then(res => res.json())
    .then(data => newsInModal(data.data))
    .catch(error => console.log(error));
    
}
// display all news category
const newsCategory = catagories =>{
    const newsCategorySection = document.getElementById("news-catagories");
  
    catagories.forEach(catagory => {        
        const newsCategoryDiv = document.createElement('div');
        newsCategoryDiv.classList.add('lg:inline', 'flex' ,'flex-col')
        newsCategoryDiv.innerHTML=`
        <button onclick="loadSingleCatagoryNews(${catagory.category_id}),togleLoader(true);" class="btn btn-ghost font-bold  ">${catagory.category_name}</button>`
        newsCategorySection.appendChild(newsCategoryDiv);

        // stop spinner after loaded every data
        togleLoader(false)
   
})}

// call function to load entertainment releted course  initialy
loadSingleCatagoryNews(5);


// display news in card
const displayNewse = newsForSingleCategories =>{

    const numberOfNews  = document.getElementById('number-of-news')
    numberOfNews.innerHTML=""
    const DivForNumberOFNews = document.createElement('div')
    const newsCard = document.getElementById('news-card');
    newsCard.innerHTML ='';

    // display how many news found for every category
    DivForNumberOFNews.innerHTML =`
    <p class=" lg:text-2xl bg-white text-black border border-sky-500 mt-5 p-4 rounded-lg">${newsForSingleCategories.length   ? newsForSingleCategories.length : 'no' } items found for this category </p>
    `;
    // sort data according to view
    numberOfNews.appendChild(DivForNumberOFNews);
    newsForSingleCategories.sort(function(a,b){
        return b.total_view - a.total_view;
    })
    
    // display news and authour details and other info
    newsForSingleCategories.forEach(newsForSingleCategorie => {
        const {author, details ,thumbnail_url,total_view,title,_id }= newsForSingleCategorie;     
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
      <div class=" flex flex-col lg:flex-row card card-side bg-base-100 shadow-xl mt-5">
      <figure class=""><img class="lg:h-80 lg:w-72  w-fit" src="${thumbnail_url}" alt="Movie"></figure>
      <div class="card-body ">
        <h2 class="card-title ">${title ? title :"no data"}</h2>
        <p  class="  ">${details.slice(0,300)}...</p>
        <div>
          <div class="grid grid-cols-1 lg:grid-cols-3 items-center gap-8 font-bold">
            <div id="author" class="flex gap-2">
              <div class="avatar">
                <div class="w-24 mask mask-squircle">
                  <img src="${author.img}" />
                </div>
              </div>
             <div class="m-2">
              <p class=" text-bold">${author.name ? author.name : "no data" }</p>
              <p>${author.published_date ?author.published_date :"no data"}</p>
             </div> 
            </div>
            <p class="text-2xl"><i class="fa-solid fa-eye"></i> ${total_view}</p>
            <label onclick="modal('${_id}')" for="my-modal-3" class="btn modal-button"><i   class=" text-2xl fa-solid fa-arrow-right-long"></i> </label>
          </div>
        </div>  
      </div>
    </div>    `
   
        newsCard.appendChild(newsDiv);
        
    });
    togleLoader(false);
}



// display single news in modal
const newsInModal = singleNewses=>{
    const modalContantHolder = document.getElementById("Modal-Contant-holder");
    modalContantHolder.innerHTML ='';
    singleNewses.forEach(singleNews => {
        const {author, details ,thumbnail_url,total_view,title,_id }= singleNews;
        
        const newDivInModal = document.createElement('div')
        newDivInModal.innerHTML=  `
        <h2 class="card-title mb-5">${title}</h2>
        <p class=" text-bold">${author.name ? author.name : "no data" }</p>
        <p>${author.published_date ?author.published_date :"no data"}</p>
        <p>${details}</p>
          `
        modalContantHolder.appendChild(newDivInModal)
        console.log(details)
    });
}


