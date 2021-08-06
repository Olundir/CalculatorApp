const resultObject = document.querySelector(".result");

const keypad = document.querySelectorAll(".key");
for (key of keypad) {
  key.addEventListener("click", (input) => {
    trigger = input.target.textContent;

    if (resultObject.textContent.length > 10) resultObject.classList.add("resultManyNb");
    if (resultObject.textContent.length > 18) resultObject.classList.add("resultManyNbNext");

    if (resultObject.textContent.length < 10) resultObject.classList.remove("resultManyNb");
    if (resultObject.textContent.length < 18) resultObject.classList.remove("resultManyNbNext");

    // DEL
    if (trigger === "DEL") deleteLast();
    //RESET
    else if (trigger === "RESET") resetCalculator();
    // adds the instruction
    else if (trigger === "+" || trigger === "-" || trigger === "x" || trigger === "/") {
      addInstruction();
    }
    // dot
    else if (trigger === ".") {
      if (resultObject.textContent === "")
        console.log("i dont have a number? please add a super duper complicated thing that is going to add '0' in front of me ");
      else if (resultObject.textContent.charAt(resultObject.textContent.length - 1) !== " ") {
        resultObject.textContent += trigger;
        console.log("I am a DOT");
      }
    }
    // Calculate the result
    else if (trigger === "=") calculator();
    // addition of numbers
    else {
      resultObject.textContent += trigger;
    }
  });
}

const calculator = () => {
  let equasion = resultObject.textContent.split(" ");
  lgth = equasion.length;
  console.log(equasion);
  if (lgth < 2) {
    addError();
    console.log("invalid equasion");
  } else if (lgth % 2 !== 0 && equasion[lgth - 1] === "") {
    console.log("i have instruction at the end");
    equasion.pop();
    equasion.pop();
    calc(equasion);
  } else {
    console.log("valid equasion");
    calc(equasion);
  }
};

const calc = (array) => {
  resultObject.innerHTML = eval(array.toString().replaceAll(",", "").replaceAll("x", "*")).toFixed(2);
};

const addInstruction = () => {
  if (resultObject.textContent === "") console.log("no instruction needed");
  else if (resultObject.textContent.charAt(resultObject.textContent.length - 1) !== " ") resultObject.textContent += ` ${trigger} `;
  else {
    if (resultObject.textContent.charAt(resultObject.textContent.length - 2) === trigger) {
      console.log("no instruction needed");
    } else {
      resultObject.textContent = resultObject.textContent.slice(0, resultObject.textContent.length - 3) + ` ${trigger} `;
    }
  }
};

const resetCalculator = () => {
  console.log("reset");
  resultObject.innerHTML = "";
};

const deleteLast = () => {
  if (resultObject.textContent.charAt(resultObject.textContent.length - 1) === " ")
    resultObject.textContent = resultObject.textContent.slice(0, resultObject.textContent.length - 3);
  else resultObject.textContent = resultObject.textContent.slice(0, resultObject.textContent.length - 1);
};

const addError = () => {
  resultObject.classList.add("error");
  resultObject.innerHTML = "ERROR";
};

// Theme switch logic thing
const d = document.querySelectorAll(".d");

// toggle
// function to determine which toggle is on based on counter? base position is 0?
// function change toggle to 1
//          change toggle to 2
//          change toggle to 3
// can I put the theme into an object? or "object"

const toggleBackground = document.querySelector(".toggleContainer");
const toggle = document.querySelector(".toggle");
let toggleCountAdd = 2;
let toggleCountRemove = 1;

toggleBackground.addEventListener("click", () => {
  toggleBackground.classList.remove(`toggleCTheme` + toggleCountRemove);
  toggleBackground.classList.add(`toggleCTheme` + toggleCountAdd);
  toggle.classList.remove(`toggleTheme` + toggleCountRemove);
  toggle.classList.add(`toggleTheme` + toggleCountAdd);

  // change the next toggle
  if (toggleCountAdd === 3) toggleCountAdd = 1;
  else toggleCountAdd++;
  if (toggleCountRemove === 3) toggleCountRemove = 1;
  else toggleCountRemove++;
  console.log(toggleCountAdd);
  console.log(toggleCountRemove);
});
