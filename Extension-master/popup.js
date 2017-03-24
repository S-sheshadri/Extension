var notifier,
    dialog;

function showNotify() {
    var notify;

    if (window.webkitNotifications.checkPermission() == 0) {
        notify = window.webkitNotifications.createNotification(
            "",
            'Notification Test',
            'This is a test of the Chrome Notification System. This is only a test.'
        );
        notify.show();
    } else {
        window.webkitNotifications.requestPermission();
    }
}    
function showDialog(){
    myWindow=chrome.windows.create({
        url: 'popup2.html',
        width: 800,
        height: 620,
        type: 'popup',
        top:15,
        left:50
    });
 }    
function init() {
    clicker = document.querySelector('#but1');

    clicker.addEventListener('click', showDialog, false);
}    
document.addEventListener('DOMContentLoaded', init);