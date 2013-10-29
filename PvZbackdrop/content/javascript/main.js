window.PVZ = window.PVZ || {};

(function (exports) {







}(window.PVZ));

window.onload = (function (exports) {

    //@private
    var elements = {
        stage: null,
        backdrop: null,
        logo: null,
        solarHolder: null,
        sunshine: []
    };

    var callbacks = {
        resizeStage: function () {
            var height = window.innerHeight,
                width = Math.floor(height * 1.33333);
            elements.stage.style.height = height + "px";
            elements.stage.style.width = width + "px";
        }
    };

    var methods = {

        spawnSunshine: function (sunCount) {
            for (var i = 0; i < sunCount; i++) {
                var sunEl = document.createElement("img");
                sunEl.src = "/content/images/sunshine.png";
                sunEl.className = "sunshine";
                sunEl.style.left = (i * 10 * 2 + 10) + "%";
                elements.solarHolder.appendChild(sunEl);
                elements.sunshine.push(sunEl);
            }
        },

        startSunAnimation: function (chosenSunEl, sequenceNumber) {

            var baseDelay = sequenceNumber * 15000 + 15000,
                targetHeight = (sequenceNumber % 2 ? 310 : 490) + "px",
                targetTransform = "translateY(" + targetHeight + ") rotateZ(2turn)";

            chosenSunEl.style.webkitTransitionDuration = "0s";
            chosenSunEl.style.webkitTransform = "";
            chosenSunEl.style.display = "block";
            chosenSunEl.style.opacity = "1.0";
            
            // descend while rotating
            setTimeout(function () {
                chosenSunEl.style.webkitTransitionDuration = "10s";
                chosenSunEl.style.webkitTransform = targetTransform;
            }, baseDelay);

            // fade out
            setTimeout(function () {
                chosenSunEl.style.opacity = 0.0;
            }, baseDelay + (10 * 1000));

            // schedule next
            setTimeout(function () {
                methods.startSunAnimation(chosenSunEl, sequenceNumber);
            }, baseDelay + (50* 1000));

        }
    };

    //@public (exposed for debugging)
    exports.Elements = elements;

    //@public startup
    return function () {

        elements.stage = document.getElementById("stage");
        elements.backdrop = document.getElementById("backdrop");
        elements.solarHolder = document.getElementById("solarHolder");
        elements.logo = document.getElementById("logo");

        // pan the background
        setTimeout(function () {
            elements.backdrop.className = "right";
        }, 1500);
        setTimeout(function () {
            elements.backdrop.className = "center";
        }, 10100);

        // feature the logo
        setTimeout(function () {
            elements.logo.className = "visible";
        }, 8000);
        setTimeout(function () {
            elements.logo.className = "finished";
        }, 18000);

        // shine the sun
        methods.spawnSunshine(5);
        for (var s = 0; s < elements.sunshine.length; s++) {
            methods.startSunAnimation(elements.sunshine[s], s);
        }

        // size the stage to 4:3
        callbacks.resizeStage(); // initial size
        window.addEventListener("resize", callbacks.resizeStage, false);
    };

}(window.PVZ));