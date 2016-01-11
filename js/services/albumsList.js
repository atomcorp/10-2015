app.service('albumList', [function() {

	// 1. Get Initial Data

	var self = this;

	var artAngels = '5hB4jVN4ZHpubyiMmW81K1';
	var freeTc = '2DtLmzu6cCDYO9U53a6hRA';
	var sourSoul = '1lvwZvotQke1mhZbwadECt';
	var summertime06 = '59olnuVrXXgrDH4wknpDLC';
	var haveYouInMyWilderness = '1kVTV6AoeMjAOMOJyVfYOl';
	var inji = '4bYe7wIj8bQr57ghYYyPAF';
	var dumbFlesh = '2f6y5TjWHIuaiBY9A2ZtHm';
	var atLongLastAsap = '3arNdjotCvtiiLFfjKngMc';
	var currents = '79dL7FLiJFOO0EoehUHQBv';
	var sucker = '2fGpw56D35My0c82eNfKJF';

	var albumUris = [  
	   {  
	      dataUri:artAngels,
	      rank:1
	   },
	   {  
	      dataUri:freeTc,
	      rank:2
	   },
	   {  
	      dataUri:sourSoul,
	      rank:8
	   },
	   {  
	      dataUri:summertime06,
	      rank:7
	   },
	   {  
	      dataUri:haveYouInMyWilderness,
	      rank:4
	   },
	   {  
	      dataUri:inji,
	      rank:3
	   },
	   {  
	      dataUri:dumbFlesh,
	      rank:6
	   },
	   {  
	      dataUri:atLongLastAsap,
	      rank:5
	   },
	   {  
	      dataUri:currents,
	      rank:10
	   },
	   {  
	      dataUri:sucker,
	      rank:9
	   }
	];

	self.albumUris = albumUris;

}]);

app.service('getAlbumData', ['albumList', '$http', function(albumList, $http) {

	var self = this;

	// 3. Connect to Spotify API
	function getApi(spotifyUri, rank) {
		$http({
			method: 'GET',
			url: 'https://api.spotify.com/v1/albums/' + spotifyUri + '?market=ES'
		}).then(function successCallback(response) {
			// 4. Get the data from Spotify and parse it 
			parseAlbumData(response, rank);
		}, function errorCallback(response) {
			console.log(response);
		});
	}

	// 2. Send Album to Spotify
	function getAlbums() {
		for (var i = 0; i < albumList.albumUris.length; i++) {
			getApi(albumList.albumUris[i].dataUri, albumList.albumUris[i].rank);
		};
	}

	getAlbums();

	albums = [];

	var parseAlbumData = function(json, rank) {
		var thisAlbum = {};
		thisAlbum.rank = rank;
		thisAlbum.albumName = json.data.name;
		if (json.data.artists.length > 1) {
			var string = '';
			for (var i = 0; i < json.data.artists.length; i++) {
				if (i === 0) {
					string = string + json.data.artists[i].name;
				} else {
					string = string + ', ' + json.data.artists[i].name;
				}
			}
			thisAlbum.artist = string;
		} else {
			thisAlbum.artist = json.data.artists[0].name;
		}
		thisAlbum.artwork = json.data.images[0].url;
		thisAlbum.listen = json.data.external_urls.spotify;
		thisAlbum.tracklist = [];
		thisAlbum.previewList = [];
		var trackNumber = json.data.tracks.total;
		for (var i = 0; i < trackNumber; i++) {
			var track = json.data.tracks.items[i].name;
			var preview = json.data.tracks.items[i].preview_url;
			thisAlbum.tracklist.push(track);
			thisAlbum.previewList.push(preview);
		};
		albums.push(thisAlbum);
	}

	self.albums = albums;

}]);