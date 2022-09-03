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
togleLoader(true)

const LoadNewsCatagory = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => newsCategory(data.data.news_category))
    .catch(error => console.log(error));
}


LoadNewsCatagory();

const newsCategory = catagories =>{

    const newsCategorySection = document.getElementById("news-catagories");
    
    catagories.forEach(catagory => {
        
        const newsCategoryDiv = document.createElement('div');
        newsCategoryDiv.classList.add('inline')
        newsCategoryDiv.innerHTML=`
        <button onclick="loadSingleCatagoryNews(${catagory.category_id}),togleLoader(true);" class="btn btn-ghost font-bold">${catagory.category_name}</button>
        `
        newsCategorySection.appendChild(newsCategoryDiv);
        togleLoader(false)

        // var catagoryName = catagory.category_name;
   
})}
loadSingleCatagoryNews(5);
function loadSingleCatagoryNews(categoryId){
    fetch(`https://openapi.programming-hero.com/api/news/category/0${categoryId}`)
    // fetch(`https://openapi.programming-hero.com/api/news/category/01`)
    .then(res => res.json())
    .then(data => displayNewse(data.data))
    .catch(error => console.log(error));
}

const displayNewse = newsForSingleCategories =>{

    const numberOfNews  = document.getElementById('number-of-news')
    numberOfNews.innerHTML=""
    const DivForNumberOFNews = document.createElement('div')
    const newsCard = document.getElementById('news-card');
    newsCard.innerHTML ='';

   

    newsForSingleCategories.forEach(newsForSingleCategorie => {
        const {author, details ,thumbnail_url,total_view,title,_id }= newsForSingleCategorie;  
        DivForNumberOFNews.innerHTML =`
        <p class=" text-2xl bg-white text-black border border-sky-500 mt-5 p-4 rounded-lg">${newsForSingleCategories.length ? newsForSingleCategories.length :console.log('NOOOOOOOOOOOO') } items found for this category </p>
        `
        numberOfNews.appendChild(DivForNumberOFNews)


             
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
      <div class="gid grid-cols-2 card card-side bg-base-100 shadow-xl mt-5">
      <figure class="col-span-2"><img class="h-80 w-72" src="${thumbnail_url}" alt="Movie"></figure>
      <div class="card-body col-span-2">
        <h2 class="card-title">${title ? title :"no data"}</h2>
        <p>${details.slice(0,400)}...</p>
        <div>
          <div class="grid grid-cols-3 items-center gap-8 font-bold">
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
    togleLoader(false);
        newsCard.appendChild(newsDiv);
        
    });
   
}


function modal(news_id){
    fetch(`https://openapi.programming-hero.com/api/news/${news_id}`)
    .then(res => res.json())
    .then(data => newsInModal(data.data))
    .catch(error => console.log(error));
    
}

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


