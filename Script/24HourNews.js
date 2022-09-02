const LoadNewsCatagory = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => newsCategory(data.data.news_category));
}

LoadNewsCatagory();
const newsCategory = catagories =>{

    const newsCategorySection = document.getElementById("news-catagories");
    catagories.forEach(catagory => {
        
        const newsCategoryDiv = document.createElement('div');
        newsCategoryDiv.classList.add('inline')
        newsCategoryDiv.innerHTML=`
        <button onclick="loadSingleCatagoryNews(${catagory.category_id})" class="btn btn-ghost ">${catagory.category_name}</button>
        `
        newsCategorySection.appendChild(newsCategoryDiv);
        console.log(catagory.category_name) 
   
})}

function loadSingleCatagoryNews(categoryId){
    fetch(`https://openapi.programming-hero.com/api/news/category/0${categoryId}`)
    // fetch(`https://openapi.programming-hero.com/api/news/category/01`)
    .then(res => res.json())
    .then(data => displayNewse(data.data));
    console.log(categoryId,'helooooooooooooooooooooooooooooo')
}

const displayNewse = newsForSingleCategories =>{
    const newsCard = document.getElementById('news-card');
    newsCard.innerHTML ='';
    newsForSingleCategories.forEach(newsForSingleCategorie => {

        const {author, details ,thumbnail_url,total_view,title,_id }= newsForSingleCategorie;        
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
      <div class="gid grid-cols-2 card card-side bg-base-100 shadow-xl mt-5">
      <figure class="col-span-2"><img class="h-80 w-72" src="${thumbnail_url}" alt="Movie"></figure>
      <div class="card-body col-span-2">
        <h2 class="card-title">${title}</h2>
        <p>${details}</p>
        <div>
          <div class="grid grid-cols-3 items-center gap-8 font-bold">
            <div id="author" class="flex gap-2">
              <div class="avatar">
                <div class="w-24 mask mask-squircle">
                  <img src="${author.img}" />
                </div>
              </div>
             <div class="m-2">
              <p class=" text-bold">${author.name}</p>
              <p>${author.published_date}</p>
             </div> 
            </div>
            <p class="text-2xl"><i class="fa-solid fa-eye"></i> ${total_view}</p>
            <label for="my-modal-3" class="btn modal-button"><i   class=" text-2xl fa-solid fa-arrow-right-long"></i> </label>
           
          </div>
        </div>
        
      </div>
      
    </div>    `
        newsCard.appendChild(newsDiv);
    });
   
}


function modal(news_id){
    fetch(`https://openapi.programming-hero.com/api/news/${news_id}`)
    .then(res => res.json())
    .then(data => newsInModal(data.data));
    
}

const newsInModal = singleNewses=>{
    // singleNewses.forEach(singleNews => {
    //     console.log(singleNews)
    // });
}