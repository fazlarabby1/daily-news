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

const showListItemDetails =  async(categoryID) =>{
    // console.log(categoryID);
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryID}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayNews(data.data))
    const  newsCards= document.getElementById('news-cards');
    newsCards.textContent = "";
    const displayNews = (items) =>{
        // const itemsArray = data.data;
        items.forEach(item => {
        console.log(item);
        const {thumbnail_url, title, details, rating, author, total_view} = item;
        const cadrDiv = document.createElement('div');
        cadrDiv.innerHTML = `
        <div class="card mb-4 shadow-lg">
            <div class="row g-0">
                <div class="col-md-3">
                    <img src="${thumbnail_url}" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${details.length > 600 ? details.slice(0,600) + '<span class="ms-5 fw-semibold">...read more</span>' : details}</p>
                    </div>
                    <div class="card-body bg-white d-flex justify-content-around align-items-center">
                        <p class="text-dark"><img class="rounded rounded-circle" style="width: 40px; height: 40px" src="${author.img}" alt="..."> ${author.name ? author.name : 'N/A'}</p>
                        <p class="text-dark"><i class="fa-regular fa-eye me-3"></i>${total_view}</p>
                        <p class="text-dark"><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star me-3"></i> ${rating.number}</p>
                        <p class= "btn btn-primary"><i class="fa-solid fa-arrow-right"></i></p>
                    </div>
                </div>
            </div>
        </div>
        `;
        newsCards.appendChild(cadrDiv);
        

    });
    }
    

}

displayCategory()

