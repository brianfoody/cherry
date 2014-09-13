angular.module('cherry').controller('MainController', function($timeout) {
    var self = this;

    this.title = "Test site!";

    $timeout(function() {
        self.initialised = true;
    }, 200);
});