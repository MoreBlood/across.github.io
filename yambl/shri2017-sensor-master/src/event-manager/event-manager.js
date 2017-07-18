ym.modules.define('shri2017.imageViewer.EventManager', [
    'util.extend'
], function (provide, extend) {

    var EVENTS = {
        mousedown: 'start',
        mousemove: 'move',
        mouseup: 'end',
        touchstart: 'start',
        touchmove: 'move',
        touchend: 'end',
        touchcancel: 'end',
        wheelIn: 'scrollIn',
        wheelOut: 'scrollOut',
        pointerdown: 'start',
        pointerup: 'end',
        pointercancel: 'end',
        pointermove: 'move'
    };

    var mouseEvents = ['mousedown', 'mousemove', 'mouseup'];
    var touchEvents = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];


    function EventManager(elem, callback) {
        this._elem = elem;
        this._callback = callback;
        this._setupListeners();
    }

    extend(EventManager.prototype, {
        destroy: function () {
            this._teardownListeners();
        },

        _setupListeners: function () {

            this._mouseListener = this._mouseEventHandler.bind(this);
            this._addEventListeners('mousedown wheel', this._elem, this._mouseListener);
            this._touchListener = this._touchEventHandler.bind(this);
            this._addEventListeners('touchstart touchmove touchend touchcancel', this._elem, this._touchListener);
            this._pointerListener = this._pointerEventHandler.bind(this);
            this._addEventListeners('pointerdown', this._elem, this._pointerListener);

            this._pointersMap = {};
            this._pointersTP = {};
        },

        _removePointerEvent: function (id) {
            return delete this._pointersMap[id];
        },

        _teardownListeners: function () {
            this._removeEventListeners('mousedown', this._elem, this._mouseListener);
            this._removeEventListeners('mousemove mouseup', document.documentElement, this._mouseListener);
            this._removeEventListeners('touchstart touchmove touchend touchcancel', this._elem, this._touchListener);
            this._removeEventListeners('pointerdown pointerup pointercancel pointermove', this._elem, this._pointerListener);
        },

        _addEventListeners: function (types, elem, callback) {
            types.split(' ').forEach(function (type) {
                elem.addEventListener(type, callback);
            }, this);
        },

        _removeEventListeners: function (types, elem, callback) {
            types.split(' ').forEach(function (type) {
                elem.removeEventListener(type, callback);
            }, this);
        },

        _mouseAndTouchEventHandler: function (event) {
            if (mouseEvents.indexOf(event.type) > -1) console.log('mouseEvents');
            if (touchEvents.indexOf(event.type) > -1) console.log('touchEvents');
        },

        _mouseEventHandler: function (event) {
            event.preventDefault();

            var prefix = "";
            if (event.type === 'mousedown') {
                this._addEventListeners('mousemove mouseup', document.documentElement, this._mouseListener);
            } else if (event.type === 'mouseup') {
                this._removeEventListeners('mousemove mouseup', document.documentElement, this._mouseListener);
            }
            else if (event.type === 'wheel') {
                var delta = Math.max(-1, Math.min(1, (-event.deltaY || -event.detail)));

                if (delta === 1) {
                    prefix = 'In';
                }
                else {
                    prefix = 'Out';
                }
                this._addEventListeners('wheel', this._elem, this._mouseListener);
            }

            var elemOffset = this._calculateElementOffset(this._elem);

            document.getElementById("touches").textContent = "Touches: \n" +
                1 + ": [x: " +  Math.round(event.clientX -elemOffset.x) + ', y: ' + Math.round(event.clientY-elemOffset.y) + "]\n";

            //console.log(event.wheelDelta);

            this._callback({
                type: EVENTS[event.type + prefix],
                targetPoint: {
                    x: event.clientX - elemOffset.x,
                    y: event.clientY - elemOffset.y
                },
                distance: 1,
                inputType: 'mouse'
            });
        },

        _touchEventHandler: function (event) {


            event.preventDefault();
            if (window.PointerEvent) return;

            var types = document.getElementById("touches");
            types.textContent= "Touches: \n";

            var elemOffset = this._calculateElementOffset(this._elem);

            var touches = event.touches;
            // touchend/touchcancel
            if (touches.length === 0) {
                touches = event.changedTouches;
            }
            else{
                for (var i in touches){
                    if (touches.hasOwnProperty(i)){
                        var touch = touches[i];
                        types.textContent += parseInt(i, 10) + 1 + ": [x: " +  Math.round(touch.clientX-  elemOffset.x) + ', y: ' + Math.round(touch.clientY -  elemOffset.y) + "]\n";
                    }
                }
            }

            var targetPoint;
            var distance = 1;

            if (touches.length === 1) {
                targetPoint = {
                    x: touches[0].clientX,
                    y: touches[0].clientY
                };
            } else {
                var firstTouch = touches[0];
                var secondTouch = touches[1];

                if (firstTouch.target.tagName !== 'CANVAS' || secondTouch.target.tagName !== 'CANVAS') return;
                targetPoint = this._calculateTargetPoint(firstTouch, secondTouch);
                distance = this._calculateDistance(firstTouch, secondTouch);
            }



            targetPoint.x -= elemOffset.x;
            targetPoint.y -= elemOffset.y;

            this._callback({
                type: EVENTS[event.type],
                targetPoint: targetPoint,
                distance: distance,
                inputType: 'touch'
            });
        },

        _pointerEventHandler: function (event) {
            event.preventDefault();
            this._pointersMap[event.pointerId] = event;



            var elemOffset = this._calculateElementOffset(this._elem);
            this._pointersTP = {
                x: event.clientX - elemOffset.x,
                y: event.clientY - elemOffset.y
            };

            var distance = 1;

            //console.log(event.type + ": " +  event.pointerId);
            //console.log(event.target.tagName);
            if (event.type === 'pointerdown') {
                if (event.pointerType === 'mouse') this._addEventListeners('pointermove pointerup', document.documentElement, this._pointerListener);
                else this._addEventListeners('pointermove pointerup', this._elem, this._pointerListener);
            }
            else if (event.type === 'pointerup') {
                this._removePointerEvent(event.pointerId);

                if (event.pointerType === 'mouse')
                    this._removeEventListeners('pointermove', document.documentElement, this._pointerListener);
                else
                    this._removeEventListeners('pointermove', this._elem, this._pointerListener);
            }
            var types = document.getElementById("touches");
            types.textContent= "Touches: \n";
            for (var i in Object.keys(this._pointersMap)){
                if (Object.keys(this._pointersMap).hasOwnProperty(i)){
                    var touch = this._pointersMap[Object.keys(this._pointersMap)[i]];
                    types.textContent += parseInt(i, 10) + 1 + ": [x: " +  Math.round(touch.clientX -  elemOffset.x) + ', y: ' + Math.round(touch.clientY -  elemOffset.y) + "]\n";
                }
            }

            if (!Object.keys(this._pointersMap).length) {
                if (event.pointerType === 'mouse')
                    this._removeEventListeners('pointerup pointermove', document.documentElement, this._pointerListener);
                else
                    this._removeEventListeners('pointerup pointermove', this._elem, this._pointerListener);
            }
            else if (Object.keys(this._pointersMap).length === 2) {
                var firstPointer =  this._pointersMap[Object.keys(this._pointersMap)[0]];
                var secondPointer = this._pointersMap[Object.keys(this._pointersMap)[1]];

                distance = this._calculateDistance(firstPointer, secondPointer);

                var _firstPointer = {},
                _secondPointer = {};

                _firstPointer.clientX = firstPointer.clientX - elemOffset.x;
                _firstPointer.clientY = firstPointer.clientY - elemOffset.y;
                _secondPointer.clientX = secondPointer.clientX - elemOffset.x;
                _secondPointer.clientY = secondPointer.clientY - elemOffset.y;

                this._pointersTP = this._calculateTargetPoint(_firstPointer, _secondPointer);
            }
            else if (Object.keys(this._pointersMap).length > 2) return;


            this._callback({
                type: EVENTS[event.type],
                targetPoint: this._pointersTP,
                distance: distance,
                inputType: 'pointer ' + event.pointerType
            });
        },

        _calculateTargetPoint: function (firstTouch, secondTouch) {
            return {
                x: (secondTouch.clientX + firstTouch.clientX) / 2,
                y: (secondTouch.clientY + firstTouch.clientY) / 2
            };
        },

        _calculateDistance: function (firstTouch, secondTouch) {
            return Math.sqrt(
                Math.pow(secondTouch.clientX - firstTouch.clientX, 2) +
                Math.pow(secondTouch.clientY - firstTouch.clientY, 2)
            );
        },

        _calculateElementOffset: function (elem) {
            var bounds = elem.getBoundingClientRect();
            return {
                x: bounds.left,
                y: bounds.top
            };
        }
    });

    provide(EventManager);
});
