/*global define*/

define(
    [],
    function (PlotOverlayMode, PlotStackedMode) {
        "use strict";

        var STACKED = {
                key: "stacked",
                name: "Stacked",
                glyph: "8",
                factory: PlotOverlayMode
            },
            OVERLAID = {
                key: "overlaid",
                name: "Overlaid",
                glyph: "6",
                factory: PlotStackedMode
            };

        function PlotModeOptions(telemetryObjects) {
            var options = telemetryObjects.length > 1 ?
                    [ OVERLAID, STACKED ] : [ OVERLAID ],
                mode = options[0],
                modeHandler;


            return {
                getModeHandler: function () {
                    if (!modeHandler) {
                        modeHandler = mode.factory(telemetryObjects);
                    }
                    return modeHandler;
                },
                getModeOptions: function () {
                    return options;
                },
                getMode: function () {
                    return mode;
                },
                setMode: function (option) {
                    if (mode !== option) {
                        mode = option;
                        modeHandler = undefined;
                    }
                }
            };
        }

        return PlotModeOptions;
    }
);