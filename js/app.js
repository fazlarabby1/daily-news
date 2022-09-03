document.getElementById('load-spinner').style.display = 'none';
document.getElementById('bottom').style.display= 'none';
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
}

// Showing category in the menu list
const navBarList = document.getElementById('navbarItems');
const displayCategory = async () =>{
    const data = await loadCategory()
    data.forEach(category => {
        const li = document.createElement('li');
        li.classList.add("nav-item");
        li.classList.add("ms-5");
        li.innerHTML = `
        <a class="nav-link" onclick="showListItemDetails('${category.category_id}', '${category.category_name}')" aria-current="page" href="#">${category.category_name}</a>
        `;
        navBarList.appendChild(li);
        
    });
}

// News Details inside card body
const showListItemDetails =  async(categoryID, category_name) =>{
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryID}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayNews(data.data))
    document.getElementById('load-spinner').style.display = 'block';
    document.getElementById('spinner-section').style.height = '25rem';
    document.getElementById('bottom').style.display= 'block';
    const  newsCards= document.getElementById('news-cards');
    newsCards.textContent = "";
    const displayNews = (items) =>{
        document.getElementById('load-spinner').style.display = 'none';
        document.getElementById('spinner-section').style.height = 0;

        // //Showing total news found result
        const totalNews = document.getElementById('total-news');
        if(items.length > 0){
            totalNews.innerHTML = `
            <h3 class="px-5 py-2">${items.length} Items found for category ${category_name}</h3>
        `;
        }
        else{
            totalNews.innerHTML=`
            <h3 class="px-5 py-2">Sorry!! No items available for category ${category_name}</h3>
            `
        }
        items.forEach(item => {
        // console.log(item);
        const {thumbnail_url, title, details, rating, author, total_view} = item;
        const cadrDiv = document.createElement('div');

        // Adding details in the card body
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
                        <p class="text-dark"><i class="fa-regular fa-eye me-3"></i>${total_view ? total_view : 'N/A'}</p>
                        <p class="text-dark"><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star me-3"></i> ${rating.number}</p>
                        <button type="button" class="btn btn-primary" onclick='showModal("${thumbnail_url}" , "${title}")' data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <i class="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;
        newsCards.appendChild(cadrDiv);
    });
    }
}

// Modal Body
const showModal = (thumbnail_url, title) =>{
    // console.log(thumbnail_url, title);
    const modalDetails = document.getElementById('modal-details');
    modalDetails.textContent = "";
    modalDetails.innerHTML=`
    <img src="${thumbnail_url}" />
    <h5 class="modal-title">${title}</h5>
    `;
}
displayCategory();