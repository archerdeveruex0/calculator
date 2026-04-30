let display = document.getElementById('result');
let currentInput = '0';
let shouldResetDisplay = false;

function appendToDisplay(value) {
  if (shouldResetDisplay) {
    currentInput = '';
    shouldResetDisplay = false;
  }
  
  if (currentInput === '0' && value !== '.') {
    currentInput = value;
  } else {
    currentInput += value;
  }
  
  display.value = currentInput;
}

function clearAll() {
  currentInput = '0';
  display.value = '0';
  shouldResetDisplay = false;
}

function deleteLast() {
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = '0';
  }
  display.value = currentInput;
}

function calculate() {
  try {
    // Replace × with * for eval
    let expression = currentInput.replace(/×/g, '*');
    let result = eval(expression);
    
    // Handle division by zero
    if (!isFinite(result)) {
      display.value = 'Error';
      currentInput = '0';
      shouldResetDisplay = true;
      return;
    }
    
    // Round to reasonable decimal places
    result = Math.round(result * 100000000) / 100000000;
    display.value = result;
    currentInput = result.toString();
    shouldResetDisplay = true;
  } catch (error) {
    display.value = 'Error';
    currentInput = '0';
    shouldResetDisplay = true;
  }
}

// Keyboard support
document.addEventListener('keydown', (e) => {
  const key = e.key;
  
  if (key >= '0' && key <= '9' || key === '.') {
    appendToDisplay(key);
  } else if (key === '+' || key === '-') {
    appendToDisplay(key);
  } else if (key === '*') {
    appendToDisplay('*');
  } else if (key === '/') {
    appendToDisplay('/');
  } else if (key === 'Enter' || key === '=') {
    calculate();
  } else if (key === 'Escape' || key === 'c' || key === 'C') {
    clearAll();
  } else if (key === 'Backspace') {
    deleteLast();
  }
});
