 
const BASE_URL ="https://2024-03-06.currency-api.pages.dev/v1/currencies/"
  

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "From" && currCode === "INR") {
      newOption.selected = "selected";
    } else if (select.name === "To" && currCode === "USD") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

 
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;

  // Default to 1 if the input is empty or invalid
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
   
  // Construct the URL for the new API structure
  const URL = `https://2024-03-06.currency-api.pages.dev/v1/currencies/${fromCurr.value.toLowerCase()}.json` 
 

  try {
    // Fetch the exchange rate data
    let response = await fetch(URL);
    let data = await response.json();

    // Access the nested exchange rate
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
 

    // Calculate the final amount
    let finalAmount = amtVal * rate;

    // Update the message
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
  } catch (error) {
    console.error("Error fetching the exchange rate:", error);
    msg.innerText = "Failed to fetch the exchange rate. Please try again later.";
  }
};


const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});