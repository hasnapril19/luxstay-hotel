/* =====================================
   ROOM SLIDER
===================================== */

const wrapper =
document.getElementById("roomWrapper");

const cards =
document.querySelectorAll(".room-card");

let currentIndex = 3;

function updateActiveCard(){

    cards.forEach((card)=>{

        card.classList.remove(
            "active-room"
        );

    });

    cards[currentIndex].classList.add(
        "active-room"
    );

}

function updateSlider(){

    const cardWidth =
    cards[0].offsetWidth + 25;

    const containerWidth =
    wrapper.offsetWidth;

    const centerPosition =
    (currentIndex * cardWidth)
    -(containerWidth / 2)
    + (cardWidth / 2);

    wrapper.scrollTo({
        left:centerPosition,
        behavior:"smooth"
    });

    updateActiveCard();

}

function nextRoom(){

    if(currentIndex < cards.length - 1){

        currentIndex++;

        updateSlider();

    }

}

function prevRoom(){

    if(currentIndex > 0){

        currentIndex--;

        updateSlider();

    }

}

window.addEventListener(
    "load",
    function(){

        currentIndex = 2; // President Suite

        setTimeout(()=>{
            updateSlider();
        },100);

    }
);

/* =====================================
   LOGIN NAVBAR
===================================== */

const loginBtn =
document.getElementById("login-btn");

const loginUser =
JSON.parse(
    localStorage.getItem("loginUser")
);

if(loginBtn){

    if(loginUser){

        loginBtn.innerHTML =
        "Logout";

        loginBtn.href = "#";

        loginBtn.addEventListener(

            "click",

            function(e){

                e.preventDefault();

                localStorage.removeItem(
                    "loginUser"
                );

                alert("Logout Success");

                window.location.reload();

            }

        );

    }

    else{

        loginBtn.innerHTML =
        "Login";

        loginBtn.href =
        "pages/client/login.html";

    }

}


/* =====================================
   BOOKING SYSTEM
===================================== */

let selectedRoom="";
function bookRoom(roomName){

    const user =
    JSON.parse(
        localStorage.getItem("loginUser")
    );

    if(!user){

        alert("Please login first");
        return;

    }

    selectedRoom = roomName;

    const today = new Date().toISOString().split("T")[0];

    document.getElementById(
        "bookingDate"
    ).min = today;

    document.getElementById(
        "bookingModal"
    ).style.display = "flex";

}

function closeBooking(){

    document.getElementById(
        "bookingModal"
    ).style.display = "none";

}

function confirmBooking(){

    const bookingDate =
    document.getElementById(
        "bookingDate"
    ).value;

    if(!bookingDate){

        alert("Please select booking date");
        return;

    }

    const user =
    JSON.parse(
        localStorage.getItem("loginUser")
    );

    let bookings =
    JSON.parse(
        localStorage.getItem("bookings")
    ) || [];

    bookings.push({

        name:user.name,
        email:user.email,
        room:selectedRoom,
        date:bookingDate,
        status:"Success"

    });

    localStorage.setItem(
        "bookings",
        JSON.stringify(bookings)
    );

    closeBooking();

    alert("Booking Success!");

}

/* =====================================
   GOOGLE MAPS
===================================== */

function openMaps(){

    window.open(

        "https://www.google.com/maps",

        "_blank"

    );

}


/* =====================================
   SMOOTH SCROLL
===================================== */

const links =
document.querySelectorAll(
    'a[href^="#"]'
);

links.forEach((link)=>{

    link.addEventListener(

        "click",

        function(e){

            const target =
            document.querySelector(
                this.getAttribute("href")
            );

            if(target){

                e.preventDefault();

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        }

    );

});


/* =====================================
   NAVBAR EFFECT
===================================== */

window.addEventListener(

    "scroll",

    function(){

        const navbar =
        document.querySelector(".navbar");

        if(navbar){

            if(window.scrollY > 50){

                navbar.style.background =
                "rgba(0,0,0,0.9)";

            }

            else{

                navbar.style.background =
                "rgba(0,0,0,0.5)";

            }

        }

    }

);


/* =====================================
   REVIEW SYSTEM
===================================== */

let selectedRating = 5;

let reviews =
JSON.parse(
    localStorage.getItem("reviews")
) || [

    {
        name:"Sophia Lauren",
        message:"Amazing luxury experience!",
        rating:5
    },

    {
        name:"Michael James",
        message:"Best luxury hotel ever.",
        rating:5
    }

];


/* SHOW REVIEWS */

function showReviews(){

    const reviewContainer =
    document.getElementById(
        "reviewContainer"
    );

    if(!reviewContainer) return;

    reviewContainer.innerHTML = "";

    reviews.forEach((review)=>{

        let starsHTML = "";

        for(let i = 0; i < review.rating; i++){

            starsHTML += "★";

        }

        reviewContainer.innerHTML += `

        <div class="review-card">

            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png">

            <h3>${review.name}</h3>

            <div class="stars">
                ${starsHTML}
            </div>

            <p>${review.message}</p>

        </div>

        `;

    });

}

showReviews();


/* STAR CLICK */

window.addEventListener("load", function(){

    const stars =
    document.querySelectorAll(".star");

    stars.forEach((star, index)=>{

        star.addEventListener("click", ()=>{

            selectedRating = index + 1;

            stars.forEach((s, i)=>{

                if(i < selectedRating){

                    s.classList.add("active");

                }else{

                    s.classList.remove("active");

                }

            });

        });

    });

});



/* ADD REVIEW */

function addReview(){

    const name =
    document.getElementById(
        "reviewName"
    ).value;

    const text =
    document.getElementById(
        "reviewText"
    ).value;

    if(name === "" || text === ""){

        alert("Please fill all fields!");

        return;

    }

    let starsHTML = "";

    for(let i = 0; i < selectedRating; i++){

        starsHTML += "★";

    }

    const newReview = {

    name: name,
    message: text,
    rating: selectedRating

};

reviews.push(newReview);

localStorage.setItem(
    "reviews",
    JSON.stringify(reviews)
);

showReviews();

document.getElementById(
    "reviewName"
).value = "";

document.getElementById(
    "reviewText"
).value = "";

selectedRating = 5;

document.querySelectorAll(".star")
.forEach((star)=>{

    star.classList.add("active");

});

alert("Review Added!");

}

function openRoomDetail(room){

    if(room === "deluxe"){

        window.location.href =
        "pages/client/deluxe-room.html";

    }

    else if(room === "premier"){

        window.location.href =
        "pages/client/premier-room.html";

    }

    else if(room === "president"){

        window.location.href =
        "pages/client/president-room.html";

    }

    else if(room === "royal"){

        window.location.href =
        "pages/client/royal-room.html";

    }

    else if(room === "royal-president"){

        window.location.href =
        "pages/client/royal-president-room.html";

    }

}

setInterval(() => {

    nextRoom();

    if(currentIndex >= cards.length - 1){

        currentIndex = -1;

    }

}, 3000);