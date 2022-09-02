const LoadNewsCatagory = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => newsCategory(data.data.news_category));
}

LoadNewsCatagory();
const newsCategory = catagories =>{

    
    catagories.forEach(catagory => {
        const newsCategorySection = document.getElementById("news-catagories");
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
    newsForSingleCategories.forEach(newsForSingleCategorie => {
        const {author, details ,image_url,rating }= newsForSingleCategorie;

        console.log(details,author,image_url)
    });
   
}