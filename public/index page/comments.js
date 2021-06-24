async function add_comment(element) {
    console.log(element.parentElement.children[0]);
    const comment = element.parentElement.children[0].value;
    //comment validataion
    const username = getUsername();
    //console.log(element.parentElement.parentElement.attributes[1].value);
    const unique = element.parentElement.parentElement.attributes[1].value;

    await database.collection("GlobalPOST").doc(unique).set({
        comments: {
            [username]: comment
        }
    }, { merge: true }).then(() => {
        console.log("Document successfully updated!");
    }).catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });

    show_all_comments(unique, element.parentElement.parentElement.children[1]);
    element.parentElement.children[0].value = "";
}

function add_commentONLOAD(element) {
    console.log("Hello");
    const unique = element.parentElement.parentElement.attributes[1].value
    show_all_comments(unique, element.parentElement.parentElement.children[1]);
    element.remove();
}

function show_all_comments(unique,element) {
    database.collection("GlobalPOST").doc(unique).get().then((doc) => {
        if (doc.exists) {
            const commentArr = doc.data().comments;
            const usernameArr = Object.keys(commentArr);
            console.log(commentArr);
            element.innerHTML = "";
            let haveComment = 0;
            for (let i = 0; i < usernameArr.length; i++) {
                haveComment = 1;
                show_comment(element,usernameArr[i],commentArr[usernameArr[i]]);
            }

            if (haveComment == 0) {
                show_comment(element,"No comments here!","its okay :)");
            }
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
}

function show_comment(com_Sec,username,comment) {
    let HTML = "";

    HTML += "<div id=\"comment_part\">";
    HTML += "<div id=\"acomm\">";
    if (username == "No comments here!") 
        HTML += "<div id=\"acommtitle\">" + username + "</div>";
    else
        HTML += "<div id=\"acommtitle\" onclick=\"search_user3(this)\">" + username + "</div>";
    HTML += "<div id=\"acommtext\">" + comment + "</div>";
    HTML += "</div>";
    HTML += "</div>";

    //console.log(com_Sec);

    com_Sec.innerHTML += HTML;
}