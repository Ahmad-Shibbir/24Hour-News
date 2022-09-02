const LoadNewsCatagory = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => newsCategory(data.data.news_category));
}

LoadNewsCatagory();
const newsCategory = catagories =>{

    
    catagories.forEach(catagory => {
       console.log(catagory.category_name) 
   
})}
