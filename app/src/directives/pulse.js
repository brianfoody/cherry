angular.module('cherry').directive('pulse', function($interval) {
    return {
        restrict: 'C',
        scope: {},
        link: function($scope, $element, $attrs, ctrl) {
            var x = -100;
            $interval(function() {
                x = x * -1;

                ctrl.iElement.spring({ tension: 20, damping: 5}).from(0,0).to({x:x, y:0}).start()
            }, 750);
        },
        controller: function($scope, $element) {
            this.htmlElement = $element[0];

            this.iElement = Impulse(this.htmlElement).style({
                'scale': function(x, y) {
                    return 1+(x/1100);
                }
            });
        }
    };
});