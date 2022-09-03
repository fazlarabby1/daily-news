// Fetching category from the API link
const loadCategory = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        return (data.data.news_category);
    }
    catch{
        error => console.error(error);
    }
    // fetch(url)
    // .then(res => res.json())
    // .then(data => displayCategory(data.data.news_category))
}

// Showing category in the menu list
const navBarList = document.getElementById('navbarItems');
const displayCategory = async () =>{
    const data = await loadCategory()
    // console.log(data);
    data.forEach(category => {
        // console.log(category.category_name);
        const li = document.createElement('li');
        li.classList.add("nav-item");
        li.classList.add("ms-5");
        li.innerHTML = `
        <a class="nav-link" onclick="showListItemDetails('${category.category_id}')" aria-current="page" href="#">${category.category_name}</a>
        `;
        navBarList.appendChild(li);
        
    });
}

const showListItemDetails =  (categoryID) =>{
    // console.log(categoryID);
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryID}`;
    // try{
    //     const res = await fetch(url);
    //     const data = await res.json();
    //     const itemsArray =  data.data;
    //     // console.log(itemsArray)
    //     return itemsArray
    // }
    // catch{
    //     error=> console.log(error);
    // }

    // const newsCards = document.getElementById('news-cards');
    fetch(url)
    .then(res => res.json())
    .then(data => displayNews(data.data))
    const  newsCards= document.getElementById('news-cards');
    const displayNews = (items) =>{
        // const itemsArray = data.data;
        items.forEach(item => {
        // console.log(item)
        const cadrDiv = document.createElement('div');

    });
    }
    

}

displayCategory()

