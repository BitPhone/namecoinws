var spawn = require('child_process').spawn;
var WebSocketServer = require('ws').Server, wss = new WebSocketServer({port: 1313});
var namecoind_path = '/home/jason/Namecoin/namecoind';

wss.on('connection', function(ws){
	ws.on('message', function(message) {
		console.log('received: %s', message);

			// split the message on spaces
			var message_parts = message.split(' ');

			// todo: use a more generic path for namecoind
			var namecoind = spawn(namecoind_path, message_parts);

			namecoind.stdout.on('data', function(data){
				console.log('namecoind.stdout.on: ' + data);
				ws.send(data);
			});

			namecoind.stderr.on('data', function(data){
				console.log('namecoind.stderr.on: ' + data);
				ws.send(data);
			});

			namecoind.on('close', function(code){
				console.log('namecoind existed with code '+ code);
			});	
	});
});


