
// we declare these variables as these are what we are using to generate our password at random
const lowercasechar = "abcdefghijklmnopqrstuvwxyz"
const uppercasechar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const number = "0123456789"
const symbol = "!@#$%^&*()_+[]{}|;':\",./<>?"

//document. getElementById("uppercase").addEventListener("click", function(){ this. checked = true; });

// this gets the element id from our html code, i.e getting the user inouts  
const sliderlength = document.getElementById("slider")
const sliderEl = document.getElementById("slidervalue")
const lowercaseEL = document.getElementById("lowercase")
const uppercaseEl = document.getElementById("uppercase")
const numbersEL = document.getElementById("numbers")
const symbolsEL = document.getElementById("symbols")
const Generate = document.getElementById("generatePassword")
const passwordEL = document.getElementById("password")
const copyEL = document.getElementById("copy")

// assign all checkboxes to a constant variable
const checkboxes = [lowercaseEL, uppercaseEl, numbersEL, symbolsEL];

checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", function () {
        // Count how many checkboxes are checked, Counts the number of currently checked checkboxes.
        const checkedCount = checkboxes.filter(cb => cb.checked).length;

        // If this is the last checked checkbox and it's being unchecked, prevent it
        if (checkedCount === 0) {
            checkbox.checked = true;
           
        }
    });
});


function generatePassword() {
    // Get the value of the password length set by the user
    const newLength = sliderlength.value;
    let character = "";
    let password = "";

    if (lowercaseEL.checked) {
        character += lowercasechar;
    }

    if (uppercaseEl.checked) {
        character += uppercasechar;
    }

    if (numbersEL.checked) {
        character += number;
    }

    if (symbolsEL.checked) {
        character += symbol;
    }

    for (let i = 0; i < newLength; i++) {
        password += character.charAt(Math.floor(Math.random() * character.length));
    }

    passwordEL.value = password;
}

// adds a listener to our button so that when we cllick on it, it would be able to genrate the password
Generate.addEventListener("click", generatePassword)
  
   // adds a listener to the copy image so we can copy the password 
   copyEL.addEventListener("click", function(){
    const copypassword = passwordEL;
    copypassword.select();
    document.execCommand("copy")

    var popup = document.createElement("div")
    popup.textContent = "Password Copied"
    popup.classList.add("popup")
    document.body.appendChild(popup)


    setTimeout(function(){
        document.body.removeChild(popup)
    }, 2000)
   })
    

   // adds an event listener to change the slider value as we move the slider from left to right 
   sliderlength.addEventListener("input", function(){
    sliderEl.innerHTML = sliderlength.value
    generatePassword();

   })
