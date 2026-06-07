/* LOGIN CHECK */

let loginUser =
JSON.parse(localStorage.getItem("loginUser"));

if(!loginUser){

    alert("Please login first");

    window.location.href =
    "login.html";

}

/* ROOM CAPACITY */
const roomCapacity = {

    "1283250": 2, // Deluxe

    "2150000": 3, // Premier

    "3850000": 4, // President

    "4950000": 5, // Royal

    "6250000": 6  // Royal President

};

/* PROMO LIST */
const promoList = {

    "TEST": {

        type: "percent",

        value: 50,

        expiry: "2024-01-01"

    },

    "LUXSTAY10": {

        type: "percent",

        value: 10,

        expiry: "2026-12-31",

        limit: 100

    },

    "WELCOME": {

        type: "fixed",

        value: 250000,

        expiry: "2026-12-31",

        limit: 5

    }

};

/* TODAY DATE */

const today = new Date();

const year = today.getFullYear();

const month =
String(today.getMonth() + 1)
.padStart(2,"0");

const day =
String(today.getDate())
.padStart(2,"0");

const minDate =
`${year}-${month}-${day}`;

document.getElementById("checkIn")
.setAttribute("min", minDate);

document.getElementById("checkOut")
.setAttribute("min", minDate);


/* CHECK OUT FOLLOW CHECK IN */

document.getElementById("checkIn")
.addEventListener("change", function(){

    document.getElementById("checkOut")
    .setAttribute(
        "min",
        this.value
    );

});


/* TOTAL PRICE */

function calculateTotal(){

    let total = 0;

    // ROOM
    let room =
    document.getElementById("room");

    let roomPrice =
    parseInt(room.value);

   let adult =
    parseInt(
    document.getElementById("adult").value
    ) || 0;

    let children =
    parseInt(
    document.getElementById("children").value
    ) || 0;

    let totalGuest =
    adult + children;

    let roomMax =
    roomCapacity[room.value] || 0;

    let extraBedNeeded = 0;

    if(totalGuest > roomMax){

    extraBedNeeded =
    totalGuest - roomMax;

    document.getElementById(
    "extraBed"
    ).checked = true;

}

else{

    document.getElementById(
    "extraBed"
    ).checked = false;

}

    // ROOM PRICE
    if(room.value != ""){

        total += roomPrice;

    }


    // EXTRA
    let extraTotal = 0;


    // AUTO EXTRA BED
    extraTotal +=
    extraBedNeeded * 300000;

    // BREAKFAST
    if(document.getElementById("breakfast").checked){

        extraTotal += 150000;

    }


    // SPA
    if(document.getElementById("spa").checked){

        extraTotal += 500000;

    }


    // HONEYMOON
    if(document.getElementById("honeymoon").checked){

        extraTotal += 1000000;

    }


    // ANNIVERSARY
    if(document.getElementById("anniversary").checked){

        extraTotal += 750000;

    }


    // KIDS
    if(document.getElementById("kids").checked){

        extraTotal += 250000;

    }


    // VIEW
    let viewPrice =
    parseInt(
        document.getElementById("view").value
    );

    extraTotal += viewPrice;


    // DATE
    let checkIn =
    document.getElementById("checkIn").value;

    let checkOut =
    document.getElementById("checkOut").value;


    let totalNight = 1;


    // TOTAL NIGHT
    if(checkIn && checkOut){

        let inDate =
        new Date(checkIn);

        let outDate =
        new Date(checkOut);

        let diffTime =
        outDate - inDate;

        totalNight =
        diffTime / (1000 * 60 * 60 * 24);

        if(totalNight <= 0){

            totalNight = 1;

        }

    }


    // ROOM X NIGHT
    total =
    total * totalNight;

    // EXTRA X NIGHT
    extraTotal =
    extraTotal * totalNight;

    // FINAL TOTAL
    total += extraTotal;


    // PROMO
    let promo =
    document.getElementById("promo")
    .value
    .toUpperCase();

    let promoUsage =
    JSON.parse(
    localStorage.getItem("promoUsage")
    ) || {};


    // DISCOUNT
    if(promoList[promo]){

    let today =
    new Date();

    let expiry =
    new Date(
    promoList[promo].expiry
    );

    let currentUsage =
    promoUsage[promo] || 0;

    if(
    currentUsage >=
    promoList[promo].limit
    ){

    alert(
    "❌ Promo Usage Limit Reached"
    );

    return;

}

    if(today <= expiry){

        if(
        promoList[promo].type
        === "percent"
        ){

            total =
            total -
            (
                total *
                promoList[promo].value
                / 100
            );

        }

        else if(
        promoList[promo].type
        === "fixed"
        ){

            total =
            total -
            promoList[promo].value;

        }

    }

    else{

         alert(
        "❌ Promo Expired"
        );

    }


}

    // NO NEGATIVE
    if(total < 0){

        total = 0;

    }

    //CAPACITY INFO
    if(extraBedNeeded > 0){

    document.getElementById("capacityInfo")
    .innerHTML =

    "⚠ Automatically Added " +

    extraBedNeeded +

    " Extra Bed";

    document.getElementById("capacityInfo")
    .style.color = "orange";

}

else{

    document.getElementById("capacityInfo")
    .innerHTML =

    "✅ Room Capacity Suitable";

    document.getElementById("capacityInfo")
    .style.color = "lightgreen";

}

    // STOCK INFO
    let selectedRoom = room.value;

    let bookings =
    JSON.parse(
    localStorage.getItem("bookings")
    ) || [];

    let usedRoom =
    bookings.filter(
    item =>
    item.roomCode === selectedRoom
    ).length;

    let stock =
    (roomStock[selectedRoom] || 0)
    - usedRoom;

    if(stock <= 0){

    document.getElementById("stockInfo")
    .innerHTML =

    "❌ Fully Booked";

    document.getElementById("stockInfo")
    .style.color = "red";

    document.getElementById(
    "confirmBookingBtn"
    ).disabled = true;

}

else if(stock === 1){

    document.getElementById(
    "confirmBookingBtn"
    ).disabled = false;

    document.getElementById("stockInfo")
    .innerHTML =

    "⚠ Last Room Available";

    document.getElementById("stockInfo")
    .style.color = "orange";

}

else{

    document.getElementById(
    "confirmBookingBtn"
    ).disabled = false;

    document.getElementById("stockInfo")
    .innerHTML =

    "🏨 Available Room : " +

    stock;

    document.getElementById("stockInfo")
    .style.color = "#4CAF50";

}

    // SHOW TOTAL
    document.getElementById("total")
    .innerHTML =

    "Total : " +

    total.toLocaleString("id-ID")

    + " IDR";

}


/* AUTO UPDATE */

document
.querySelectorAll("input, select")
.forEach(item => {

    item.addEventListener(
        "change",
        calculateTotal
    );

});


document.getElementById("promo")
.addEventListener(
    "input",
    calculateTotal
);


/* ROOM AVAILABILITY */

let fullDates = [

    "2026-05-25",
    "2026-05-26"

];

let lastRoomDates = [

    "2026-05-20",
    "2026-05-21"

];

let roomStock = {

    "1283250": 10, // Deluxe

    "2150000": 8, // Premier

    "3850000": 5, // President

    "4950000": 3, // Royal

    "6250000": 1 // Royal President

};


document.getElementById("checkIn")
.addEventListener(
    "change",
    function(){

        let selected =
        this.value;

        let info =
        document.getElementById("dateInfo");


        // FULL
        if(fullDates.includes(selected)){

            info.innerHTML =
            "❌ Fully Booked";

            info.style.color =
            "red";

            this.value = "";

            return;

        }


        // LAST ROOM
        if(lastRoomDates.includes(selected)){

            info.innerHTML =
            "⚠ Last Room Available";

            info.style.color =
            "orange";

        }

        else{

            info.innerHTML =
            "✅ Room Available";

            info.style.color =
            "lightgreen";

        }

    }
);


/* SAVE BOOKING */

function saveBooking(){

    let room =
    document.getElementById("room").value;

    let checkIn =
    document.getElementById("checkIn").value;

    let checkOut =
    document.getElementById("checkOut").value;


    if(
        room === "" ||
        checkIn === "" ||
        checkOut === ""
    ){

        alert("Please fill all fields");

        return;

    }

    if(
    room === "" ||
    checkIn === "" ||
    checkOut === ""
){

    alert("Please fill all fields");

    return;

}

   let adult =
    parseInt(
    document.getElementById("adult").value
    ) || 0;

    let children =
    parseInt(
    document.getElementById("children").value
    ) || 0;

    let totalGuest =
    adult + children;

    let roomMax =
    roomCapacity[room] || 0;

    let extraBedNeeded = 0;

    let bookings =

    JSON.parse(
    localStorage.getItem("bookings")
    ) || [];

    let bookingCounter =

    parseInt(
    localStorage.getItem(
    "bookingCounter"
    )
    ) || 36;

    let bookingId =

    "BK-" +

    String(
    bookingCounter
    ).padStart(3,"0");

    localStorage.setItem(
    "bookingCounter",
    bookingCounter + 1
    );
 

    let bookingData = {

        bookingId:
        bookingId,

        room:

        document.getElementById("room")
        .options[
            document.getElementById("room")
            .selectedIndex
        ].text,

        roomCode:
        room,

        customer:
        loginUser.username,

        checkIn:
        checkIn,

        checkOut:
        checkOut,

        adults:
        document.getElementById("adult").value,

        children:
        document.getElementById("children").value,

        extraBed:
        extraBedNeeded,

        payment:
        document.getElementById("paymentMethod").value,

        promo:
        document.getElementById("promo").value,

        view:
        document.getElementById("view")
        .options[
            document.getElementById("view")
            .selectedIndex
        ].text,

        total:
        document.getElementById("total").innerText,

        status:
        "Unpaid"

    };

    bookings.push(bookingData);

    let promo =
    document.getElementById("promo")
    .value
    .toUpperCase();

    if(promoList[promo]){

    let promoUsage =
    JSON.parse(
    localStorage.getItem("promoUsage")
    ) || {};

    promoUsage[promo] =
    (promoUsage[promo] || 0) + 1;

    localStorage.setItem(

        "promoUsage",

        JSON.stringify(promoUsage)

    );

}

    localStorage.setItem(

        "bookings",

        JSON.stringify(bookings)

    );


    alert("Booking Success");


    window.location.href =
    "../../index.html";

}


/* FIRST LOAD */

calculateTotal();