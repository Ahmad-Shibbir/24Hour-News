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

        <button class="btn btn-ghost ">${catagory.category_name}</button>
        `
        newsCategorySection.appendChild(newsCategoryDiv);
       console.log(catagory.category_name) 
   
})}
