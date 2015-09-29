function is_guess_correct(guess, number) {
  if (guess === number) {
    return '<br>Correct! I was thinking ' + guess + '. <a href=" ">Click here to play again.</a><br>';
  }
  if (guess < number) {
    return '<br>' + guess + ' is too low.<br>';
  }
  return '<br>' + guess + ' is too high.<br>';
}

function gameOver() {
  document.getElementById('submit').onclick = function () {
    document.getElementById('content').innerHTML += '<br>Game over. Please refresh to play again.<br>';
  };
}

function guess() {
  var num = Math.floor(Math.random() * 101);

  document.getElementById('submit').onclick = function () {
    var input = document.getElementById('box').value;

    if (input.match(/^[0-9]{1,2}(?![0-9])$|100/)) {
      var is_correct = is_guess_correct(parseInt(input, 10), num);
      document.getElementById('content').innerHTML += is_correct;
      if (is_correct.indexOf('Correct') > -1) {
        gameOver();
      }
    } else {
      document.getElementById('content').innerHTML += '<br>Please enter a number between 1 and 100.<br>';
    }
    document.getElementById('box').value = '';
  };
}

function game() {
  document.getElementById('submit').onclick = function () {
    var name = document.getElementById('box').value;
    if (name) {
      document.getElementById('content').innerHTML += '<br>Well, ' + name + ', I\'m thinking of a number between 1 and 100 inclusive. Take a guess.<br>';
      document.getElementById('box').value = '';
      guess();
    } else {
      document.getElementById('content').innerHTML += '<br>Name cannot be blank.<br>';
    }
  };

  document.getElementById('box').onkeypress = function () {
    var keyCode = window.event.keyCode;
    if (keyCode == 13) {
      document.getElementById('submit').click();
    }
  };
}
