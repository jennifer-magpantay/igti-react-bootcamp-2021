// set global variables
let dataEmployees = [];
let dataRoles = [];
let itemSelected;

const clearButton = document.querySelector('#clear');
const form = document.querySelector('form');

async function init() {
    // set the methods to be called once the page is load
    await fetchData();
    readEmployees();
    readRoles();

    // event listeners
    clearButton.addEventListener('click', () => clearData(event));
}
init();

function selectItem(employee, event) {
    clearSelection();
    // save employee into the global variable itemSelected to hold its value
    itemSelected = employee;
    // add a class 'selected' to the selected item, adding a style to it
    // for that, use a variable to hold the event.target value  
    let element = event.target;
    // then, add the class
    element.classList.add('selected');
    console.log(itemSelected);
    // once we have the element select from the list, we should display its values on the form 
    // lets use query selector form to access the form elements
    form.name.value = employee.name;
    form.salary.valueAsNumber = employee.salary;
    form.role_id.value = employee.role_id;
}

// removing class selected
function clearSelection() {
    // when called, this function will get by querySelector which li has the class selected on it
    let elementSelected = document.querySelector('li.selected');
    // then, through a statement will check:
    // if the found item is not null/empty
    if (elementSelected != null) {
        // then, remove the class selected
        elementSelected.classList.remove('selected');
    }
    // once is done, call this function at the beginning of the selectItem() method
    // the function will remove a selected class before add a new one
    // also, apply his function to the clearData(), to run every time the clear button is clicked
}

// clear all inputs and remove selected class
function clearData(event) {
    event.preventDefault();
    form.name.value = "";
    form.salary.value = "";
    form.role_id.value = "";
    clearSelection();
}

// considering that we are reading two different data, we want to grab their results at once
// the default behaviour for the requests is: once one is finished, then, start the second
// to avoid this behaviour, we should use Promise.all(), that saves the requests into arrays and displays its results, once all data is ready to use
async function fetchData() {
    // add try/catch
    try {
        // destructuring the promises from Promise.all() into arrays amd make the variables as global
        [dataEmployees, dataRoles] =
            await Promise.all([
                listEmployees(),
                listRoles(),
            ])
    } catch (error) {
        showError(error);
    }
    console.log("fecthing data")
}

function readEmployees() {
    // variables
    const employeesList = document.querySelector('#list-employees');

    // first, read the employes data
    dataEmployees.forEach((employee) => {
        // second, find in roles the role id that matches (==) the employee role_id
        // save this result into a variable
        let listRole = dataRoles.find((role) => role.id == employee.role_id);
        // then, for each item, create and element
        const li = document.createElement('li');
        const spanName = document.createElement('span');
        spanName.textContent = employee.name + ",";
        const spanRole = document.createElement('span');
        spanRole.textContent = listRole.name + ",";
        const spanSalary = document.createElement('span');
        spanSalary.textContent = employee.salary;
        // append spans to li
        li.appendChild(spanName);
        li.appendChild(spanRole);
        li.appendChild(spanSalary)
        // finally, append li to ul
        employeesList.appendChild(li);

        // for each li, we will add a event listener, to identify which item was clicked
        li.addEventListener('click', () => selectItem(employee, event));
    })
    console.log("read employess data")
}

function readRoles() {
    // read the employes data
    dataRoles.forEach((role) => {
        // then, for each item, create and element
        const option = document.createElement('option');
        // set its context and values
        option.textContent = role.name;
        option.value = role.id;
        // and finally, append option to the select
        form.role_id.appendChild(option);
    })
    console.log("read roles data")
}

function showError(error) {
    document.querySelector('#errors').innerHTML = "Loading data error";
}



