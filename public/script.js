//load PG county json
const test = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'

//empty restaurants array
const restaurants = []

//fill array with PG county json
fetch(test)
    .then(blob => blob.json())
    .then(data => restaurants.push(...data))

//match user inputs
function findMatch(wordToMatch, restaurants){
    return restaurants.filter(business => {
        const regex = new RegExp(wordToMatch, 'gi');
        return business.name.match(regex) || business.category.match(regex)
    });
}

//show matches between input and restaurants array
function showMatch(){
    const match = findMatch(this.value, restaurants);
    const html = match.map(restaurants => {
        return `
        <li>
            <ul>
                <li>
                    <span class="name">${restaurants.name}</span>
                </li>
                <li>
                    <span class="category">${restaurants.category}</span>
                </li>
                <li>
                    <span class="address">${restaurants.address_line_1}</span>
                </li>
                <li>
                    <span class="address">${restaurants.address_line_2}</span>
                </li>
                <li>
                    <span class="address">${restaurants.city}</span>
                </li>     
                <li>
                    <span class="address">${restaurants.zip}</span>
                </li>
        </ul>
        </li>
        `;
    }).join('');
    const regex2 = new RegExp("------", 'gi');
    editHtml = html.replace(regex2, "")
    results.innerHTML = editHtml;
}

const search = document.querySelector('.inputText');
const results = document.querySelector('.target');

search.addEventListener('keyup', showMatch);
search.addEventListener('change', showMatch);