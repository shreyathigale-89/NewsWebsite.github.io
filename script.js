const Apikey = "b85c621a15msh8a3a9117ff8950cp155b04jsnb668e5ed7495";
let categories;

function getnews(categories) {

    fetch(`https://newscatcher.p.rapidapi.com/v1/latest_headlines?topic=${categories}&lang=en&media=True`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": Apikey,
            "x-rapidapi-host": "newscatcher.p.rapidapi.com"
        }
    })
        .then(response => response.json())

        .then(response => {
            for (var i = 0; i < response.articles.length; i++) {

                document.getElementById("NewsList").innerHTML +=

                    `<div class="news_card" id="news_card">
                <img src=${response.articles[i].media} alt="" onerror=this.src="img8.jpg">
                <div class="container" id="container">
                <h5><strong>${response.articles[i].title}<strong></h5>
                    <button><a href=${response.articles[i].link} target="_blank">Read More <i class="fas fa-angle-double-right"></i></a></button>
                   </div>
               </div>`
                document.querySelector('#contact').style.display = 'block';
            }
        })
    document.getElementById("NewsList").innerHTML = ""
}


/*---Search bar function----*/

window.onload = function () {

    const searchInputBox = document.getElementById('input-box');

    //Event Listner function on keypress
    searchInputBox.addEventListener('keypress', (event) => {

        if (event.keyCode == 13) {
            if (searchInputBox.value.length < 3) {
                alertbox();
            }
            else {
                GetNewsReport(searchInputBox.value);
            }
        }
    });

    //Get News Report

    function GetNewsReport(title) {

        fetch(`https://newscatcher.p.rapidapi.com/v1/search?q=${title}&lang=en&sort_by=relevancy&page=1&media=True`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": Apikey,
                "x-rapidapi-host": "newscatcher.p.rapidapi.com"
            }
        })

            .then(articles => {
                 return articles.json();
              })

            .then(response => {
                for (var i = 0; i < response.articles.length; i++) {
                    document.getElementById("NewsList").innerHTML +=

                        `<div class="news_card" id="news_card">
                <img src=${response.articles[i].media} alt="">
                <div class="container" id="container">
                <h5><strong>${response.articles[i].title}<strong></h5>
                  <button><a id="read" target="_blank" href=${response.articles[i].link} target="_blank">Read More</a></button>
                   </div>
                </div>`                
                }
            })

            .catch(function() {
                 document.getElementById("home").innerHTML = 
                     `<p class="error">No match found for the requested search!</p>`
            })
         
           document.getElementById("NewsList").innerHTML = ""
    }
}

function alertbox()
{
    document.getElementById('customAlert').style.display = 'block';
    document.getElementById('navbar').style.opacity= '0.7';
    document.getElementById('home').style.opacity= '0.7';
}

function confirm()
{
    document.getElementById('customAlert').style.display = 'none';
    document.getElementById('navbar').style.opacity= '1';
    document.getElementById('home').style.opacity= '1';
}

/*----for responsive navbar-----*/ 

