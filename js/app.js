var app = angular.module('chatApp', ['firebase', 'angularMoment']);

app.controller('chatController', function($scope, $firebaseArray, $firebaseObject) {

	$scope.newAuthor = 'Guest ' + Math.round(Math.random() * 127 + 1);

	var ref = new Firebase('https://glaring-heat-2464.firebaseio.com/messages');
	$scope.messages = $firebaseArray(ref.orderByChild('date').startAt(Date.now()));

	ref.orderByChild('date').limitToLast(10).once('value', function(data) {
		$('#loading-past-data').remove();
		$scope.pastMessages = data.val();
	});

	ref.on('child_added', function(snapshot) {
		console.log('scroll');
		$("#chatContainer").animate({
			scrollTop: $('#bottom').position().top
		}, 400);
	});

	$scope.setName = function() {
		$('#overlayName').animate({
				opacity: 0
			},
			300,
			function() {
				this.remove();
			});
	}

	$scope.addMessage = function() {
		$scope.messages.$add({
			author: $scope.newAuthor,
			text: $scope.newText,
			date: Date.now()
		});

		$scope.newText = '';
	}

});

$(function() {
	//on document ready

	var layout = function() {
		$('#container').height($('body').innerHeight() - $('#newMessage').outerHeight());
		$('#newMessage').width($('#outerContainer').width());
	};

	layout();

	$(window).resize(layout);
});