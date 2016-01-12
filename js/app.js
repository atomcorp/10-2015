var app = angular.module('app', ['ngRoute']);

app.controller('top10Albums', ['$http', 'getAlbumData', function($http, getAlbumData) {

	var self = this;

	self.albums = getAlbumData.albums;

}]);

app.controller('top10Singles', ['$http', 'getSingleData', function($http, getSingleData) {

	var self = this;

	self.singles = getSingleData.singles;

}]);

app.controller('top10Kanye', ['$http', '$timeout', 'getKanyeData', function($http, $timeout, getKanyeData) {

	var self = this;

	self.kanye = getKanyeData.kanyes; 


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
		.when('/kanye', {
			templateUrl: 'js/pages/kanye.html',
			controller: 'top10Kanye'
		});
});

app.controller('navigation', ['$location', function($location) {
	var self = this;

	self.isActive = function (viewLocation) {
	     var active = (viewLocation === $location.path());
	     return active;
	};

}]);


app.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
    // <audio ng-src="{{ src-link-for-song | trusted }}" controls></audio>
}]);
