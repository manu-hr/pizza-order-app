// Reuse the solution created to dynamically create order form fields developed 
// in the previous sprint challenge
// Write solution code here to dynamically add the form fields
var count = 1;
var totalAmount = 0;
const order = {
    items:[]
};

const url = 'http://localhost:3002/order';


function addOrder() {
  console.log("Hi");
  let orderInputForm = `
    <tr>
        <td>
            <input type="text" name="categoryName" id="categoryName${count}" width="20px" required>
        </td>
        <td>
            <input type="text" name="itemName" id="itemName${count}" width="20px" required>
        </td>
        <td>
            <input type="number" name="price" id="price${count}" onchange="calculateAmount(event)" width="20px" required>
        </td>
        <td>
            <input type="number"  name="quantity" id="quantity${count}" onchange="calculateAmount(event)" width="20px" required>
        </td>
        <td>
            <input type="number" name="amount" id="amount${count}" width="20px" readonly value="0" required>
        </td>
        <td>
        <button
            id="button${count}"
            type="button"
            onclick="addOrderItems(event)"
            class="button buttonCircle"
        >
            ADD
      </button>

        </td>
    </tr>

    `;

  let tableBody = document.getElementById("orderBody");
  let orderRow = document.createElement("tr");
  orderRow.innerHTML = orderInputForm;
  tableBody.append(orderRow);
  ++count;
}

function calculateAmount(event) {
  console.log("Hello");
  console.log(event.target.id);
  let id = event.target.id;
  let idCount = id.match(/\d/g);
  idCount = idCount.join("");
  console.log(idCount);
  let amount =
    document.getElementById(`price${idCount}`).value *
    document.getElementById(`quantity${idCount}`).value;
  console.log(amount);
  if (amount != NaN) {
    document.getElementById(`amount${idCount}`).value = amount;
    totalAmount += amount;
  }
}

function onSubmit(event) {
    let errorList = document.getElementById('error-msg');

    event.preventDefault();
    var isValid = true;

    const formData = new FormData(document.getElementById('detailsForm'));
    const formProps = Object.fromEntries(formData);
    const {contact, customerName, emailId, orderDate, orderId, totalAmount} = formProps;
    console.log(formProps);

    while (errorList.firstChild) {
        errorList.removeChild(errorList.lastChild);
    }

    if(!checkValidMobileNumber(contact)) {
        isValid = false;
        addError("Invalid Mobile Number")
        return
    }else {
        isValid = true;
    }

    if(orderDate == ""){
        isValid = false;
        addError("Please Select Date")
        return
    }else {
        isValid = true;
    }

    if(isValid) {
        while (errorList.firstChild) {
            errorList.removeChild(errorList.lastChild);
        }

        saveOrder(formProps)
        
    }
}

function addOrderItems(e) {

    console.log(e.target);
    let id = e.target.id;
    let idCount = id.match(/\d/g);
    idCount = idCount.join("");
    console.log(idCount);
    let categoryName = document.getElementById(`categoryName${idCount}`);
    let itemName = document.getElementById(`itemName${idCount}`);
    let price = document.getElementById(`price${idCount}`);
    let quantity = document.getElementById(`quantity${idCount}`);
    let amount = document.getElementById(`amount${idCount}`);

    let tempObj = {
        'category Name' : categoryName.value,
        'item Name' :  itemName.value,
        'price' :  price.value,
        'quantity' :  quantity.value,
        'amount' : amount.value
    };

    categoryName.readOnly = true;
    itemName.readOnly = true;
    price.readOnly = true;
    quantity.readOnly = true;
    amount.readOnly = true;

    document.getElementById(`totalAmount`).value = totalAmount;


    order.items.push(tempObj);

    console.log(order);

}

// Save the order details on clicking the submit button


//Save the order details captured from the form in json-server using Axios API

function checkEmailValidity(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function checkValidMobileNumber(contact) {
    console.log(contact);
    const re=/^([+]\d{2})?0?\d{10}$/
    console.log(re.test(String(contact)));
    return re.test(String(contact))
}

function addError(errText){
    let errorList = document.getElementById('error-msg');
    let listItem = document.createElement("li");
    listItem.innerHTML = errText;
    errorList.appendChild(listItem)
}

function saveOrder(formProps) {
    const { orderId, customerName, emailId, contact, orderDate, address, totalAmount } = formProps;

    order.orderId = orderId;
    order.customerName = customerName;
    order.emailId = emailId;
    order.contact = contact;
    order.orderDate = orderDate;
    order.address = address;
    order.totalAmount = totalAmount

    console.log(order);

    const postPromise = axios.post(url, order);
    postPromise.then(res => {
        alert(`Order Added\n Total Amount to be Paid is ${totalAmount}`)
    }).catch(err =>{
        alert("Failed To Add The Order")
    })

}