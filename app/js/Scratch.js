"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var name1 = function () {
    function name1(obj) {
        _classCallCheck(this, name1);

        this.el = obj.el;
        this.imgUrl = obj.imgUrl;
        this.can = this.el.querySelector("#can");
        this.winResult = this.el.querySelector(".win-result");
        this.ctx = this.can.getContext("2d");
        this.img = new Image();
        this.offsetTopT = null;
        this.offsetLeftL = null;
        this.offsetTopPar = null;
        this.offsetLeftPar = null;
        this.data = null;
        this.canW = this.can.width;
        this.canH = this.can.height;
        this.x = null; //计算清楚的坐标x轴；
        this.y = null; //计算清楚的坐标y轴；
        this.init();
    }

    _createClass(name1, [{
        key: "init",
        value: function init() {
            this.drawingCtx();
            this.clearCtx();
        }
    }, {
        key: "drawingCtx",
        value: function drawingCtx() {
            var _this = this;

            this.ctx.fillStyle = "#999";
            this.ctx.fillRect(0, 0, this.canW, this.canH);
            this.img.src = this.imgUrl;
            this.img.onload = function () {
                _this.ctx.drawImage(_this.img, 0, 0, _this.canW, _this.canH); //添加图片
            };
        }
    }, {
        key: "clearCtx",
        value: function clearCtx() {
            var _this2 = this;

            this.can.ontouchstart = function () {
                _this2.ctx.globalCompositeOperation = "destination-out"; //做canvas清楚重叠部分
            };
            this.can.ontouchmove = function (e) {
                // setTimeout(()=> {
                //     this.canData();
                // },0)

                _this2.x = e.changedTouches[0].clientX - _this2.offsetLeft(_this2.can);
                _this2.y = e.changedTouches[0].clientY - _this2.offsetTop(_this2.can);
                // ctx.fillRect(x-50,y-50,100,100);
                _this2.ctx.beginPath();
                _this2.ctx.moveTo(_this2.x, _this2.y);
                _this2.ctx.lineTo(_this2.x + 50, _this2.y);
                _this2.ctx.lineTo(_this2.x, _this2.y + 30);
                _this2.ctx.fill(); //画线清楚画布
                console.log("x000");
            };
        }
    }, {
        key: "offsetTop",
        value: function offsetTop(elem) {
            this.offsetTopT = elem.offsetTop;
            this.offsetTopPar = elem.offsetParent;
            while (this.offsetTopPar) {
                this.offsetTopT += this.offsetTopPar.offsetTop;
                this.offsetTopPar = this.offsetTopPar.offsetParent;
            }
            return this.offsetTopT; //offsetTop元素距离上边的距离
        }
    }, {
        key: "offsetLeft",
        value: function offsetLeft(elem) {
            this.offsetLeftL = elem.offsetLeft;
            this.offsetLeftPar = elem.offsetParent;
            while (this.offsetLeftPar) {
                this.offsetLeftL += this.offsetLeftPar.offsetLeft;
                this.offsetLeftPar = this.offsetLeftPar.offsetParent;
            }
            return this.offsetLeftL; //offsetTop元素距离左边的距离
        }
    }, {
        key: "canData",
        value: function canData() {
            //计算画布的像素信息
            this.data = this.ctx.getImageData(0, 0, this.can.width, this.can.height).data;
            console.log(this.data);
            var j = 0;
            for (var i = 0; i < this.data.length; i += 4) {
                console.log(i);
                if (this.data[i] == 0) {
                    j++;
                    if (j / (this.data.length / 4 > 0.7)) {
                        this.ctx.fillRect(0, 0, 360, 360);
                    }
                }
            }
        }
    }]);

    return name1;
}();