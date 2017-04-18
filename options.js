var getAccess  = document.getElementById('getAccess');


    getAccess.onclick = function () {
        navigator.getUserMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;

        var mediaConstraints = {
            audio: true
        };
        navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);

        function onMediaSuccess(stream) {
            console.log('Great! Now we can record your voice :D');
            getAccess.disabled = 'disabled';
            localStorage.setItem("getAccess", true);
        }

        function onMediaError(e) {
            console.error('media error', e);
        }}