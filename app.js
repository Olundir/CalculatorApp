const resultObject = document.querySelector(".result");
const d = document.querySelectorAll(".d");
const digits = [];
for (const dig of d) {
  digits.push(parseInt(dig.innerText));
}
const del = document.querySelector(".del");
const plus = document.querySelector(".pl");
const minus = document.querySelector(".min");
const division = document.querySelector(".div");
const multi = document.querySelector(".multi");
const dot = document.querySelector(".dott");
const equals = document.querySelector(".eql");
const reset = document.querySelector(".res");

//  7 8 9
//  4 5 6
//  1 2 3
//    0
// CALCULATOR LOGIC

const keypad = document.querySelectorAll(".key");
let res = 0;
for (key of keypad) {
  key.addEventListener("click", (input) => {
    trigger = input.target.textContent;
    // what if text gets 2 long. For now just limit the input but later I can add the scroll
    // option for the result screen which would allow for infinite input
    if (resultObject.textContent.length === 13) resultObject.classList.add("resultManyNb");
    if (resultObject.textContent.length < 13) resultObject.classList.remove("resultManyNb");
    // DEL
    if (trigger === "DEL") deleteLast();
    //RESET
    else if (trigger === "RESET") resetCalculator();
    // length max
    else if (resultObject.textContent.length > 15) console.log("max length");
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

// function that calculates the result based on the resultObject.textContent and
// possibly the  current result
const calculator = () => {
  // if there is an Instruction at the end it has to ignore it
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
  res = 0;
};

const deleteLast = () => {
  if (resultObject.textContent.charAt(resultObject.textContent.length - 1) === " ")
    resultObject.textContent = resultObject.textContent.slice(0, resultObject.textContent.length - 3);
  else resultObject.textContent = resultObject.textContent.slice(0, resultObject.textContent.length - 1);
};

const addError = (name) => {
  name.classList.add("error");
  name.innerHTML = "ERROR";
};
