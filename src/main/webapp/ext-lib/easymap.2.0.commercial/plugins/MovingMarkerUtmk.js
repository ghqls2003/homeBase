L.interpolatePosition = function (p1, p2, duration, t) {
    var k = t / duration;
    k = (k > 0) ? k : 0;
    k = (k > 1) ? 1 : k;
    return L.UTMK(p1.x + k * (p2.x - p1.x), p1.y + k * (p2.y - p1.y), {});

};

L.Marker.MovingMarker = L.Marker.extend({

    //state constants
    statics: {
        notStartedState: 0,
        endedState: 1,
        pausedState: 2,
        runState: 3
    },

    options: {
        autostart: false,
        loop: false,
    },

    initialize: function (utmks, durations, options) {
        L.Marker.prototype.initialize.call(this, utmks[0], options);

        /* this._utmks = utmks.map(function (e, index) {
         return L.UTMK(e[0], e[1]);
         });*/

        for (var i = 0; i < utmks.length; i++) {
            utmks[i].x = utmks[i][0];
            utmks[i].y = utmks[i][1];
        }

        this._utmks = utmks;

        if (durations instanceof Array) {
            this._durations = durations;
        } else {
            this._durations = this._createDurations(this._utmks, durations);
        }

        this._currentDuration = 0;
        this._currentIndex = 0;
        this._marker = L.Marker.MovingMarker;
        this._state = L.Marker.MovingMarker.notStartedState;
        this._startTime = 0;
        this._startTimeStamp = 0;  // timestamp given by requestAnimFrame
        this._pauseStartTime = 0;
        this._animId = 0;
        this._animRequested = false;
        this._currentLine = [];
        this._stations = {};
    },

    isRunning: function () {
        return this._state === L.Marker.MovingMarker.runState;
    },

    isEnded: function () {
        return this._state === L.Marker.MovingMarker.endedState;
    },

    isStarted: function () {
        return this._state !== L.Marker.MovingMarker.notStartedState;
    },

    isPaused: function () {
        return this._state === L.Marker.MovingMarker.pausedState;
    },

    setEndEvent: function () {

    },

    setMapMove: function () {

    },

    getMarker:function(){
        return this._marker;
    },

    start: function () {
        if (this.isRunning()) {
            return;
        }

        if (this.isPaused()) {
            this.resume();
        } else {
            this._loadLine(0);
            this._startAnimation();
            this.fire('start');
        }
    },

    resume: function () {
        if (!this.isPaused()) {
            return;
        }
        // update the current line

        this._currentLine[0] = this.getUTMK();
        this._currentDuration -= (this._pauseStartTime - this._startTime);
        this._startAnimation();
    },

    pause: function () {
        if (!this.isRunning()) {
            return;
        }

        this._pauseStartTime = Date.now();
        this._state = L.Marker.MovingMarker.pausedState;
        this._stopAnimation();
        this._updatePosition();
    },

    stop: function (elapsedTime) {
        if (this.isEnded()) {
            return;
        }

        this._stopAnimation();

        if (typeof(elapsedTime) === 'undefined') {
            // user call
            elapsedTime = 0;
            this._updatePosition();
        }

        this._state = L.Marker.MovingMarker.endedState;
        this.fire('end', {elapsedTime: elapsedTime});
    },

    addUTMK: function (UTMK, duration) {
        this._utmks.push(L.UTMK(UTMK));
        this._durations.push(duration);
    },

    moveTo: function (UTMK, duration) {
        this._stopAnimation();
        this._utmks = [this.getUTMK(), L.UTMK(UTMK)];
        this._durations = [duration];
        this._state = L.Marker.MovingMarker.notStartedState;
        this.start();
        this.options.loop = false;
    },

    addStation: function (pointIndex, duration) {
        if (pointIndex > this._utmks.length - 2 || pointIndex < 1) {
            return;
        }
        this._stations[pointIndex] = duration;
    },

    onAdd: function (map) {
        L.Marker.prototype.onAdd.call(this, map);

        if (this.options.autostart && (!this.isStarted())) {
            this.start();
            return;
        }

        if (this.isRunning()) {
            this._resumeAnimation();
        }
    },

    onRemove: function (map) {
        L.Marker.prototype.onRemove.call(this, map);
        this._stopAnimation();
    },

    _createDurations: function (utmks, duration) {
        var lastIndex = utmks.length - 1;
        var distances = [];
        var totalDistance = 0;
        var distance = 0;

        // compute array of distances between points
        for (var i = 0; i < lastIndex; i++) {
            distance = utmks[i + 1].distanceTo(utmks[i]);
            distances.push(distance);
            totalDistance += distance;
        }

        var ratioDuration = duration / totalDistance;

        var durations = [];
        for (i = 0; i < distances.length; i++) {
            durations.push(distances[i] * ratioDuration);
        }

        return durations;
    },

    _startAnimation: function () {
        this._state = L.Marker.MovingMarker.runState;
        this._animId = L.Util.requestAnimFrame(function (timestamp) {
            this._startTime = Date.now();
            this._startTimeStamp = timestamp;
            this._animate(timestamp);
        }, this, true);
        this._animRequested = true;
    },

    _resumeAnimation: function () {
        if (!this._animRequested) {
            this._animRequested = true;
            this._animId = L.Util.requestAnimFrame(function (timestamp) {
                this._animate(timestamp);
            }, this, true);
        }
    },

    _stopAnimation: function () {
        if (this._animRequested) {
            L.Util.cancelAnimFrame(this._animId);
            this._animRequested = false;
        }
    },

    _updatePosition: function () {
        var elapsedTime = Date.now() - this._startTime;
        this._animate(this._startTimeStamp + elapsedTime, true);
    },

    _loadLine: function (index) {
        this._currentIndex = index;
        this._currentDuration = this._durations[index];
        this._currentLine = this._utmks.slice(index, index + 2);
    },

    /**
     * Load the line where the marker is
     * @param  {Number} timestamp
     * @return {Number} elapsed time on the current line or null if
     * we reached the end or marker is at a station
     */
    _updateLine: function (timestamp) {
        // time elapsed since the last UTMK
        var elapsedTime = timestamp - this._startTimeStamp;

        // not enough time to update the line
        if (elapsedTime <= this._currentDuration) {
            return elapsedTime;
        }

        var lineIndex = this._currentIndex;
        var lineDuration = this._currentDuration;
        var stationDuration;

        while (elapsedTime > lineDuration) {
            // substract time of the current line
            elapsedTime -= lineDuration;
            stationDuration = this._stations[lineIndex + 1];

            // test if there is a station at the end of the line
            if (stationDuration !== undefined) {
                if (elapsedTime < stationDuration) {
                    this.setUTMK(this._utmks[lineIndex + 1]);
                    return null;
                }
                elapsedTime -= stationDuration;
            }

            lineIndex++;

            // test if we have reached the end of the polyline
            if (lineIndex >= this._utmks.length - 1) {

                if (this.options.loop) {
                    lineIndex = 0;
                    this.fire('loop', {elapsedTime: elapsedTime});
                } else {
                    // place the marker at the end, else it would be at
                    // the last position
                    this.setUTMK(this._utmks[this._utmks.length - 1]);
                    this.stop(elapsedTime);
                    return null;
                }
            }
            lineDuration = this._durations[lineIndex];
        }

        this._loadLine(lineIndex);
        this._startTimeStamp = timestamp - elapsedTime;
        this._startTime = Date.now() - elapsedTime;
        return elapsedTime;
    },

    _animate: function (timestamp, noRequestAnim) {
        this._animRequested = false;

        // find the next line and compute the new elapsedTime
        var elapsedTime = this._updateLine(timestamp);

        if (this.isEnded()) {
            // no need to animate
            this.setEndEvent();
            return;
        }

        if (elapsedTime != null) {
            // compute the position
            var p = L.interpolatePosition(this._currentLine[0],
                this._currentLine[1],
                this._currentDuration,
                elapsedTime);
            this.setUTMK(p);
            this.setMapMove();
        }

        if (!noRequestAnim) {
            this._animId = L.Util.requestAnimFrame(this._animate, this, false);
            this._animRequested = true;
        }
    }
});

L.Marker.movingMarker = function (utmks, duration, options) {
    return new L.Marker.MovingMarker(utmks, duration, options);
};
