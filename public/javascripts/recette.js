$(document)
    .ready(
    function(e) {

        var url0;
        var ok = '1';
        var nok = '0';
        var idToUpdate;
        var userPhoto = 'https://lh4.googleusercontent.com/-CAh1em4rHtY/AAAAAAAAAAI/AAAAAAAAABo/tBCr1kRuvLA/s96-c/photo.jpg';
        var username = 'Modelic';
        var idsender = 'fVJGwG3B8VR0Jj8PaOM6gFGs2kC3';
        var config = {
            apiKey: "AIzaSyBsfwHz82n_ZM15OZPoWNpoFg73uUsHIHg",
            authDomain: "modelic-7b810.firebaseapp.com",
            databaseURL: "https://modelic-7b810.firebaseio.com",
            projectId: "modelic-7b810",
            storageBucket: "modelic-7b810.appspot.com",
            messagingSenderId: "737888261565"
        };
        firebase.initializeApp(config);
            var commentsRef = firebase.database().ref('commentaires/'+"test");
            var topUserInfos = firebase.database().ref('messages/'+idsender);
            var uploader=document.getElementById('uploader0'),
                uploader1=document.getElementById('uploader1'),
                fileButton0=document.getElementById('fileButton0'),
                password=document.getElementById('password-label');

      initPageElements();

        function getRecette() {
            $('#tbodyRecette').html('');
            appRoutes.controllers.RecetteController.getAllRecette().ajax({
                success: function (data) {
                    if (data.result == "ok") {

                        var recette = data.recettes;
                         for (var i in recette) {
                            var html = '';
                            html += '<tr">';
                            html += '<td>' + recette[i].name +  '</td>';
                            html += '<td> <img src="' + recette[i].photo +   '" height="152" width="270"/></td>';
                            html += '<td>' + recette[i].duration+   '</td>';
                            html += '<td>' + recette[i].categoryName+   '</td>';
                            html += '<td>' + recette[i].description+   '</td>';
                            html += '<td>' + recette[i].ingredien+   '</td>';
                            html += '<td>' + recette[i].instruction+   '</td>';


                            html += '</tr>';
                            $('#tbodyRecette').append(html);
                        }
                    } else if (data.result == "nok") {
                        alert(data.message);
                    }

                    $(".imload").fadeOut("1000");
                },
                error: function (xmlHttpReques, chaineRetourne, objetExeption) {
                    if (objetExeption == "Unauthorized") {
                        $(location).attr('href', "/");
                    }
                    $(".imload").fadeOut("1000");
                }
            });
        }

        function getCategorie() {
            $('#tbodyCategorie').html('');
            appRoutes.controllers.RecetteController.getAllCategory().ajax({
                success: function (data) {
                    if (data.result == "ok") {
                        var category = data.categories;
                         for (var i in category) {
                            var html = '';
                            html += '<tr">';
                            html += '<td>' + category[i].categoryName +  '</td>';
                            html += '<td> <img src="' + category[i].categoryPhoto + '" height="152" width="270"/></td>';
                            html += '</tr>';
                            $('#tbodyCategorie').append(html);
                        }
                    } else if (data.result == "nok") {
                        alert(data.message);
                    }

                    $(".imload").fadeOut("1000");
                },
                error: function (xmlHttpReques, chaineRetourne, objetExeption) {
                    if (objetExeption == "Unauthorized") {
                        $(location).attr('href', "/");
                    }
                    $(".imload").fadeOut("1000");
                }
            });
        }

        function initPageElements() {
            $(".imload").fadeOut("1000");
            getRecette();
            getCategorie();
            getAllCategorie();
        }


       function getAllCategorie(){
       appRoutes.controllers.RecetteController.getAllCategory().ajax({
           success: function (data) {
           if (data.result == "ok") {
               var categories = data.categories;
               for (var i in categories) {

                   var html = '';
                   html='<option value="'+categories[i].categoryID+'">'+categories[i].categoryName+'</option>';
                   $('#seladd_categorie').append(html);
               }
               }
           }
       });
       }

        fileButton0.addEventListener('change', function(e) {
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
                    console.log("ERROR");
                },
                function complete(){
                    var downloadURL = task.snapshot.downloadURL;
                    console.log(downloadURL);
                    url0 = downloadURL;
                }
            );
        });

       function verifyBeforeDoCreateRecette(){

            var name = $('#tfadd_name').val();
            var photo = $('#tfadd_photo').val();
            var duration = $('#tfadd_duration').val();
            var categorie = $('#seladd_categorie').val();
            var information = $('#tfadd_description').val();
            var ingredien = $('#tfadd_ingredien').val();
            var instruction = $('#tfadd_preparation').val();

            if(name == ''){
                alert('name obligatoire !!!');
                $('#bt_ajouter_recette').attr("disabled", false);
            }
            else if(photo == ''){
                alert('photo obligatoire !!!');
                $('#bt_ajouter_recette').attr("disabled", false);
            }
            else if(duration == ''){
                alert('duration obligatoire !!!');
                $('#bt_ajouter_recette').attr("disabled", false);
            }
            else if(information == ''){
                 alert('information obligatoire !!!');
                 $('#bt_ajouter_recette').attr("disabled", false);
             }
             else if(ingredien == ''){
                  alert('ingredien obligatoire !!!');
                  $('#bt_ajouter_recette').attr("disabled", false);
              }
              else if(instruction == '0'){
                   alert('instruction obligatoire !!!');
                   $('#bt_ajouter_recette').attr("disabled", false);
               }
            else {
                var data ={
                    'name' : name,
                    'photo' : photo,
                    'duration' : duration,
                    'category' : categorie,
                    'description' : information,
                    'ingredien' : ingredien,
                    'instruction' : instruction
                };
                doCreateRecette(data);

            }
        }

        function doCreateRecette(data){
        $(".imloadAdd").fadeIn("1000");
        appRoutes.controllers.RecetteController.addRecette().ajax({
           data : JSON.stringify(data),
           contentType : 'application/json',
           success : function (json){
           console.log(json);

                if (json.result == "ok") {

                    $('#bt_annuler_add_recette').click();
                    alert(json.message);
                    $('#seladd_categorie option[value="1"]').prop("selected",true);
                    //getRecette();
                    $("#addRecette").modal("hide");

                }
                else{
                    alert(json.message);
                }
                $(".imloadAdd").fadeOut("1000");
                $('#bt_ajouter_recette').attr("disabled", false);
            },
            error: function (xmlHttpReques,chaineRetourne,objetExeption) {
                if(objetExeption == "Unauthorized"){
                    $(location).attr('href',"/");
                }
                $(".imload").fadeOut("1000");
                $('#bt_ajouter_recette').attr("disabled", false);
            }
        });
       }

       $('#bt_ajouter_recette').bind("click",verifyBeforeDoCreateRecette);

       $('#bt_annuler_add_recette').click(function (e) {
               $("#addRecette").modal("hide");
         });


    });
