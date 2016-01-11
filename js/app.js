var app = angular.module('app', ['ngRoute']);

app.controller('top10Albums', ['$http', 'getAlbumData', function($http, getAlbumData) {

	var self = this;

	// kanye west
	// var mula = 'spotify:track:3H2SdgGjREhOdvtlKUCWGy';
	// var smuckers = 'spotify:track:078C2jXg7XsMgW78Gfx1JA';
	// var jukeboxJoints = 'spotify:track:2gAGWaK4wvt2xrFUlR4mK8';
	// var iDontFuckWithYou = 'spotify:track:4w7yrP4RAeeyhfG9nJqQvS';
	// var tellYourFans = 'spotify:track:28YLWwEB6xnJQYN7e062rH';
	// var fourFiveSeconds = 'spotify:track:5XzmZjXhMjDHr7ZfJ6DELQ';
	// var guardDown = 'spotify:track:0XLCdSMvlyKLwaajBZK1gW';
	// var onlyOne = 'spotify:track:4ZIb6YivyYtpOD0Ur7kDEP';
	// var mpa = 'spotify:track:3YiqWQsEkdsnMFx0o2LqbG';
	// var nine0210 = 'spotify:track:51EC3I1nQXpec4gDk0mQyP';
	// var lunchMoney = 'spotify:track:2tszsaDwdhbrkFAkxWWaHS';
	// var sanctified = 'spotify:track:2OmjhVnagJ8SVJDbj9eWrL';


	self.albums = getAlbumData.albums;

}])

app.controller('top10Singles', ['$http', 'getSingleData', function($http, getSingleData) {

	var self = this;

	self.singles = getSingleData.singles;

}]);

app.config(function ($routeProvider) {
	// needs 'ngRoute' module
	$routeProvider
		.when('/', {
			templateUrl: 'js/pages/albums.html',
			controller: 'top10Albums'
		})
		.when('/singles', {
			templateUrl: 'js/pages/singles.html',
			controller: 'top10Singles'
		})
});

app.controller('navigation', ['$location', function($location) {
	var self = this;

	self.location = $location.path();

	console.log(self.location)
}])

app.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
    // <audio ng-src="{{ src-link-for-song | trusted }}" controls></audio>
}]);
