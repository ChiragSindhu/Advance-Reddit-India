let loadmoreCOUNT;

document.addEventListener('DOMContentLoaded', function () {
    load_post();
});

async function load_post() {
    var post_ele = document.getElementById("posts");

    var post;
    if(loadmoreCOUNT != null)
        post = await database.collection("GlobalPOST").orderBy('timestamp', "desc").startAfter(loadmoreCOUNT).limit(2);
    else
        post = await database.collection("GlobalPOST").orderBy('timestamp', "desc").limit(2);
    post = await post.get();
    loadmoreCOUNT = post.docs[post.docs.length - 1];

    let isMorePost = 0;

    await post.forEach(doc => {
        isMorePost = 1;
        var post_HTML = "";
        var post_data = doc.data();
        
        post_HTML += "<div id=\"post_object\" name=\"" + post_data.timestamp.seconds * 1000 + "\">";
        post_HTML += "<div id=\"post_object_title1\" name=\""+post_data.Username+"\" onclick=\"search_user2(this)\">@" + post_data.Username + "<sub>~said " + getTimeDifference(post_data.timestamp) + "</sub></div>";
        post_HTML += "<div align=\"CENTER\" id=\"post_object_img\"><img src=\"" + post_data.img_url;
        post_HTML += "\" width=50% height=50%></div>";
        post_HTML += "<span style=\"font-size:12px;user-select:text;margin:2px 0px 0px 5px;\">" + post_data.text + "</span>";
        
        var isAlreadyLiked = false;
        var isAlreadyDisliked = false;
        var likedUserCount = Object.keys(post_data.likesData).length;
        
        for (let i = 0; i < likedUserCount; i++) {
            //console.log(Object.keys(post_data.likesData)[i]);
            if (Object.keys(post_data.likesData)[i] == getUsername()) {
                if (post_data.likesData[Object.keys(post_data.likesData)[i]] == "like")
                    isAlreadyLiked = true;
                else if (post_data.likesData[Object.keys(post_data.likesData)[i]] == "dislike")
                    isAlreadyDisliked = true;
                else
                    console.log("Some Internal Error Occured!!");
                i = likedUserCount;
            } 
        }

        //console.log("like : " + isAlreadyLiked + " ; dislike : " + isAlreadyDisliked);

        if (isAlreadyLiked) {
            post_HTML += "<br><input id=\"post_object_likes\" style=\"background-color:rgb(225, 48, 108);\" name=\"" + post_data.Username + new Date(post_data.timestamp.seconds * 1000) + "\"type=\"button\" onclick=\"likeClicked(this);\" value=\"&#10084 " + post_data.likes;
        } else {
            post_HTML += "<br><input id=\"post_object_likes\" name=\"" + post_data.Username + new Date(post_data.timestamp.seconds * 1000) + "\"type=\"button\" onclick=\"likeClicked(this);\" value=\" " + post_data.likes;
        }

        if(post_data.likes > 1)
            post_HTML += " Likes\">";
        else
            post_HTML += " Like\">";
        
        if(isAlreadyDisliked)
            post_HTML += "<input id=\"post_object_dislikes\" style=\"background-color:rgb(131, 58, 180);\" name=\"" + post_data.Username + new Date(post_data.timestamp.seconds * 1000) + "\" type=\"button\" onclick=\"dislikeClicked(this);\" value=\"🖕 " + post_data.dislikes;
        else
            post_HTML += "<input id=\"post_object_dislikes\" name=\"" + post_data.Username + new Date(post_data.timestamp.seconds * 1000) + "\" type=\"button\" onclick=\"dislikeClicked(this);\" value=\" " + post_data.dislikes;
        
        if(post_data.dislikes > 1)
            post_HTML += " Dislikes\">";
        else
            post_HTML += " Dislike\">";

        post_ele.innerHTML += post_HTML;
    });

    if(isMorePost == 1)
        post_ele.innerHTML += "<CENTER><input id=\"load_post\" type=\"button\" value=\"Load More Posts\" onclick=\"LoadMorePost(this)\"></CENTER>";
    else
        post_ele.innerHTML += "<div id=\"noContent\">No More Post Found! You can create more post.</div>";
}

function getTimeDifference(postTime) {
    //console.log(postTime);
    postTime = new Date(postTime.seconds * 1000);
    currTime = new Date();

    var diff = Math.abs(currTime - postTime) / 1000;
    var dayDiff = Math.floor(diff / 86400);
    var hourDiff = Math.floor(diff / 3600) % 24;
    var minDiff = Math.floor(diff / 60) % 60;
 
    var yearDiff = currTime.getFullYear() - postTime.getFullYear();
    //console.log("Year : " + yearDiff);
    if (yearDiff == 0) {
        //console.log("Month : post : " + postTime);
        var monthDiff = currTime.getMonth() - postTime.getMonth();
        //console.log("Month : " + monthDiff);
        if (monthDiff == 0) {
            //console.log("Day : " + dayDiff);
            if (dayDiff == 0) {
                //console.log("Hour : " + hourDiff);
                if (hourDiff == 0) {
                    //console.log("Min : " + minDiff);
                    if (minDiff == 0) {
                        return "just now..";
                    } else {
                        return minDiff + " mintues ago";
                    }
                } else {
                    return hourDiff + " hours ago";
                }
            } else {
                return dayDiff + " days ago";
            }
        } else {
            return monthDiff + " months ago";
        }
    } else {
        return yearDiff + " years ago";
    }
}

async function LoadMorePost(element) {
    element.remove();

    let img = document.createElement("img");
    img.src = "/image/icons/loadingBLACK.jpg";
    img.setAttribute("width", "25px");
    img.setAttribute("height", "25px");
    img.id = "loading_icon";
    img.style.marginLeft = "34%";
    document.body.appendChild(img);
    
    await load_post();

    img.remove();
    
}