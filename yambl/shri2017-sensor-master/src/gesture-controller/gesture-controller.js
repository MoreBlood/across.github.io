ym.modules.define('shri2017.imageViewer.GestureController', [
    'shri2017.imageViewer.EventManager',
    'util.extend'
], function (provide, EventManager, extend) {

    var DBL_TAB_STEP = 0.2;

    var Controller = function (view) {
        this._view = view;
        this._eventManager = new EventManager(
            this._view.getElement(),
            this._eventHandler.bind(this)
        );
        this._lastEventTypes = '';
        this._PerformingOneTouch = false;
        this._GestureHTML = document.getElementById("gesture");

    };

    extend(Controller.prototype, {
        destroy: function () {
            this._eventManager.destroy();
        },

        _eventHandler: function (event) {
            document.getElementById("type").textContent= "Using: " +  event.inputType;

            var state = this._view.getState();

            // dblclick
            if (!this._lastEventTypes) {
                this._timeOut = setTimeout(function () {
                    this._lastEventTypes = '';
                    //console.log('lastEventTypes cleared');
                }.bind(this), 500);
            }
            this._lastEventTypes += ' ' + event.type;
            //console.log(this._lastEventTypes);
            //double tap
            if (this._lastEventTypes.match(/start.+end.+start.+end/)) {
                clearTimeout(this._timeOut);
                this._lastEventTypes = '';
                this._processDbltab(event);
                return;
            }
            //one touch end
            if (this._lastEventTypes.match(/end/) && this._oneTouch) {
                clearTimeout(this._timeOut);
                this._lastEventTypes = '';
                this._oneTouch = false;
                //high dpi fix for dbltap
                if (!this._PerformingOneTouch) {
                    this._processDbltab(event);
                    clearTimeout(this._PerformingOneTouchInterval);
                    this._PerformingOneTouch = false;
                }

                return;
            }
            //one touch
            if (this._lastEventTypes.match(/start.+end.+start.+move/) || this._oneTouch) {
                this._lastEventTypes = '';
                this._oneTouch = true;

                this._PerformingOneTouchInterval = setTimeout(function () {
                    this._PerformingOneTouch = true;
                    console.log('performing one touch...')
                }.bind(this), 500);

                var delta = this._initEvent.targetPoint.y - event.targetPoint.y;
                this._processOneTouch(event, delta);
                clearTimeout(this._timeOut);
                return;
            }
            //maybe can break fast gesture start after previous gesture in IE/EDGE and
            if (this._lastEventTypes.match(/move end/)) {
                clearTimeout(this._timeOut);
            }

            if (event.type === 'move') {

                if (event.distance > 1 && event.distance !== this._initEvent.distance) {
                    this._processMultitouch(event);
                } else {
                    this._processDrag(event);
                }
            } else {
                this._initState = this._view.getState();
                this._initEvent = event;
            }

            if (event.type === 'scrollIn') {
                this._processScroll(event, 1);
                clearTimeout(this._timeOut);
            }
            else if (event.type === 'scrollOut') {
                this._processScroll(event, -1);
                clearTimeout(this._timeOut);
            }
        },

        _processDrag: function (event) {
            this._GestureHTML.textContent= "Gesture: Drag";
            //console.log(this._initEvent.targetPoint);
            this._view.setState({
                positionX: this._initState.positionX + (event.targetPoint.x - this._initEvent.targetPoint.x),
                positionY: this._initState.positionY + (event.targetPoint.y - this._initEvent.targetPoint.y)
            });
        },
        _processScroll: function (event, delta) {
            this._GestureHTML.textContent= "Gesture: Scroll Zoom";
            this._scale(
                event.targetPoint,
                this._initState.scale * (1 + delta * 0.015)
            );
        },
        _processOneTouch: function (event, delta) {

            if (event.inputType.match(/mouse/)) return;
            this._GestureHTML.textContent= "Gesture: OneTouch Zoom";
            this._scale(
                this._initEvent.targetPoint,
                this._initState.scale * (1 + delta * 0.005)
            );
        },
        _processMultitouch: function (event) {

            this._GestureHTML.textContent= "Gesture: MultiTouch Zoom";
            this._scale(
                event.targetPoint,
                this._initState.scale * (event.distance / this._initEvent.distance)
            );
        },
        _processDbltab: function (event) {

            this._GestureHTML.textContent= "Gesture: Double Tap Zoom";
            var state = this._view.getState();
            this._scale(
                event.targetPoint,
                state.scale + DBL_TAB_STEP
            );
        },
        _scale: function (targetPoint, newScale) {
            newScale = Math.max(Math.min(newScale, 10), 0.02);

            var imageSize = this._view.getImageSize();
            var state = this._view.getState();
            // Позиция прикосновения на изображении на текущем уровне масштаба
            var originX = targetPoint.x - state.positionX;
            var originY = targetPoint.y - state.positionY;
            // Размер изображения на текущем уровне масштаба
            var currentImageWidth = imageSize.width * state.scale;
            var currentImageHeight = imageSize.height * state.scale;
            // Относительное положение прикосновения на изображении
            var mx = originX / currentImageWidth;
            var my = originY / currentImageHeight;
            // Размер изображения с учетом нового уровня масштаба
            var newImageWidth = imageSize.width * newScale;
            var newImageHeight = imageSize.height * newScale;
            // Рассчитываем новую позицию с учетом уровня масштаба
            // и относительного положения прикосновения
            state.positionX += originX - (newImageWidth * mx);
            state.positionY += originY - (newImageHeight * my);

            state.pivotPointX = targetPoint.x;
            state.pivotPointY = targetPoint.y;
            // Устанавливаем текущее положение мышки как "стержневое"

            // Устанавливаем масштаб и угол наклона
            state.scale = newScale;
            this._view.setState(state);
        }
    });

    provide(Controller);
});
