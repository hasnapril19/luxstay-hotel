let bookings =
JSON.parse(
localStorage.getItem("bookings")
) || [];

let paidCount =
bookings.filter(
item => item.status === "Paid"
).length;

let unpaidCount =
bookings.filter(
item => (item.status || "Unpaid") === "Unpaid"
).length;

let checkedInCount =
bookings.filter(
item => item.status === "Checked In"
).length;

let checkedOutCount =
bookings.filter(
item => item.status === "Checked Out"
).length;

let cancelledCount =
bookings.filter(
item => item.status === "Cancelled"
).length;

let revenue = 0;

bookings.forEach(item => {

if(
    item.status === "Paid" ||
    item.status === "Checked In" ||
    item.status === "Checked Out"
){

    let amount =
    parseInt(
    (item.total || "")
    .replace("Total : ","")
    .replace(" IDR","")
    .replace(/\./g,"")
    ) || 0;

    revenue += amount;

}

});

document.getElementById("totalBooking").innerHTML =
`Total Booking : ${bookings.length}`;

document.getElementById("paidBooking").innerHTML =
`Paid : ${paidCount}`;

document.getElementById("unpaidBooking").innerHTML =
`Unpaid : ${unpaidCount}`;

document.getElementById("checkedInBooking").innerHTML =
`Checked In : ${checkedInCount}`;

document.getElementById("checkedOutBooking").innerHTML =
`Checked Out : ${checkedOutCount}`;

document.getElementById("cancelledBooking").innerHTML =
`Cancelled : ${cancelledCount}`;

document.getElementById("totalRevenue").innerHTML =
`Revenue : ${revenue.toLocaleString("id-ID")} IDR`;

let table =
document.getElementById(
"bookingTable"
);

bookings.forEach((item,index) => {

let status =
item.status || "Unpaid";

table.innerHTML += `

<tr>

    <td>${item.bookingId || "-"}</td>
    <td>${item.customer || "-"}</td>
    <td>${item.room || "-"}</td>
    <td>${item.checkIn || "-"}</td>
    <td>${item.checkOut || "-"}</td>
    <td>${item.payment || "-"}</td>
    <td>${item.total || "-"}</td>

    <td>

<div class="status-action">

<select
class="status-select status-${status
.replaceAll(" ","")
.toLowerCase()}"
onchange="updateStatus(${index},this.value,this)">

    <option value="Unpaid"
    ${status === "Unpaid" ? "selected" : ""}>
    Unpaid
    </option>

    <option value="Paid"
    ${status === "Paid" ? "selected" : ""}>
    Paid
    </option>

    <option value="Checked In"
    ${status === "Checked In" ? "selected" : ""}>
    Checked In
    </option>

    <option value="Checked Out"
    ${status === "Checked Out" ? "selected" : ""}>
    Checked Out
    </option>

    <option value="Cancelled"
    ${status === "Cancelled" ? "selected" : ""}>
    Cancelled
    </option>

</select>

<button
class="delete-btn"
onclick="deleteBooking(${index})">
Delete
</button>

</div>

</td>

</tr>

`;

});

function updateStatus(index, status){

    bookings[index].status = status;

    localStorage.setItem(
        "bookings",
        JSON.stringify(bookings)
    );

    event.target.className =
    "status-select status-" +
    status.replace(" ","")
    .toLowerCase();

    location.reload();

}

function deleteBooking(index){

        bookings.splice(index,1);

        localStorage.setItem(
            "bookings",
            JSON.stringify(bookings)
        );

        location.reload();

    }

document
.getElementById("searchBooking")
.addEventListener(
"keyup",
function(){

let keyword =
this.value.toLowerCase();

let rows =
document.querySelectorAll(
"#bookingTable tr"
);

rows.forEach(row => {

    if(
    row.innerText
    .toLowerCase()
    .includes(keyword)
    ){

        row.style.display = "";

    }

    else{

        row.style.display = "none";

    }

});

});