//Step 4
class DivisionByZeroError extends Error {
  constructor(message = 'Cannot divide by zero') {
    super(message);
    this.name = 'DivisionByZeroError';
  }
}

class InvalidInputError extends Error {
  constructor(message = 'Input must be a valid number') {
    super(message);
    this.name = 'InvalidInputError';
  }
}

//Step 3
form.addEventListener('submit', () => {
  const output    = document.querySelector('output');
  const firstNum  = document.querySelector('#first-num').value.trim();
  const secondNum = document.querySelector('#second-num').value.trim();
  const operator  = document.querySelector('#operator').value;

  try {
    if (firstNum === '' || secondNum === '') {
      throw new InvalidInputError('Both fields must be filled in');
    }
    if (isNaN(Number(firstNum)) || isNaN(Number(secondNum))) {
      throw new InvalidInputError(`"${firstNum || secondNum}" is not a number`);
    }
    if (operator === '/' && Number(secondNum) === 0) {
      throw new DivisionByZeroError();
    }
    console.log(`✅ Computed: ${firstNum} ${operator} ${secondNum} = ${output.innerHTML}`);
  } catch (err) {
    if (err instanceof DivisionByZeroError || err instanceof InvalidInputError) {
      console.error(`${err.name} caught:`, err.message);
      output.innerHTML = `⚠️ ${err.message}`;
    } else {
      console.error('Unexpected error in calculator:', err);
      output.innerHTML = '⚠️ Unexpected error — check the console';
    }
  } finally {
    console.log('ℹ️ Calculator finally block executed');
  }
});

//Step 5
window.onerror = function (message, source, lineno, colno, error) {
  console.log('🌐 Global error caught via window.onerror');
  console.log(`   Message : ${message}`);
  console.log(`   Source  : ${source}`);
  console.log(`   Location: line ${lineno}, col ${colno}`);
  console.log('   Error object:', error);
  return true;
};

//Step 2
errorBtns[0].addEventListener('click', () => {
  const payload = { lab: 'Lab 9', topic: 'JS Error Handling', status: 'in-progress' };
  console.log('📋 console.log demo — logging an object:', payload);
});

errorBtns[1].addEventListener('click', () => {
  console.error('🔴 console.error demo: A simulated error message');
});

errorBtns[2].addEventListener('click', () => {
  console.count('Console Count button clicks');
});

errorBtns[3].addEventListener('click', () => {
  console.warn('⚠️ console.warn demo: This is a non-fatal warning');
});

errorBtns[4].addEventListener('click', () => {
  console.assert(1 === 2, 'Assert demo — 1 does NOT equal 2 (this message printed because assertion failed)');
  console.assert(1 === 1, 'This message will NOT appear — assertion passed');
  console.log('console.assert demo fired (check above for the failed assertion message)');
});

errorBtns[5].addEventListener('click', () => {
  console.clear();
});

errorBtns[6].addEventListener('click', () => {
  // console.dir shows an interactive JS object view of a DOM node.
  const firstBtn = document.querySelector('#error-btns > button');
  console.log('console.dir demo — inspecting the first button element as a JS object:');
  console.dir(firstBtn);
});

errorBtns[7].addEventListener('click', () => {
  const section = document.querySelector('#error-btns');
  console.log('console.dirxml demo — inspecting #error-btns as markup:');
  console.dirxml(section);
});

errorBtns[8].addEventListener('click', () => {
  console.group('📂 Outer Group (close with "Group End" button)');
  console.log('First log inside the outer group');
  console.warn('A warning inside the outer group');
  console.groupCollapsed('📁 Nested Collapsed Group (auto-closed)');
  console.log('You expanded the nested group — nice!');
  console.groupEnd(); // Closes only the nested group.
  console.log('Back in the outer group');
});

errorBtns[9].addEventListener('click', () => {
  console.groupEnd(); // Closes the outer group opened by [8].
  console.log('Outer group closed');
});

errorBtns[10].addEventListener('click', () => {
  const data = [
    { method: 'console.log',   purpose: 'General output'           },
    { method: 'console.error', purpose: 'Error messages'           },
    { method: 'console.warn',  purpose: 'Warnings'                 },
    { method: 'console.table', purpose: 'Tabular data (this demo)' },
    { method: 'console.trace', purpose: 'Call stack'               },
  ];
  console.table(data);
});

errorBtns[11].addEventListener('click', () => {
  console.time('lab9-timer');
  console.log('⏱️ Timer started — click "End Timer" to see elapsed time');
});

errorBtns[12].addEventListener('click', () => {
  console.timeEnd('lab9-timer');
});

errorBtns[13].addEventListener('click', () => {
  function inner()  { console.trace('📍 console.trace demo — full call stack:'); }
  function middle() { inner(); }
  function outer()  { middle(); }
  outer();
});

errorBtns[14].addEventListener('click', () => {
  console.log('💣 Triggering a global (uncaught) ReferenceError in 0 ms…');
  setTimeout(() => {
    thisVariableDoesNotExist(); // ReferenceError — caught by window.onerror above
  }, 0);
});