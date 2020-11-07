//Load PG county json
const test = "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json";

//Empty restaurants array
const restaurants = [];

//Fill array with PG county json
fetch(test)
  .then((blob) => blob.json())
  .then((data) => restaurants.push(...data));

//Match user inputs
function findMatch(wordToMatch, restaurants) {
  return restaurants.filter((business) => {
    const regex = new RegExp(wordToMatch, "gi");
    return business.name.match(regex) || business.category.match(regex);
  });
}

//Titlecase extra credit
function titleCaseFunction(restaurantTitle){
    splitRestaurant = restaurantTitle.toLowerCase();
    splitRestaurant = splitRestaurant.split(' ');
    for(i = 0; i < splitRestaurant.length; i++){
        splitRestaurant[i] = splitRestaurant[i].charAt(0).toUpperCase() + splitRestaurant[i].substring(1);
    }
    return splitRestaurant.join(' ');
} 

//Show matches between input and restaurants array
function showMatch() {
  const match = findMatch(this.value, restaurants);
  const html = match
    .map((restaurants) => {
      return `
        <li>
            <ul>
                <h2>${titleCaseFunction(restaurants.name)}</h2>
                <li>${titleCaseFunction(restaurants.category)}</li>
                <address>
                    ${titleCaseFunction(restaurants.address_line_1)}<br>
                    ${titleCaseFunction(restaurants.address_line_2)}<br>
                    ${titleCaseFunction(restaurants.city)}<br>
                    ${restaurants.zip}<br>
                </address>
        </ul>
        </li>
        `;
    })
    .join("");

  results.innerHTML = html;

  //Remove blank second address lines
  const regex2 = new RegExp("------<br>", "gi");
  editHtml = html.replace(regex2, "");
  results.innerHTML = editHtml;
}

const search = document.querySelector(".inputText");
const results = document.querySelector(".target");

search.addEventListener("keyup", showMatch);
search.addEventListener("change", showMatch);