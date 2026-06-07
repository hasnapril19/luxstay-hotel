/* ADMIN LOGIN CHECK */

if(
localStorage.getItem("adminLogin")
!== "true"
){

    alert("Access Denied");

    window.location.href =
    "../client/login.html";

}


/* GET BOOKINGS */

let bookings =
JSON.parse(localStorage.getItem("bookings"))
|| [];

let adminBookings =
document.getElementById("adminBookings");


/* SHOW BOOKINGS */

function showBookings(){

    adminBookings.innerHTML = "";

    if(bookings.length === 0){

        adminBookings.innerHTML =

        `
        <p style="
        color:white;
        text-align:center;
        font-size:25px;
        ">
        No Booking Yet
        </p>
        `;

        return;
    }

    bookings.forEach((booking,index)=>{

        let statusClass =
        booking.status === "Paid"
        ? "paid"
        : "pending";

        adminBookings.innerHTML += `

        <div class="history-card">

            <h2>${booking.room}</h2>

            <p>
            <b>Customer :</b>
            ${booking.customer}
            </p>

            <p>
            <b>Check In :</b>
            ${booking.checkIn}
            </p>

            <p>
            <b>Check Out :</b>
            ${booking.checkOut}
            </p>

            <p>
            <b>Adults :</b>
            ${booking.adults}
            </p>

            <p>
            <b>Children :</b>
            ${booking.children}
            </p>

             <p>
            <b>Extra Bed :</b>
            ${item.extraBed}
            </p>


            <p>
            <b>Payment :</b>
            ${booking.payment}
            </p>

            <p>
            <b>View :</b>
            ${booking.view}
            </p>

            <p>
            <b>Total :</b>
            ${booking.total} IDR
            </p>

            <div class="status ${statusClass}">
                ${booking.status}
            </div>

            <br>

            <button
            onclick="paidBooking(${index})">

            Mark As Paid

            </button>

            <button
            onclick="rejectBooking(${index})">

            Reject

            </button>

        </div>

        `;

    });

}


/* PAID */

function paidBooking(index){

    bookings[index].status = "Paid";

    localStorage.setItem(
        "bookings",
        JSON.stringify(bookings)
    );

    showBookings();

}


/* REJECT */

function rejectBooking(index){

    let confirmDelete =
    confirm("Reject this booking?");

    if(confirmDelete){

        bookings.splice(index,1);

        localStorage.setItem(
            "bookings",
            JSON.stringify(bookings)
        );

        showBookings();
    }

}

showBookings();