function typing_search() {
    var search_txt = document.getElementById('search_field').value;
    if (search_txt.length > 0) {
        show_search_result();
        document.getElementById("search_result").innerHTML = "<img id=\"search_loading_icon\" src=\"/image/icons/loadingBLACK.jpg\" width=\"18px\" height=\"18px\">";
        setTimeout(() => {
            //console.log(search_txt + " : " + document.getElementById('search_field').value);
            if (search_txt == document.getElementById('search_field').value) {
                update_search_result(search_txt);
            }
        }, 1000);
    } else {
        hide_search_result();
        document.getElementById("search_result").innerText = "";
    }
}

async function update_search_result(txt) {
    var search_element = document.getElementById("search_result");

    var result = await database.collection('UserData');
    result = await result.orderBy('Profile.Username').startAt(txt).endAt(txt + '~');
    result = await result.get();

    search_element.innerHTML = "";

    await result.forEach((doc) => {
        var element_id = "searchid=" + doc.data().Profile.Username;
        var srch_ele_HTML = "<div id=\"" + element_id + "\"";
        srch_ele_HTML += " onmouseover=\"srid_chng_css1(this);\" onmouseout=\"srid_chng_css2(this);\" onmousedown=\"srch_ele_clicked(this);\">"
        srch_ele_HTML += doc.data().Profile.Username + "</div>";
        
        console.log(doc.data().Profile.Username);
        search_element.innerHTML += srch_ele_HTML;
        document.getElementById(element_id).style = "color:rgb(100,100,100);font-family:'Hind',cursive;font-size:12px;padding:5px;margin:5px 0px 5px 0px;background-color:rgb(250,250,250);cursor:pointer;";
    });

    if (search_element.innerHTML.length == 0) {
        search_element.innerHTML = "<div id=\"search_resultNF\">Username not found! :(</div>"    
    }

    console.log("////Done////");
}

function search_user() {
    console.log("Searched for " + document.getElementById('search_field').value);
    window.open("http://localhost:3000/viewprofile?username=" + document.getElementById('search_field').value, "_black").focus();
}

function search_user2(username) {
    //console.log(username.attributes[1]);
    if (username.attributes[1].value.length != 0) username = username.attributes[1].value;

    console.log("Searched for " + username);
    window.open("http://localhost:3000/viewprofile?username=" + username, "_black").focus();
}

function si_anim1() {
    document.getElementById('search_icon').style.animation = "slide_right 0.5s 1";
    document.getElementById('search_icon').style.animationFillMode = "forwards";

    if (document.getElementById("search_result").innerText.length > 0) {
        show_search_result();
    }
}

function si_anim2() {
    document.getElementById('search_icon').style.animation = "slide_left 0.5s 1";
    si_chnge_css2();
    hide_search_result();
}

function si_chnge_css1() {
    var icon_style = document.getElementById('search_icon').style;
    if (icon_style.animationName == "slide_right") {
        icon_style.cursor = "pointer";
        icon_style.backgroundColor = "gray";
    }
}

function si_chnge_css2() {
    var icon_style = document.getElementById('search_icon').style;
    if (icon_style.cursor == "pointer") {
        icon_style.cursor = "auto";
        icon_style.backgroundColor = "rgba(255,255,255,0)";
    }
}

function srid_chng_css1(id) {
    id.style.backgroundColor = "rgb(220,220,220)";
    id.style.fontWeight = "800";
}

function srid_chng_css2(id) {
    id.style.backgroundColor = "rgb(250,250,250)";
    id.style.fontWeight = "200";
}

function srch_ele_clicked(id) {
    document.getElementById("search_field").value = id.innerText;
    search_user();
}

function hide_search_result() {
    document.getElementById("search_result").style.display = "none";
}

function show_search_result() {
    document.getElementById("search_result").style.display = "block";
}