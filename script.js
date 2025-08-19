const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const meals = ['Breakfast', 'Lunch', 'Dinner'];
const plannerDiv = document.getElementById('planner');

// Create planner layout
days.forEach(day => {
  const dayDiv = document.createElement('div');
  dayDiv.classList.add('day');
  dayDiv.innerHTML = `<h2>${day}</h2>`;
  
  const inputsDiv = document.createElement('div');
  inputsDiv.classList.add('meal-inputs');

  meals.forEach(meal => {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = `${meal}`;
    input.dataset.day = day;
    input.dataset.meal = meal;
    inputsDiv.appendChild(input);
  });

  dayDiv.appendChild(inputsDiv);
  plannerDiv.appendChild(dayDiv);
});

// Save to localStorage
document.getElementById('saveBtn').addEventListener('click', () => {
  const data = {};
  document.querySelectorAll('input').forEach(input => {
    const { day, meal, value } = input.dataset;
    if (!data[day]) data[day] = {};
    data[day][meal] = input.value;
  });

  localStorage.setItem('mealPlan', JSON.stringify(data));
  alert('Meal plan saved!');
});

// Load from localStorage
window.addEventListener('load', () => {
  const savedData = JSON.parse(localStorage.getItem('mealPlan'));
  if (savedData) {
    document.querySelectorAll('input').forEach(input => {
      const { day, meal } = input.dataset;
      if (savedData[day] && savedData[day][meal]) {
        input.value = savedData[day][meal];
      }
    });
  }
});

// Reset planner
document.getElementById('resetBtn').addEventListener('click', () => {
  localStorage.removeItem('mealPlan');
  document.querySelectorAll('input').forEach(input => input.value = '');
});
