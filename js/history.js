let bookings =
JSON.parse(localStorage.getItem("bookings"))
|| [];

let loginUser =
JSON.parse(localStorage.getItem("loginUser"));

let myBookings =
bookings.filter(
    item =>
    item.customer === loginUser.username
);

let historyList =
document.getElementById("historyList");

if(myBookings.length === 0){

    historyList.innerHTML =

    `
    <p style="
    text-align:center;
    color:white;
    font-size:22px;
    ">
    No Booking Yet
    </p>
    `;

}else{

    myBookings.forEach((item)=>{

        historyList.innerHTML +=

        `
        <div class="history-card">

            <h2>${item.room}</h2>

            <p>
            <b>Guest :</b>
            ${item.customer}
            </p>

            <p>
            <b>Check In :</b>
            ${item.checkIn}
            </p>

            <p>
            <b>Check Out :</b>
            ${item.checkOut}
            </p>

            <p>
            <b>Adults :</b>
            ${item.adults}
            </p>

            <p>
            <b>Children :</b>
            ${item.children}
            </p>

            <p>
            <b>Extra Bed :</b>
            ${item.extraBed}
            </p>

            <p>
            <b>Payment :</b>
            ${item.payment}
            </p>

            <p>
            <b>View :</b>
            ${item.view}
            </p>

            <p>
            <b>Total :</b>
            ${item.total}
            </p>

            <p>
            <b>Status :</b>
            ${item.status}
            </p>

        </div>
        `;

    });

}