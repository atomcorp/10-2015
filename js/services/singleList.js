app.service('singleList', [function() {

	// 1. Get Initial Data

	var self = this;

	var cantFeelMyFace = '3X38ErFiKgzUxinBlhwuWm';
	var loveMeLikeYouDo = '7y2YUIyCuVhBidENVT0068';
	var causeIKnowYouFeel = '0KCcw89HkV6MLyJCS0upLR';
	var whiteIverson = '5XhM5Tym0THyceMZkzbSWV';
	var pickYouUp = '3XUu0GCJo2C81R3EPciXgN';
	var intoTheNight = '7kjFiwwjH5OZeTkqoAhSKh';
	var lampshadesOnFire = '5jJ69cMDMC0aeWPjZo6VP2';
	var bassically = '2pQfwOUVPCk3CfqzVx8y4Q';
	var deadFox = '5vC0nnnkYMGIBWS9YN1L8u';
	var allMyFriends = '6TaqooOXAEcijL6G1AWS2K';

	var singleUris = [	   
		{  
	      dataUri: cantFeelMyFace,
	      rank:1
	   },
	   {  
	      dataUri: causeIKnowYouFeel,
	      rank:2
	   },
	   {  
	      dataUri: bassically,
	      rank:8
	   },
	   {  
	      dataUri: lampshadesOnFire,
	      rank:7
	   },
	   {  
	      dataUri: loveMeLikeYouDo,
	      rank:3
	   },
	   {  
	      dataUri: deadFox,
	      rank:4
	   },
	   {  
	      dataUri: pickYouUp,
	      rank:6
	   },
	   {  
	      dataUri: intoTheNight,
	      rank:5
	   },
	   {  
	      dataUri: allMyFriends,
	      rank:10
	   },
	   {  
	      dataUri: whiteIverson,
	      rank:9
	   }
	];

	self.singleUris = singleUris;

}]);

app.service('getSingleData', ['singleList', '$http', function(singleList, $http) {

	var self = this;

	// 3. Connect to Spotify API
	function getApi(spotifyUri, rank) {
		$http({
			method: 'GET',
			url: 'https://api.spotify.com/v1/tracks/' + spotifyUri + '?market=ES'
		}).then(function successCallback(response) {
			// 4. Get the data from Spotify and parse it 
			parseSingleData(response, rank);
		}, function errorCallback(response) {
			console.log(response);
		});
	}

	// 2. Send Single to Spotify
	function getSingle() {
		for (var i = 0; i < singleList.singleUris.length; i++) {
			getApi(singleList.singleUris[i].dataUri, singleList.singleUris[i].rank);
		}
	}

	getSingle();

	single = [];

	var parseSingleData = function(json, rank) {
		// todo: add loop to do feats
		var thisSingle = {};
		thisSingle.rank = rank;
		thisSingle.singleName = json.data.name;
		if (thisSingle.singleName.indexOf(' - From "Fifty Shades Of Grey"') !=-1) {
			thisSingle.singleName = thisSingle.singleName.replace(' - From "Fifty Shades Of Grey"', '');
		}
		thisSingle.artist = json.data.artists[0].name;
		if (json.data.artists.length > 1) {
			var string = '';
			for (var i = 0; i < json.data.artists.length; i++) {
				if (i === 0) {
					thisSingle.artist = json.data.artists[i].name;
				} else if (i === 1) {
					string = string + ' feat. ' + json.data.artists[i].name ;
				} else if (i === 2){
					string = string + ', ' + json.data.artists[i].name;
				} else {
					string = string + json.data.artists[i].name;
				}
			}
			thisSingle.artistFeats = string;
		}
		thisSingle.artwork = json.data.album.images[0].url;
		thisSingle.listen = json.data.artists[0].external_urls.spotify;
		thisSingle.preview = json.data.preview_url;
		single.push(thisSingle);
	};

	self.singles = single;

}]);