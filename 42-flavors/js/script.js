/* Sets a random integer quantity in range [1, 20] for each flavor. */
function setQuantities() {
    let metals = document.getElementsByClassName("meta");
    metals = Array.from(metals);
    metals.forEach(element => element.insertBefore(document.createElement("span"),
      element.children[0]));
    metals.forEach(element => element.children[0].setAttribute("class","quantity"))

    let quantity_ls = document.getElementsByClassName("quantity");
    quantity_ls = Array.from(quantity_ls);
    quantity_ls.forEach(element => element.innerText = Math.floor(Math.random()*19+1));
}

/* Extracts and returns an array of flavor objects based on data in the DOM. Each
 * flavor object should contain five properties:
 *
 * element: the HTMLElement that corresponds to the .flavor div in the DOM
 * name: the name of the flavor
 * description: the description of the flavor
 * price: how much the flavor costs
 * quantity: how many cups of the flavor are available
 */
function extractFlavors() {
  let flavorls = [];
  let flavor_div_ls = Array.from(document.getElementsByClassName("flavor"));
  flavor_div_ls.forEach(each => {
    flavorls.push(
        {
          element : each,
          name : each.querySelector("h2").innerHTML,
          description : each.querySelector("div[class='description']").querySelector('p').textContent,
          price : each.querySelector('span[class="price"]').textContent,
          quantity : each.querySelector('span[class="quantity"]').textContent
        }
    );
  })
  return flavorls;
}

/* Calculates and returns the average price of the given set of flavors. The
 * average should be rounded to two decimal places. */
function calculateAveragePrice(flavors) {
  let sum = 0;
  flavors.forEach(each => {
    sum += parseFloat(each.price.substring(1));
  })
  return (sum/flavors.length).toFixed(2);
}

/* Finds flavors that have prices below the given threshold. Returns an array
 * of strings, each of the form "[flavor] costs $[price]". There should be
 * one string for each cheap flavor. */
function findCheapFlavors(flavors, threshold) {
    const flavorUnderThreshold = flavors.filter(element =>
        parseFloat(element.price.substring(1)) < threshold
    );
    return flavorUnderThreshold.map(flavor => flavor.name + 'costs ' + flavor.price);
}

/* Populates the select dropdown with options. There should be one option tag
 * for each of the given flavors. */
function populateOptions(flavors) {
  let flavor_selector = document.querySelector("div[id='footer'] select[name='flavor']");
  flavors.forEach((each)=>{
      let option = document.createElement("option");
      option.innerHTML = each["name"]; //todo innerhtml innertext textcontent
      option.setAttribute('value',each["name"]);
      flavor_selector.appendChild(option);
  })

}

/* Processes orders for the given set of flavors. When a valid order is made,
 * decrements the quantity of the associated flavor. */
function processOrders(flavors) {
    //let flavor_chose = document.querySelector("div[id='footer'] select[name='flavor']").value;
   // let order_amount = document.querySelector("div[id='footer'] input[type='text']").value;

    let order_button = document.querySelector("input[value='Finalize order →']");

    order_button.addEventListener('click', function (event) {
        event.preventDefault();
        let flavor_chose = document.querySelector("div[id='footer'] select[name='flavor']").value;
        let order_amount = document.querySelector("div[id='footer'] input[type='text']").value;
        flavors.forEach(each => {
                    let to_subtract = each.element;
                    let remain = to_subtract.querySelector("span[class='quantity']");
                    if (each.name == flavor_chose && parseInt(remain.textContent) >= order_amount) {
                        remain.textContent = (parseInt(remain.textContent) - order_amount).toString();
                    }
                })
        }
    )
}

/* Highlights flavors when clicked to make a simple favoriting system. */
function highlightFlavors(flavors) {
    flavors.forEach(each => {
        each.element.addEventListener('click',() => {
              each.element.classList.toggle("highlighted");
        })
  })
}


/***************************************************************************/
/*                                                                         */
/* Please do not modify code below this line, but feel free to examine it. */
/*                                                                         */
/***************************************************************************/


const CHEAP_PRICE_THRESHOLD = 1.50

// setting quantities can modify the size of flavor divs, so apply the grid
// layout *after* quantities have been set.
setQuantities()
const container = document.getElementById('container')
new Masonry(container, { itemSelector: '.flavor' })

// calculate statistics about flavors
const flavors = extractFlavors()
const averagePrice = calculateAveragePrice(flavors)
console.log('Average price:', averagePrice)

const cheapFlavors = findCheapFlavors(flavors, CHEAP_PRICE_THRESHOLD)
console.log('Cheap flavors:', cheapFlavors)

// handle flavor orders and highlighting
populateOptions(flavors)
processOrders(flavors)
highlightFlavors(flavors)



