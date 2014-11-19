/*
 * GET home page.
 */
var twitter = require('ntwitter');
var io = require('socket.io').listen(3001, {log: false});
exports.index = function (req, res) {
    res.render('index', { title: 'TwitterMine' });
    if (req.session.oauth) {
    	
    	
    	
        var twit = new twitter({
            consumer_key: "wuOmkt9cL0VLCFJ3HEqf4vlaw",
            consumer_secret: "hfNtkmr8kreLUdD2yXwkYV98HRSqxTojoduUt1etyUHuvfW85E",
            access_token_key: req.session.oauth.access_token,
            access_token_secret: req.session.oauth.access_token_secret
        });


        twit
            .verifyCredentials(function (err, data) {
                console.log(err, data);
            })
            .updateStatus('Test tweet from ntwitter/' + twitter.VERSION,
            function (err, data) {
                console.log(data);
            }
        );
        
		var spawn = require('child_process').spawn;
		child = spawn('sh', ['./mine.sh']);
		//child.stdout.setEncoding('utf8');
		child.stdout.on('data', function(data) {
			         io.sockets.emit('newTwitt', data);
		             console.log(data);
		             });


        //twit.stream(
        //    'statuses/filter',
        //    {track: ['amor', 'odio', 'love', 'hate']},
        //    function (stream) {
        //        stream.on('data', function (data) {
        //            //console.log(data);
        //            //console.log(data.user.screen_name + " : " + data.text);
        //            io.sockets.emit('newTwitt', data);
        //            // throw  new Exception('end');
        //        });
        //    }
        //);
    }
};

