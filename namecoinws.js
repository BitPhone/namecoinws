var spawn = require('child_process').spawn;
var WebSocketServer = require('ws').Server, wss = new WebSocketServer({port: 1313});

wss.on('connection', function(ws){
	ws.on('message', function(message) {
		console.log('received: %s', message);

			var namecoind = spawn('/home/jason/Namecoin/namecoind', ['name_show','d/gullicksonlaboratories']);

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


