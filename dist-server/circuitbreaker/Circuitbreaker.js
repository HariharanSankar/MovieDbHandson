"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CircuitBreaker = /*#__PURE__*/function () {
  function CircuitBreaker(request) {
    _classCallCheck(this, CircuitBreaker);

    this.request = request;
    this.state = "CLOSED";
    this.failureThreshold = 3;
    this.failureCount = 0;
    this.successThreshold = 2;
    this.successCount = 0;
    this.timeout = 6000;
    this.nextAttempt = Date.now();
  }

  _createClass(CircuitBreaker, [{
    key: "fire",
    value: function fire() {
      if (this.state === "OPEN") {
        if (this.nextAttempt <= Date.now()) {
          this.state = "HALF";
        } else {
          throw new Error("Breaker is OPEN");
        }
      }

      try {
        var response = this.request();
        return this.success(response);
      } catch (err) {
        return this.fail(err);
      }
    }
  }, {
    key: "success",
    value: function success(response) {
      if (this.state === "HALF") {
        this.successCount++;

        if (this.successCount > this.successThreshold) {
          this.successCount = 0;
          this.state = "CLOSED";
        }
      }

      this.failureCount = 0;
      this.status("Success");
      return response;
    }
  }, {
    key: "fail",
    value: function fail(err) {
      this.failureCount++;

      if (this.failureCount >= this.failureThreshold) {
        this.state = "OPEN";
        this.nextAttempt = Date.now() + this.timeout;
      }

      this.status("Failure");
      return err;
    }
  }, {
    key: "status",
    value: function status(action) {
      console.table({
        Action: action,
        Timestamp: Date.now(),
        Successes: this.successCount,
        Failures: this.failureCount,
        "Next State": this.state
      });
    }
  }]);

  return CircuitBreaker;
}();

var _default = CircuitBreaker;
exports["default"] = _default;