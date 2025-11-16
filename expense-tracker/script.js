const form = document.getElementById('expense-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const dateInput = document.getElementById('date');
const list = document.getElementById('expense-list');
const totalDisplay = document.getElementById('total');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function saveAndRender() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderExpenses();
}

function renderExpenses() {
  list.innerHTML = '';
  let total = 0;

  expenses.forEach((expense, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
    ${expense.description} - Rs. ${parseFloat(expense.amount).toFixed(2)} (${expense.date})
    <button onclick="deleteExpense(${index})">❌</button>
  `;
    list.appendChild(li);
    total += Number(expense.amount);
  });

  totalDisplay.textContent = total.toFixed(2);
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  saveAndRender();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newExpense = {
    description: descriptionInput.value,
    amount: amountInput.value,
    date: dateInput.value,
  };
  expenses.push(newExpense);
  saveAndRender();
  form.reset();
});

renderExpenses();
