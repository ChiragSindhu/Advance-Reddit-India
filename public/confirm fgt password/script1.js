document.addEventListener('DOMContentLoaded', () => {
    var address = window.location.search.split('=');
    document.getElementById("email_name").innerText = address[1];
});

/*Can chnage */
function back() {
    window.location.replace("http://localhost:3000/passforget");
}
