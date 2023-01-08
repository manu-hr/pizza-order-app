const url = 'http://localhost:3001/menu'
const category = document.getElementById('category');
let data = [];

//Write code to get menu data from the json-server using axios API
const getPromise = axios.get(url);

//Write code to load menu data using window onload event: getPromise is the promise result obained from Axios call
window.onload = () => getPromise.then((response) => {
    console.log(response.data);
    data = response.data;
    createTableBody(data)
    let categories = data.map(item => item.category);
    let filteredCategory = categories.filter((item,
        index) => categories.indexOf(item) === index);
    filteredCategory.forEach(element => {
        let option = document.createElement('option');
        option.setAttribute("value", element);
        option.innerText = element;
        category.appendChild(option)
    });

}).catch(err => console.log(err));

//Write code to filter the menu item from list
category.addEventListener('change', function (e) {
    findItems(category.value);
});

function findItems(categoryName) {
    let filteredData;
    if(categoryName == 'all'){
        filteredData = data;
    }
    else{
        filteredData = data.filter(item => item.category == categoryName);
    }
    console.log(filteredData);
    createTableBody(filteredData);
}

function createTableBody(filteredData){
    
    let table = document.getElementById('tableBody');
    while(table.childNodes.length){
        table.removeChild(table.lastChild);
    }
    filteredData.forEach(element => {
        let row = document.createElement('tr');
        let rowData = `
            <td>${element.itemName}</td>
            <td>${element.price}</td>
        `;
        row.innerHTML = rowData;
        table.appendChild(row);
    });
}


