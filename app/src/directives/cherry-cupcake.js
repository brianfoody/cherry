angular.module('cherry').directive('cherryCupcake', function($timeout, locationService, WindowHeight, WindowWidth) {
    return {
        restrict: 'C',
        scope: {},
        link: function($scope, $element, $attrs, cakeCtrl) {
            $timeout(function() {
                $(cakeCtrl.cherry).css('visibility', 'visible');

                var cherryLoc = locationService.elementLocation(cakeCtrl.cherry);

                var cherryTop = cakeCtrl.topPositionRelativeTo(cherryLoc);

                cakeCtrl.iCherry.accelerate({
                 bounce: true,
                 acceleration: 4000,
                 damping: 0,
                 minBounceDistance: 5
                 }).velocity(0, 0).from(0, 0).to(cherryTop.x, cherryTop.y + 50).start().then(
                 cakeCtrl.iCake.spring({ tension: 1000, damping: 20}).from(0,0).to({x:100, y:0}).start
                 );
            }, 750);
        },
        controller: function($scope, $element) {
            this.cherryBottom = 50;
            this.cake = $element.find('.cupcake')[0];
            this.cherry = $element.find('.cherry')[0];
            this.cherryOffset = this.cake.height + this.cherry.height - this.cherryBottom;

            this.iCake = Impulse(this.cake).style({
                'scale': function(x, y) {
                    return 1+(x/1100);
                }
            });
            this.iCherry = Impulse(this.cherry).style({
                'translate': function(x, y) {
                    return x + 'px, ' + y + 'px';
                }
            });

            this.cupcakeLocation = function () {
                return locationService.elementLocation(this.cake)
            };

            this.cakeWidth = function() {
                return $(this.cake).width();
            };

            this.cakeHeight = function() {
                return $(this.cake).height();
            };

            this.topPositionRelativeTo = function(location) {
                var relative = locationService.relativePosition(location, this.cupcakeLocation());
                var offset = this.cakeWidth()/3;
                return {x: relative.x + offset - this.cakeWidth() / 2, y: relative.y - this.cakeHeight()};
            };
        }
    };
});