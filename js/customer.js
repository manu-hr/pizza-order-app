const url = 'http://localhost:3000/customers';
const errorList = document.getElementById('error-msg');


//Write  password validation code here 
function setPasswordConfirmValidity(custPasword, custConfirmPassword) {
    return custPasword === custConfirmPassword;    
}

// Write code to submit customer details 
function submitCustomerDetail(event) {
    let isValid = true;
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    console.log(formProps);
    const {address,custPasword, custConfirmPassword, email, contact, custID, name, } = formProps;
    let isValidEmail =  checkEmailValidity(email);
    while (errorList.firstChild) {
        errorList.removeChild(errorList.lastChild);
    }
    if(!isValidEmail){
        addError("Enter A Valid Email");
        isValid = false;
        return
    }else {
        isValid = true;
    }
    let isValidContact = checkValidMobileNumber(contact);
    if(!isValidContact){
        addError("Enter A Valid Contact Number");
        isValid = false;
        return
    }else {
        isValid = true;
    }
    let isSamePass = setPasswordConfirmValidity(custPasword, custConfirmPassword)
    if(!isSamePass){
        addError("Password Did Not Match");
        isValid = false;
        return
    }else {
        isValid = true;
    }
    if(isValid) {
        while (errorList.firstChild) {
            errorList.removeChild(errorList.lastChild);
        }
        saveCustomer(formProps);
    }

}

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
    let listItem = document.createElement("li");
    listItem.innerHTML = errText;
    errorList.appendChild(listItem)
}

function saveCustomer(formProps) {
    delete formProps.custConfirmPassword;
    const postPromise = axios.post(url, formProps);
    postPromise.then(res => {
        alert("Customer Added")
    }).catch(err =>{
        alert("Failed To Add The Customer")
    })

}

