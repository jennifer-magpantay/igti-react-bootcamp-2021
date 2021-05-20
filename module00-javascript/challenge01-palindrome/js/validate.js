/* The function should read the sequence and according to its   length and characters, validate if it is a palindrome or not.
*/

// GLOBAL VARIABLES
// to get the vaues from input
let input = document.querySelector('#sequence');

// to print the results at the div root
const divRoot = document.querySelector('#root');

let form = document.querySelector('form');
form.addEventListener('submit', validate);

let submitBtn = document.querySelector('#submit');
submitBtn.addEventListener('click', validate);

let clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', clearButton);

function clearButton(event) {
    // it clears input and root values
    input.value = "";
    divRoot.innerHTML = "";
    divRoot.style.backgroundColor = 'transparent';
}

function validate(event) {
    // add prevent default to the function
    event.preventDefault();



    // add a var to locally deal with the input value
    var sequence = input.value;

    // now, set a for loop to read the sequence according to its lenght
    // add to  it a second index (j) that will start at its last position according to its lenght. also, this second index should decrease at each loop    
    for (var i = 0, j = sequence.length - 1; i < j; i++, j--) {
        // the loop will keep running while i is lower than j
        //  he loop will stop when a char at index is != to the char at sequence index, then add a conditional to return the validation
        if (sequence.charAt(i) != sequence.charAt(j)) {

            divRoot.innerHTML = `'${sequence}' is not a palindrome`;
            divRoot.style.backgroundColor='#fff';
            return;
        }
    }
    // for any other differente scenario, considere the sequence as a palindrome
    divRoot.innerHTML = `'${sequence}' is a palindrome`;
    divRoot.style.backgroundColor = '#fff';
}