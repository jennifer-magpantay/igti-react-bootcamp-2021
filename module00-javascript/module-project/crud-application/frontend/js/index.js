// set global variables
let employees = [];
let roles = [];
let itemSelected;

// form
const form = document.querySelector('form');
// list
const employeesList = document.querySelector('#list-employees');
// buttons
const clearButton = document.querySelector('#clear');
const submitButton = document.querySelector('#submit');
const deleteButton = document.querySelector('#delete');

// when the page is loaded, the init function will run
// set on int all the methos you also want to run once the page is loaded

/* 
fetching data: considering that we are reading two different data, and we want to grab their results at once
the default behaviour for the requests is: after the first one is loaded, then, start the second
to avoid this behaviour, we should use Promise.all(), that saves the requests into arrays and displays its results, once all data is loaded and ready to use
*/

async function init() {
    // methods
    // destructuring Promise.all() arrays set above as global
    [employees, roles] = await
        Promise.all([
            listEmployees(),
            listRoles(),
        ]);
    readEmployees();
    readRoles();

    clearSelection();

    // event listeners
    clearButton.addEventListener('click', () => clearData(event));

    // passing the event submit to form will consider the event from the button submit and also from the 'enter - pressed' events as submition
    form.addEventListener('submit', () => submitData(event));
    form.addEventListener('change', () => setButtons(event));

    deleteButton.addEventListener('click', () => deleteItem(event));
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

    // change the text from submit button
    submitButton.textContent = "Update";
    clearButton.classList.remove('disabled');
    deleteButton.classList.remove('disabled');
}

// removing class selected
function clearSelection() {
    itemSelected = undefined;
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

    // change the text from submit button
    submitButton.textContent = "Create";
    clearButton.classList.add('disabled');
    deleteButton.classList.add('disabled');
}

function setButtons (event)
{
    event.preventDefault();
    clearButton.classList.remove('disabled');
    deleteButton.classList.remove('disabled');
}
// clear all inputs and remove selected class
function clearData(event) {
    event.preventDefault();
    form.name.value = "";
    form.salary.value = "";
    form.role_id.value = "";
    clearSelection();
}

// submiting form
async function submitData(event) {
    console.log("submiting data");
    event.preventDefault();

    // from here, whe should grab the value from form inputs and save it into an object
    const employeeData = {
        // id: itemSelected.id,
        name: form.name.value,
        salary: Number(form.salary.value),
        role_id: Number(form.role_id.value)
    };

    // now, call the update function, passing as its arguments the info we have saved into the obj

    // if there is any item selected, them consider the action as update
    if (itemSelected) {
        // updating the backend:
        // call the request - pass it into a variable
        const updatedItem = await updateEmployeeRegister(itemSelected.id, employeeData);

        // updating the front end:
        // pass the updated element index into the employees array 
        const index = employees.indexOf(itemSelected);
        employees[index] = updatedItem;
        // in that way, we are going to update just the index que have update 
    }
    // otherwise, consider the action as a new register
    else {
        // adding to the the backend:
        //  call the request
        const createdItem = await createEmployeeRegister(employeeData);

        // adding to the front end:
        // add the created element to the array by using push()
        employees.push(createdItem);
        // employees.push(employeeData);
    }
    // now, lets render again the list to be displayed
    readEmployees();
    // error!! it is loading the app when call the backend!!
}

async function deleteItem(event) {
    event.preventDefault();
    if (itemSelected) {
        // removing from the backend:
        // call de request:
        await deleteEmployeeRegister(itemSelected.id);

        // removing from the front end:
        // to remove a item from an array, lets use splice(i, 1)
        const index = employees.indexOf(itemSelected);
        employees.splice(index, 1);
        readEmployees();
        clearData(event);
    }
}

// renderig emlpyees data
function readEmployees() {
    // setting the list to empty
    employeesList.innerHTML = "";

    // read the array 
    employees.forEach((employee) => {

        // pass the array roles to find on it the role_id that matches (==) the employee role_id
        // save this result into a variable  and return      
        let listRole = roles.find((role) => { return role.id == employee.role_id });

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
}

// rendering roles date
function readRoles() {
    // read the the array
    roles.forEach((role) => {
        // then, for each item, create and element
        const option = document.createElement('option');
        // set its context and values
        option.textContent = role.name;
        option.value = role.id;
        // and finally, append option to the select
        form.role_id.appendChild(option);
    })
}

function showError(error) {
    document.querySelector('#errors').innerHTML = "Loading data error";
}



