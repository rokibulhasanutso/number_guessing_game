// this function generate a random number and return it
function getRandNumber(minNumber, maxNumber) {
    return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
}

/*
    Validation content for random number generators
        1. Check input with null string value.
        2. Check the input value by comparing it with the minimum to maximum number.
        3. When the enter key is pressed the call function generate a random number 
           after the key press event.
*/
const numberContent = document.querySelector('#number-input-content');
const minInput = numberContent.querySelector('input[name="minNumber"]');
const maxInput = numberContent.querySelector('input[name="maxNumber"]');
const validationMsg = numberContent.querySelector('.validation-message');

numberContent.querySelectorAll('input').forEach(function (item) {

    item.addEventListener('input', function () {
        let minNumber = minInput.value;
        let maxNumber = maxInput.value;

        if (minNumber !== '' && maxNumber !== '') {

            if (parseInt(minNumber) >= parseInt(maxNumber)) {
                validationMsg.textContent = `Please Enter the valid number!`;
            }
            else {
                validationMsg.textContent = `Press Enter Button`;
                minInput.addEventListener('keypress', enterButtonHandler);
                maxInput.addEventListener('keypress', enterButtonHandler);
            }
        }
        else {
            validationMsg.textContent = '';
        }
    });

    function enterButtonHandler(event) {
        if (event.key === 'Enter') {
            const guessNumber = getRandNumber(parseInt(minInput.value), parseInt(maxInput.value));
            computerGetNumber(guessNumber);

            validationMsg.textContent = '';
            minInput.classList.add('pointer-events-none', 'select-none');
            maxInput.classList.add('pointer-events-none', 'select-none');
            minInput.blur(), maxInput.blur();
            numberContent.querySelector('.inputs-content')
                .classList
                .replace('border-slate-400', 'border-red-400');
        }
    }
});

/* Validation proggram end */


/* Guessing number */
const guessNumberContent = document.querySelector('#guessing-number-content');

// computer content get DOM element
const computerContent = guessNumberContent.querySelector('.computer');
const computerContentInput = computerContent.querySelector('input');
const computerMsgBox = computerContent.querySelector('span');

// guessing result element
const resultMsg = guessNumberContent.querySelector('.resultMsg');

// geuss number content
const guessContent = guessNumberContent.querySelector('.guessInput');
const guessInput = guessContent.querySelector('input');
const guessMsgBox = guessContent.querySelector('span');

// game using live counter
const gameLiveContent = document.querySelector('#game-live');
const gameLivePointer = gameLiveContent.querySelectorAll('svg');

// computer content function
function computerGetNumber(getNumber) {
    if (getNumber !== NaN) {
        computerMsgBox.textContent = 'Loadding...';

        setTimeout(() => {
            gameLivePointer.forEach(function (item) { item.style.fill = 'red' })
            computerMsgBox.textContent = 'Computer get number';
            computerContentInput.classList.replace('bg-slate-500', 'bg-green-500');
            computerContentInput.classList.replace('border-slate-300', 'border-green-300');

            guessNumber(getNumber);
        }, 1000);
    }
}

// geuss varify number and live counter and result
function guessNumber(getNumber) {
    console.log(getNumber);
    guessInput.focus();
    guessInput.classList.replace('bg-slate-500', 'bg-transparent');
    guessInput.classList.remove('pointer-events-none', 'seclect-none');

    let liveConter = gameLivePointer.length - 1;
    guessInput.addEventListener('keypress', function (event) {

        if (event.key === 'Enter') {
            if (getNumber === parseInt(guessInput.value)) {
                resultMsg.textContent = 'You are Win';
                resultMsg.parentElement.classList.remove('hidden');

                guessMsgBox.textContent = 'you geuss right number';
                guessInput.classList.replace('border-slate-300', 'border-green-500');
                guessInput.classList.add('pointer-events-none', 'seclect-none');
                guessInput.blur();

                computerMsgBox.textContent = 'computer number';
                computerContentInput.classList.replace('bg-green-500', 'bg-transparent');
                computerContentInput.classList.replace('border-green-300', 'border-green-500');
                computerContentInput.value = getNumber;

            }
            else {
                if (liveConter <= 0) {
                    guessMsgBox.textContent = 'your number';

                    resultMsg.textContent = 'You are lost.'
                    resultMsg.parentElement.classList.remove('hidden');

                    gameLivePointer[liveConter].style.fill = 'currentColor';
                    guessInput.classList.add('pointer-events-none', 'seclect-none');
                    guessInput.classList.replace('border-slate-300', 'border-red-500');
                    guessInput.blur();

                    computerMsgBox.textContent = 'computer number';
                    computerContentInput.classList.replace('bg-green-500', 'bg-transparent');
                    computerContentInput.classList.replace('border-green-300', 'border-green-500');
                    computerContentInput.value = getNumber;
                }
                else {
                    gameLivePointer[liveConter].style.fill = 'currentColor';
                    guessInput.value = '';
                    guessMsgBox.textContent = 'worng number again guess';
                    liveConter--; // decrement live counter
                }
                console.log(liveConter);
            }
        }
    })
}

/* Guessing number end */