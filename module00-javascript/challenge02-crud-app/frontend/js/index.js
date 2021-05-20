// set variables
let dataEmployees = [];
let dataRoles = [];

function init() {
    // set themethods to be called once the page is load
    fetchData();
}

init();

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

        // call the function to read and manage the data
        let setEmployeesList = readEmployees();
        // and set it into our html
        document.querySelector('#list-employees').innerHTML = setEmployeesList;

        let setRolesOptions = readRoles(dataRoles);
        // set the result into the select form
        document.querySelector('#role_id').innerHTML = setRolesOptions;
    } catch (error) {
        showError(error);
    }
}

function readEmployees() {
    // first, read the employes data
    let list = dataEmployees.map((employee) => {
        // second, findo in roles the role id that matches (==) the employee role_id
        // save this result into a variable
        let listRole = dataRoles.find((role) => role.id == employee.role_id);
        // then, return the data we want into a <li> element
        return `<li>${employee.name}, ${listRole.name} - ${employee.salary}</li>`
    })
    // using .join("") to get rid off commas in each <li>
    return list.join("");
}

function readRoles() {
    let options = dataRoles.map((item) => {
        return `<option value="role_id">${item.name}</option>`
    })
    return options;
}



