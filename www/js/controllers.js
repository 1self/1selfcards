angular.module('starter.controllers', [])

.service('userCardsService', function() {
  var cardsArray;
  var swipedCardsArray = [];
  var colourArray = [ '#dd2649', '#00a2d4', '#e93d31', '#f2ae1c','#61b346', '#cf4b9a', '#367ec0', '#00ad87'];

  var getCards = function() {
    if (!cardsArray) {
      cardsArray = [
        { cardId: 1, cardText: 'Yesterday: 6th highest minutes of coding', image: 'img/pic4.jpg', username: 'marv', usericon: 'img/marv.jpeg', cardStyle: {'border-color': colourArray[1] }},
        { cardId: 2, cardText: 'Last 7 days: ed did 25 minutes more coding than marv', image: 'img/pic.jpg', username: 'ed', usericon: 'img/ed.jpg', cardStyle: {'border-color': colourArray[2] }},
        { cardId: 3, cardText: "Ed's most popular coding day is a Tuesday", image: 'img/pic2.jpg', username: 'ed', usericon: 'img/ed.jpg', cardStyle: {'border-color': colourArray[3] }},
        { cardId: 4, cardText: 'Coding minutes 23% up on your average Tuesday', image: 'img/pic3.jpg', username: 'marv', usericon: 'img/marv.jpeg', cardStyle: {'border-color': colourArray[4] }},
        { cardId: -1, cardText: 'No more cards right now', image: 'img/pic3.jpg', username: '1self', usericon: 'img/marv.jpeg', cardStyle: {'border-color': colourArray[5] }}
      ];
    }
    return cardsArray;
  };

  var addCard = function(newObj) {
    cardsArray.push(newObj);
  };

  var getCardById = function(cardId) {
    var cardsArray = getCards();
    for (var i = 0; i < cardsArray.length; i++) {
      if (cardId === cardsArray[i].cardId)
        return cardsArray[i];
    }
    return false;
  };

  var swipeOff = function(indexToSwipe) {
    var swipedCards = cardsArray.splice(indexToSwipe, 1);
    swipedCardsArray = swipedCardsArray.concat(swipedCards);
    return cardsArray;
  };

  var refreshCards = function() {
    console.log("cardsArray", cardsArray);
    console.log("swipedCardsArray", swipedCardsArray);
    if (cardsArray.length === 1)
      swipeOff(0);
    cardsArray = swipedCardsArray.concat(cardsArray);
    console.log("cardsArray", cardsArray);
    swipedCardsArray = [];
    return cardsArray;
  };

  return {
    getCards: getCards,
    addCard: addCard,
    getCardById: getCardById,
    swipeOff: swipeOff,
    refreshCards: refreshCards
  };

})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggaexx', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('RiverCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggaexx', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('DashboardCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggaexx', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('CardBackCtrl', function($scope, $stateParams, userCardsService) {
  console.log($scope);
  console.log($stateParams);
  console.log($stateParams.cardId);
  console.log(userCardsService.getCardById(parseInt($stateParams.cardId)));
  $scope.card = userCardsService.getCardById(parseInt($stateParams.cardId));
})

.controller('CardsCtrl', function($scope, TDCardDelegate, userCardsService, $cordovaSocialSharing) {
  console.log('CARDS CTRL');
  
  $scope.shareAnywhere = function() {
    console.log('shareAnywhere');
    console.log($cordovaSocialSharing);
    $cordovaSocialSharing.share("This is your message", "This is your subject", null, "http://blog.nraboy.com");
  };

  $scope.getMoreCards = function() {
    $scope.cards = userCardsService.refreshCards();
  };

  $scope.cardSwiped = function(index) {
    console.log('cardSwiped');
    $scope.addCard();
  };

  $scope.cardDestroyed = function(index) {
    console.log('cardDestroyed', index);
    $scope.cards = userCardsService.swipeOff(index);
    // $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    console.log('addCard');
  };

  // Do work
  $scope.cards = userCardsService.getCards();
  console.log('Cards', $scope.cards);
})

.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {
  $scope.goAway = function() {
    console.log('goAway');
    var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);
    card.swipe();
  };
});
