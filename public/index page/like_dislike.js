async function likeClicked(element) {
    var postTimestamp = parseInt(element.parentElement.attributes.name.value);
    var likeValueArr = element.value.split(' ');
    var newlike = parseInt(likeValueArr[likeValueArr.length - 2]) + 1;
    var Username = getUsername();

    var data = await database.collection('GlobalPOST').where('timestamp', '>=', new Date(postTimestamp)).get();
    await data.forEach(doc => {
        var postData = doc.data();

        if (postData.timestamp.seconds == postTimestamp / 1000) {
            //console.log(postData);
            var likedUserCount = Object.keys(postData.likesData).length;
            
            if (likedUserCount == 0) {
                //console.log("FIRST");
                liked(element,Username,newlike);
                return;
            }

            for (let i = 0; i < likedUserCount; i++) {
                //console.log(Object.keys(postData.likesData)[i] +"=="+ Username);
                if (Object.keys(postData.likesData)[i] == Username) {
                    //console.log("IN");
                    if (postData.likesData[Object.keys(postData.likesData)[i]] == 'like') {
                        console.log("Already liked");
                        Alreadyliked(element, Username, newlike - 1);
                        return;
                    } else if (postData.likesData[Object.keys(postData.likesData)[i]] == 'dislike') {
                        console.log("Already disliked making liked");
                        var id = -1;
                        for (let i = 0; i < element.parentElement.children.length; i++) {
                            if (element.parentElement.children.item(i).id == "post_object_dislikes") {
                                id = i;
                            }
                        }

                        if (id == -1) console.log("Something went wrong!");
                        Alreadydisliked(element.parentElement.children.item(5), Username, postData.dislikes);
                        //console.log("MIDDLE");
                        liked(element, Username, newlike);
                        return;
                    } else {
                        console.log("Some Internal Error");
                    }
                } else {
                    if (i + 1 == likedUserCount) {
                        //console.log("LAST");
                        liked(element, Username, newlike);
                        return;
                    }
                }
            }
        }
    });
}

async function dislikeClicked(element) {
    var postTimestamp = parseInt(element.parentElement.attributes.name.value);
    var likeValueArr = element.value.split(' ');
    var newDislike = parseInt(likeValueArr[likeValueArr.length - 2]) + 1;
    var Username = getUsername();

    var data = await database.collection('GlobalPOST').where('timestamp', '>=', new Date(postTimestamp)).get();
    await data.forEach(doc => {
        var postData = doc.data();

        if (postData.timestamp.seconds == postTimestamp / 1000) {
            //console.log(postData);
            var likedUserCount = Object.keys(postData.likesData).length;
            
            if (likedUserCount == 0) {
                disliked(element,Username,newDislike);
                return;
            }

            for (let i = 0; i < likedUserCount; i++) {
                if (Object.keys(postData.likesData)[i] == Username) {
                    if (postData.likesData[Object.keys(postData.likesData)[i]] == 'dislike') {
                        console.log("Already Disliked");
                        Alreadydisliked(element, Username, newDislike - 1);
                        return;
                    } else if (postData.likesData[Object.keys(postData.likesData)[i]] == 'like') {
                        console.log("Already liked making disliked");

                        var id = -1;
                        for (let i = 0; i < element.parentElement.children.length; i++) {
                            if (element.parentElement.children.item(i).id == "post_object_likes") {
                                id = i;
                            }
                        }

                        if (id == -1) console.log("Something went wrong!");
                        Alreadyliked(element.parentElement.children.item(id), Username, postData.likes);

                        disliked(element, Username, newDislike);
                        return;
                    } else {
                        console.log("Some Internal Error");
                    }
                } else {
                    if (i + 1 == likedUserCount) {
                        //console.log("LAST");
                        disliked(element,Username,newDislike);;
                        return;
                    }
                }
            }
        }
    });   
}

async function liked(element, Username, newlike) {
    //console.log("in liked");
    await database.collection('GlobalPOST').doc(element.name).set({
        likesData: {
            [Username]: 'like'
        }
    }, { merge: true });
    
    await database.collection('GlobalPOST').doc(element.name).update({
        likes: newlike
    });

    if(newlike > 1)
        element.value = "❤ " + newlike + " Likes";
    else
        element.value = "❤ " + newlike + " Like";
    element.style.backgroundColor = "rgb(225, 48, 108)";
}

async function Alreadyliked(element, Username, newlike) {
    //console.log("in Already liked");
    await database.collection('GlobalPOST').doc(element.name).update({
        ["likesData." + [Username]] :firebase.firestore.FieldValue.delete()
    });

    await database.collection('GlobalPOST').doc(element.name).update({
        likes: newlike - 1
    });

    if((newlike -  1) > 1)
        element.value = (newlike -  1) + " Likes";
    else
        element.value = (newlike -  1) + " Like";
    element.style.backgroundColor = "rgb(189, 189, 189)";
}

async function disliked(element, Username, newDislike) {
    await database.collection('GlobalPOST').doc(element.name).set({
        likesData: {
            [Username]: 'dislike'
        }
    }, { merge: true });
    
    await database.collection('GlobalPOST').doc(element.name).update({
        dislikes: newDislike
    });

    if(newDislike > 1)
        element.value = "🖕 " + newDislike + " Dislikes";
    else
        element.value = "🖕 " + newDislike + " Dislike";
    element.style.backgroundColor = "rgb(131, 58, 180)";
}

async function Alreadydisliked(element, Username, newDislike) {
    await database.collection('GlobalPOST').doc(element.name).update({
        ["likesData." + [Username]] :firebase.firestore.FieldValue.delete()
    });

    await database.collection('GlobalPOST').doc(element.name).update({
        dislikes: newDislike - 1
    });

    if((newDislike -  1) > 1)
        element.value = (newDislike -  1) + " Dislikes";
    else
        element.value = (newDislike -  1) + " Dislike";
    element.style.backgroundColor = "rgb(189, 189, 189)";
}