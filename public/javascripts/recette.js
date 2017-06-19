
var config = {
            apiKey: "AIzaSyBsfwHz82n_ZM15OZPoWNpoFg73uUsHIHg",
            authDomain: "modelic-7b810.firebaseapp.com",
            databaseURL: "https://modelic-7b810.firebaseio.com",
            projectId: "modelic-7b810",
            storageBucket: "modelic-7b810.appspot.com",
            messagingSenderId: "737888261565"
        };
        firebase.initializeApp(config);
        var uploader=document.getElementById('uploader0'),
            fileButton=document.getElementById('fileButton0'),
            uploader1=document.getElementById('uploader1'),
            fileButton1=document.getElementById('fileButton1');
        fileButton.addEventListener('change', function(e) {
            var file=e.target.files[0];
            var storageRef=firebase.storage().ref("'/fileLocation/'"+file.name);
            console.log(fileLocation);
            var task=storageRef.put(file);
            task.on('state_changed',
                function progress(snapshot){
                    var percentage=( snapshot.bytesTransferred / snapshot.totalBytes )*100;
                    uploader.value=percentage;
                    console.log(snapshot.toString());
                    if (percentage==100){
                        alert("file uploaded Successfully");
                    }
                },
                function error(err){
                },
                function complete(){
                    var downloadURL = task.snapshot.downloadURL;
                    console.log(downloadURL);
                    url0 = downloadURL;
                }
            );
        });