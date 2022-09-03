// Fetching category from the API link
const loadCategory = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayCategory(data.data.news_category)
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
const displayCategory = (data) =>{
    data.forEach(category => {
        console.log(category.category_name);
        const li = document.createElement('li');
        li.classList.add("nav-item");
        li.classList.add("ms-5");
        li.innerHTML = `
        <a class="nav-link" aria-current="page" href="#">${category.category_name}</a>
        `;
        navBarList.appendChild(li);
    });
}
loadCategory()