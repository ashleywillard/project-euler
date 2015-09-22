var fs = require('fs');

fs.open('names.txt', 'r',
	fs.readFile('names.txt', 'utf8', function (err, data) {
		if (err) throw err;
		data = data.slice(1, data.length - 1);
		var arr = data.split('","');
		arr.sort();
		var sum = 0;
		var name_sum = 0;
		for (var i = 0, len = arr.length; i < len; i++) {
			name_sum = 0;
			name = arr[i];
			for (var j = 0; j < name.length; j++) {
				name_sum += name.charCodeAt(j) - 64;
			}
			sum += name_sum * (i + 1);
		}
		console.log(sum);
	})
)