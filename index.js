document.addEventListener('DOMContentLoaded', function () {
  // Add to cart
  document.querySelector('#products').addEventListener('change', function (event) {
    var value = event.target.value;
    var title = event.target.options[event.target.selectedIndex].text;
    if (!containsItem(title)) {
      addNewItem(value, title);
    }
    document.querySelector('#products').selectedIndex = 0;
  });

  // Calc sum
  document.querySelector('.calc > button').addEventListener('click', function () {
    document.querySelectorAll('.result > label')[1].innerText = 'Sum: $' + calcSum();
    document.querySelector('.result').removeAttribute('hidden');
  })

  // Get products
  var select = document.querySelector('#products');
  select.removeChild(select.querySelectorAll('option')[1]);
  getProducts().map(function (product) {
    var option = document.createElement('option');
    option.text = product.title + ' ($' + product.value + ')';
    option.value = product.value;
    select.appendChild(option);
  })
});

/**
 * Adds new item to the cart.
 * @param {string} value - Product cost.
 * @param {string} title - Product name.
 */
function addNewItem(value, title) {
  var node = document.createElement('div');

  var label = document.createElement('label');
  label.innerText = title;
  label.setAttribute('data-value', value);
  node.appendChild(label);

  var input = document.createElement('input');
  input.setAttribute('type', 'number');
  input.setAttribute('min', '1');
  input.setAttribute('max', '100');
  input.value = '1';
  input.addEventListener('change', function (event) {
    if (isNaN(event.target.value)) {
      event.target.value = '1';
    } else {
      if (event.target.value > 100) {
        event.target.value = 100;
      } else if (event.target.value < 1) {
        event.target.value = 1;
      }
    }
  })
  node.appendChild(input);

  var button = document.createElement('button');
  button.innerText = 'Remove';
  button.addEventListener('click', function (event) {
    event.target.parentNode.parentNode.removeChild(event.target.parentNode);
    if (document.querySelector('.cart > div') === null) {
      document.querySelector('.calc > button').setAttribute('hidden', '');
    }
  })
  node.appendChild(button);

  document.querySelector('.cart').appendChild(node);

  document.querySelector('.calc > button').removeAttribute('hidden');
};

/**
 * Checks if the cart already contains the item.
 * @param {string} name - Product name.
 * @returns {boolean} Does the cart contain an element.
 */
function containsItem(name) {
  var items = document.querySelectorAll('.cart > div label');

  for (var i = 0; i < items.length; i++) {
    if (items[i].textContent == name) {
      return true;
    }
  }

  return false;
}

/**
 * Calculates the cost of all products in the cart.
 * @returns {number} Cost.
 */
function calcSum() {
  var sum = 0;

  var items = document.querySelectorAll('.cart > div');
  for (var i=0; i<items.length; i++) {
    var value = items[i].querySelector('label').getAttribute('data-value');
    var quantity = items[i].querySelector('input').value;
    sum += value * quantity;
  };

  return sum;
}

/**
 * Fetches available products.
 * @returns {Promise<Array>} Promise object represents the list of products.
 */
function getProducts() {
  return [
    {title: 'Carrot', value: 2},
    {title: 'Potato', value: 3},
    {title: 'Fish', value: 10},
    {title: 'Meat', value: 13},
    {title: 'Eggs', value: 6},
  ];
}