function play(callback) {
	process.stdin.resume();
	process.stdin.setEncoding('utf8');

	process.stdout.write('Hello! What is your name?\n')
	process.stdin.once('data', function(text) {
		text = text.toString().trim();
		if (text.match(/^bo$/ig)) {
			process.stdout.write('Sorry, you cannot play.\n');
			process.stdin.pause();
		} else if (text) {
			process.stdout.write('Well, '+ text.replace('\n', '') + ', I\'m thinking of a number between 1 and 100 inclusive.\nTake a guess.\n');
			callback();
		} else {
			process.stdout.write('Name cannot be blank\n');
			play(callback);
		}
	});
}

function guess() {
	num = Math.floor(Math.random() * 101);

	process.stdin.on('data', function(data) {
		is_correct = is_guess_correct(parseInt(data.toString().trim(), 10), num);
		process.stdout.write(is_correct);
		if (is_correct == 'Correct!\n') { process.stdin.pause(); }
	});
}

function is_guess_correct(guess, number) {
	if (guess == number) {
		return 'Correct!\n';
	} else if (guess < number) {
		return 'Your guess is too low.\n';
	} else {
		return 'Your guess is too high.\n';
	}
}

play(guess);
