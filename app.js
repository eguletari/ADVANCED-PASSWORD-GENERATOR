
// we declare these variables as these are what we are using to generate our password at random
const lowercasechar = "abcdefghijklmnopqrstuvwxyz"
const uppercasechar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const number = "0123456789"
const symbol = "!@#$%^&*()_+[]{}|;':\",./<>?"

const all = [lowercasechar, uppercasechar, number, symbol]

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
const strengthEl = document.getElementById("passwordstrength")
const imageEL = document.getElementById("strength-image")
const hintEl = document.getElementById("hint")

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

//change password automatically when boxes are cliker
checkboxes.forEach (checkbox => {
    checkbox.addEventListener("change", generatePassword)
})


// anytime the page is refreshed the pllace holder generates a pasword based on the initial password parameters
const inputField = document.getElementById('password');
        inputField.placeholder = generatePassword();

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

    strength()



}


//password strength
function strength (){
    const strength = passwordEL.value; 
    let score = 0; // Start score at 0

    // Scoring Criteria
    if (strength.length >= 8) score += 2;
    if (strength.length >= 12) score += 3;
    if (strength.length >= 12) score += 4;
    if (/[a-z]/.test(strength)) score += 1; // Contains lowercase
    if (/[A-Z]/.test(strength)) score += 1; // Contains uppercase
    if (/[0-9]/.test(strength)) score += 1; // Contains numbers
    if (/[^a-zA-Z0-9]/.test(strength)) score += 2; // Contains special characters
    if (/(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])/.test(strength)) score += 3  // contains a combination of all character and symbols

    const uniqueChars = new Set(strength).size;
    if (uniqueChars >= strength.length / 2) score += 2;

    // Cap score
    score = Math.max(0, Math.min(20, score));


    if (score <=4 ){
        strengthEl.innerHTML = "very weak";
        strengthEl.style.backgroundColor = "#DB6D35";
        imageEL.src = "circus.png"
    }
    else if (score >=5 && score <=8 ){
        strengthEl.innerHTML = "Weak";
        strengthEl.style.backgroundColor = "#ffb370";
        imageEL.src = "cave.png"
    }else if (score >=9 && score <=12 ){
        strengthEl.innerHTML = "Good";
        imageEL.src = "house.png"
        strengthEl.style.backgroundColor = "#ffddbf";
    }else if (score >=13 && score <= 16) {
        strengthEl.innerHTML = "Strong";
        strengthEl.style.backgroundColor = "#d5f2a5";
        imageEL.src = "castle.png"
    }else if (score > 16 ) {
        strengthEl.innerHTML = "Very strong";
        strengthEl.style.backgroundColor = "#9be438";
        imageEL.src = "world.png"
    }

 
}


// adds a listener to our button so that when we cllick on it, it would be able to genrate the password
Generate.addEventListener("click", generatePassword)
  
   // adds a listener to the copy image so we can copy the password 
   copyEL.addEventListener("click", function(){
    const copypassword = passwordEL;
    copypassword.select();
    document.execCommand("copy")

    var popup = document.createElement("div")
    popup.textContent = "Copied"
    popup.classList.add("popup")
    document.body.appendChild(popup)


    setTimeout(function(){
        document.body.removeChild(popup)
    }, 700)
   })
   // adds an event listener to change the slider value as we move the slider from left to right 
   sliderlength.addEventListener("input", function(){
    sliderEl.innerHTML = sliderlength.value
    generatePassword();
   })


   let currentIndex = 0;
   async function refreshText() {
    try {
        const response = await fetch('hint.json'); // Fetch JSON file
        const data = await response.json();
        const messages = data.messages;

        // Check if messages exist and display them sequentially
        if (messages && messages.length > 0) {
            hintEl.textContent = messages[currentIndex].message;

            // Increment index and loop back to the start if necessary
            currentIndex = (currentIndex + 1) % messages.length;
        } else {
            hintEl.textContent = "No messages found.";
        }
    } catch (error) {
        console.error('Error fetching JSON data:', error);
        hintEl.textContent = "Error fetching data.";
    }
}

// Auto-refresh every 5 seconds (5000 milliseconds)
setInterval(refreshText, 5000);

// Initialize the first message
refreshText();





