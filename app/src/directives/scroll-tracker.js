angular.module('cherry').directive('scrollTracker', function($window, $timeout) {
    return {
        restrict: 'A',
        scope: {},
        replace: true,
        controller: function($scope, $element, $attrs) {
            $timeout(function() {
                angular.element($window).bind("scroll", function(event) {
                    console.log(this.pageYOffset);
                });
            }, 500);
        }
    };
});