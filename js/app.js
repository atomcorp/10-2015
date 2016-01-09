var app = angular.module('app', []);

app.controller('top10', ['$http', function($http) {

	var self = this;

	var artAngels = '5hB4jVN4ZHpubyiMmW81K1';

	var getApi = function(albumApi) {
		$http({
			method: 'GET',
			url: 'https://api.spotify.com/v1/albums/' + albumApi + '?market=ES'
		}).then(function successCallback(response) {
			getArtist(response);
		}, function errorCallback(response) {
			console.log(response);
		});
	}

	getApi(artAngels);

	var getArtist = function(json) {
		self.album = json.data.name;
		self.artist = json.data.artists[0].name;
		self.artwork = json.data.images[1].url;
		self.listen = json.data.external_urls.spotify;
		self.tracklist = [];
		var trackNumber = json.data.tracks.total;
		for (var i = 0; i < trackNumber; i++) {
			var track = json.data.tracks.items[i].name;
			self.tracklist.push(track);
			// console.log(self.tracklist);
		};
	}


}]);