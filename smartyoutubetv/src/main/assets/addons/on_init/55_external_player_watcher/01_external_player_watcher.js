/**
 * Description:
 * Try to prevent accidental exit from the video when running "suggestions" or "save to favorites"
 */

console.log("Scripts::Running script external_player_watcher.js");

function ExternalPlayerWatcherAddon() {
    this.TAG = 'ExternalPlayerWatcherAddon';

    this.run = function() {
        this.hideKeyboardOnSubmit();
    };

    this.hideKeyboardOnSubmit = function() {
        var $this = this;

        // There is a handler that blocks others. We should run before it.
        // Note: running on capture phase
        EventUtils.addListener(document, DefaultEvents.KEY_UP, function(e) {
            Log.d($this.TAG, "User pressed up " + e.keyCode);

            if (YouTubeUtils.isPlayerOpened() && YouTubeUtils.isExoPlayerOpen()) {
                if (YouTubeUtils.isPlayerControlsClosed() && !YouTubeUtils.isOverlayOpened()) {
                    if (e.keyCode == DefaultKeys.ESC) {
                        Log.d($this.TAG, "Blocking BACK while user using suggestions or favorites...");

                        e.stopPropagation();
                    }
                }
            }
        }, true);

        // There is a handler that blocks others. We should run before it.
        // Note: running on capture phase
        EventUtils.addListener(document, DefaultEvents.KEY_DOWN, function(e) {
            Log.d($this.TAG, "User pressed down " + e.keyCode);

            if (YouTubeUtils.isPlayerOpened() && YouTubeUtils.isExoPlayerOpen()) {
                if (YouTubeUtils.isPlayerControlsClosed() && !YouTubeUtils.isOverlayOpened()) {
                    if (e.keyCode == DefaultKeys.ESC) {
                        Log.d($this.TAG, "Blocking BACK while user using suggestions or favorites...");

                        e.stopPropagation();
                    }
                }
            }
        }, true);
    };
}

if (DeviceUtils.isExo()) {
    new ExternalPlayerWatcherAddon().run();
}
