angular.module('cherry').directive('sslide', function($timeout, WindowHeight, WindowWidth) {
    return {
        restrict: 'EC',
        scope: {},
        replace: false,
        link: function($scope, $element, $attrs) {
            var slide = Impulse($element).style({
                'translate': function(x, y) {
                    return x + 'px, ' + y + 'px';
                }
            });

            /*$element.on('click touch', function() {
                slide.accelerate({acceleration: 1000}).from(0,0).to(-2000, 0).start();
            });*/
        }
    };
});