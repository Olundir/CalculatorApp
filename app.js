const resultObject = document.querySelector(".result");

const keypad = document.querySelectorAll(".key");
for (key of keypad) {
  key.addEventListener("click", (input) => {
    trigger = input.target.textContent;
    // visuals
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

// Theme switch logic
const toggleBackground = document.querySelector(".toggleContainer");
const toggle = document.querySelector(".toggle");
const body = document.querySelector(".body");
const nav = document.querySelector(".nav");
const screen = document.querySelector(".resultScreenContainer");
const keypadBg = document.querySelector(".keypad");
const keys = document.querySelectorAll(".d");
const keysShadow = document.querySelectorAll(".shadowTile");
const delKey = document.querySelector(".del");
const delKeyShadow = document.querySelector(".delShadow");
const resetButton = document.querySelector(".res");
const resetButtonShadow = document.querySelector(".resetShadow");
const equalsButton = document.querySelector(".eql");
const equalsButtonShadow = document.querySelector(".eqShadow");

let toggleCountAdd = 2;
let toggleCountRemove = 1;
let currentTheme = 1;

toggleBackground.addEventListener("click", () => {
  toggleBackground.classList.remove(`toggleCTheme` + toggleCountRemove);
  toggleBackground.classList.add(`toggleCTheme` + toggleCountAdd);
  toggle.classList.remove(`toggleTheme` + toggleCountRemove);
  toggle.classList.add(`toggleTheme` + toggleCountAdd);
  body.classList.remove(`bodyTheme` + toggleCountRemove);
  body.classList.add(`bodyTheme` + toggleCountAdd);
  nav.classList.remove(`navTheme` + toggleCountRemove);
  nav.classList.add(`navTheme` + toggleCountAdd);
  screen.classList.remove(`screenTheme` + toggleCountRemove);
  screen.classList.add(`screenTheme` + toggleCountAdd);
  keypadBg.classList.remove(`keypadTheme` + toggleCountRemove);
  keypadBg.classList.add(`keypadTheme` + toggleCountAdd);
  for (k of keys) {
    k.classList.remove(`inner` + toggleCountRemove);
    k.classList.add(`inner` + toggleCountAdd);
  }
  for (s of keysShadow) {
    s.classList.remove(`shadowTheme` + toggleCountRemove);
    s.classList.add(`shadowTheme` + toggleCountAdd);
  }
  delKey.classList.remove(`innerDELTheme` + toggleCountRemove);
  delKey.classList.add(`innerDELTheme` + toggleCountAdd);
  delKeyShadow.classList.remove(`shadowDELTheme` + toggleCountRemove);
  delKeyShadow.classList.add(`shadowDELTheme` + toggleCountAdd);
  resetButton.classList.remove(`reset` + toggleCountRemove);
  resetButton.classList.add(`reset` + toggleCountAdd);
  resetButtonShadow.classList.remove(`resetShadowTheme` + toggleCountRemove);
  resetButtonShadow.classList.add(`resetShadowTheme` + toggleCountAdd);
  equalsButton.classList.remove(`equals` + toggleCountRemove);
  equalsButton.classList.add(`equals` + toggleCountAdd);
  equalsButtonShadow.classList.remove(`equalsShadowTheme` + toggleCountRemove);
  equalsButtonShadow.classList.add(`equalsShadowTheme` + toggleCountAdd);

  // change the next toggle
  if (toggleCountAdd === 3) toggleCountAdd = 1;
  else toggleCountAdd++;
  if (toggleCountRemove === 3) toggleCountRemove = 1;
  else toggleCountRemove++;
  if (currentTheme === 3) currentTheme = 1;
  else currentTheme++;
  // create local instance of data
  localStorage.setItem("theme", currentTheme);
});

// save data to browser

// set the theme with the counter
// based on the counter -> click that many times?
const changeTheme = () => {
  let amount = localStorage.getItem("theme");
  for (i = amount - 1; i > 0; i--) toggleBackground.click();
};

changeTheme();
