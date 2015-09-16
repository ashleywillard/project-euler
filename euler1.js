function sum_multiples_3_or_5() {
	var sum = 0;
	for (var i = 3; i < 1000; i += 3) {
		sum += i;
	}
	for (var i = 5; i < 1000; i += 5) {
		sum += i;
	}
	for (var i = 15; i < 1000; i += 15) {
		sum -= i;
	}
	return sum;
}

console.log('Sum of multiples of 3 and 5 up to 1000')
console.log(sum_multiples_3_or_5())