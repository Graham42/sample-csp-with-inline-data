/**
 * Find and parses an inline JSON script block with the given selector, and
 * return the data.
 *
 * @param {string} dataSelect
 */
function getData(dataSelect) {
  try {
    const inlineJsonElement = document.querySelector(
      `script[type="application/json"][data-my-app-selector="${dataSelect}"]`
    );
    const data = JSON.parse(inlineJsonElement.textContent);
    return data;
  } catch (err) {
    console.error(`Couldn't read JSON data from ${dataSelect}`, err);
  }
}

function suggestRandomPet() {
  var somePets = ["dogs", "cats", "koalas", "parrots"];
  var randomPet = somePets[Math.floor(Math.random() * somePets.length)];
  return randomPet;
}

function getRandomNumber() {
  // chosen by fair dice roll.
  // guaranteed to be random
  return 4;
}

document.addEventListener("DOMContentLoaded", function() {
  // Load our data from the inline json block
  const user = getData("user-data");

  document.getElementById("title").innerText = `Happy Birthday ${
    user.firstName
  }`;
  document.getElementById(
    "text"
  ).innerText = `Happy belated birthday! It's a great time to be ${user.age}!`;
  // if the user has a pet, say hello
  document.getElementById("text2").innerText = user.pet
    ? `Say hello to ${user.pet.name} for us`
    : `Have you considered getting ${getRandomNumber()} ${suggestRandomPet()}?`;
});
