"use strict";
const crypto = require('crypto');
const readline = require('readline');

function main(){
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	var secret = '';
	const cipher = crypto.createCipher('AES256', secret);
	const decipher = crypto.createDecipher('AES256', secret);
	
	function crypt(msg) {
		const cipher = crypto.createCipher('AES256', secret);
		let encrypted = cipher.update(msg, 'utf8', 'hex');
		encrypted += cipher.final('hex');
		return encrypted;
	}

	function dcrypt(hash) {
		var key = crypto.createDecipher('AES256', secret);
		try {
			var msg = key.update(hash, 'hex', 'utf8')
			msg += key.final('utf8');
			return msg;
		} catch (ex) {
			return 'Incorrect secret word';
		}
	}

	function dialog(answer) {
		if (answer == 'e') {
			rl.question('Enter your secret word: ', (answer) => {
				secret = answer;
				console.log('Your secret word is ' + secret);
				console.log('');
				rl.question('Enter your message: ', (answer) => {		
					var hash = crypt(answer);
					console.log('');
					console.log('Here is your encrypted message:');
					console.log(hash);
					console.log('');
					dialogLoop();
				});
			});
		} else if (answer == 'd') {
			rl.question('Enter your secret word: ', (answer) => {
				secret = answer;
				console.log('Your secret word is ' + secret);
				console.log('');
				rl.question('Enter your encrypted message: ', (answer) => {
					var msg = dcrypt(answer);
					console.log(msg);
					console.log('');
					dialogLoop();
				});
			});
		}
	}

	console.log('***************************');
	console.log('Secret Messenger CLI v1.0.0');
	console.log('***************************');
	console.log('');
	
	function dialogLoop() {
		rl.question('Do you want to (e)ncrypt or (d)ecrypt? ', (answer) => {
			if (answer == 'e' || answer == 'd') {
				dialog(answer);
			} else {
				console.log('Please choose either (e)ncrypt or (d)ecrypt by entering "e" or "d"');	
				console.log('');
				dialogLoop();
			}
		});
	}
	
	dialogLoop();
}

main();
