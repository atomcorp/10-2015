app.service('kanyeList', [function() {

	// 1. Get Initial Data

	var self = this;

	var mula = '3H2SdgGjREhOdvtlKUCWGy';
	var smuckers = '078C2jXg7XsMgW78Gfx1JA';
	var jukeboxJoints = '2gAGWaK4wvt2xrFUlR4mK8';
	var iDontFuckWithYou = '4w7yrP4RAeeyhfG9nJqQvS';
	var tellYourFriends = '28YLWwEB6xnJQYN7e062rH';
	var fourFiveSeconds = '5XzmZjXhMjDHr7ZfJ6DELQ';
	var guardDown = '0XLCdSMvlyKLwaajBZK1gW';
	var onlyOne = '4ZIb6YivyYtpOD0Ur7kDEP';
	var loseIt = '1ys9KbGq0I8b1fUu2tMK8p';
	var mpa = '3YiqWQsEkdsnMFx0o2LqbG';
	var allDay = '1YD3Dg7Olipi5FGVDLHWAu';

	var kanyeUris = [	   
		{  
	      dataUri: iDontFuckWithYou,
	      rank:1
	   },
	   {  
	      dataUri: fourFiveSeconds,
	      rank:2
	   },
	   {  
	      dataUri: onlyOne,
	      rank:8
	   },
	   {  
	      dataUri: smuckers,
	      rank:7
	   },
	   {  
	      dataUri: tellYourFriends,
	      rank:3
	   },
	   {  
	      dataUri: guardDown,
	      rank:4
	   },
	   {  
	      dataUri: jukeboxJoints,
	      rank:6
	   },
	   {  
	      dataUri: mula,
	      rank:5
	   },
	   {  
	      dataUri: loseIt,
	      rank:10
	   },
	   {  
	      dataUri: allDay,
	      rank:9
	   }
	];

	self.kanyeUris = kanyeUris;

}]);

app.service('getKanyeData', ['kanyeList', '$http', function(kanyeList, $http) {

	var self = this;

	self.kanyes = {kanyes: 'something'}

	// 3. Connect to Spotify API
	function getApi(spotifyUri, rank) {
		$http({
			method: 'GET',
			url: 'https://api.spotify.com/v1/tracks/' + spotifyUri + '?market=ES'
		}).then(function successCallback(response) {
			// 4. Get the data from Spotify and parse it 
			parseKanyeData(response, rank);
		}, function errorCallback(response) {
			console.log(response);
		});
	}

	// 2. Send Kanye to Spotify
	function getKanye() {
		for (var i = 0; i < kanyeList.kanyeUris.length; i++) {
			getApi(kanyeList.kanyeUris[i].dataUri, kanyeList.kanyeUris[i].rank);
		}
	}

	getKanye();

	kanye = [];

	var parseKanyeData = function(json, rank) {
		// todo: add loop to do feats
		var thisKanye = {};
		thisKanye.rank = rank;
		thisKanye.kanyeName = json.data.name;
		if (thisKanye.kanyeName.indexOf(' (feat. Kanye West & Diddy)') !=-1) {
			thisKanye.kanyeName = thisKanye.kanyeName.replace(" (feat. Kanye West & Diddy)", "");
		} else if (thisKanye.kanyeName.indexOf(' - feat. Kanye West') !=-1) {
			thisKanye.kanyeName = thisKanye.kanyeName.replace(" - feat. Kanye West", "");
		}
		thisKanye.artist = json.data.artists[0].name;
		var length = json.data.artists.length;
		if (length > 1) {
			var string = '';
			for (var i = 0; i < length; i++) {
				if (i === 0) {
					thisKanye.artist = json.data.artists[i].name;
				} else if (i === 1) {
					string = string + ' feat. ' + json.data.artists[i].name ;
				} else if (i === length) {
					string = string + json.data.artists[i].name;
				} else {
					string = string + ', ' + json.data.artists[i].name;
				}
			}
			thisKanye.artistFeats = string;
		}
		thisKanye.artwork = json.data.album.images[0].url;
		thisKanye.listen = json.data.artists[0].external_urls.spotify;
		thisKanye.preview = json.data.preview_url;
		kanye.push(thisKanye);
	};

	self.kanyes = kanye;

	

}]);