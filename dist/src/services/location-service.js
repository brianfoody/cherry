angular.module('cherry').service('locationService', function() {
    this.elementLocation = function(htmlElement) {
        var rect = htmlElement.getBoundingClientRect();

        return {x: rect.left, y: rect.top};
    };

    this.relativePosition = function(from, to) {
        if (!to || !from) {
            return;
        }
        return {x: to.x - from.x, y: to.y - from.y};
    };
});