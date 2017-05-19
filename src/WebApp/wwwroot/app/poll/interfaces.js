"use strict";
(function (SignalRConnectionStatus) {
    SignalRConnectionStatus[SignalRConnectionStatus["Connected"] = 1] = "Connected";
    SignalRConnectionStatus[SignalRConnectionStatus["Disconnected"] = 2] = "Disconnected";
    SignalRConnectionStatus[SignalRConnectionStatus["Error"] = 3] = "Error";
})(exports.SignalRConnectionStatus || (exports.SignalRConnectionStatus = {}));
var SignalRConnectionStatus = exports.SignalRConnectionStatus;
//# sourceMappingURL=interfaces.js.map