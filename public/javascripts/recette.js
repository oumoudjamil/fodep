$(document)
    .ready(
    function(e) {

        var url0;
        var url1;
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

            var uploader1=document.getElementById('uploaderCategorie'),
                fileButtonCategorie=document.getElementById('fileButtonCategorie'),
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
                            html += '<td>' + recette[i].duration+   'min</td>';
                            html += '<td>' + recette[i].categoryName+   '</td>';
                            html += '<td>' + recette[i].description+   '</td>';
                            html += '<td>' + recette[i].ingredien+   '</td>';
                            html += '<td>' + recette[i].instruction+   '</td>';
                            html += '<td><button type="button" class="btn btn-danger btn-icon btn-xs line_button" data-toggle="modal" data-target="#updateRecette" id="line_action-'+recette[i].id+'"> Action <i class="fa fa-fire"></i> </button></td>';
                            html += '<td><button type="button" class="btn btn-black btn-xs line_supp" id="line_supp-'+recette[i].id+'"><i class="fa fa-trash"></i> </button></td>';

                            html += '</tr>';
                            $('#tbodyRecette').append(html);
                        }



                        $(".line_supp")
                            .click(
                            function() {
                            var id = $(this).attr('id');
                            var sp = id.split('-');
                            console.log(sp);

                            var reponse = window.confirm("Souhaitez-vous vraiment supprimer cette recette ?");
                                if(reponse)
                                {
                                    deleterecette(sp[1]);
                                }
                          });

                        $(".line_button")
                            .click(
                            function() {
                            var id = $(this).attr('id');
                            var sp1 = id.split('-');
                            console.log("id---",sp1[1])
                            showRecette(sp1[1]);
                            $('#id_selected_recette').val(sp1[1]);
                        });



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
                            html += '<td><button type="button" class="btn btn-black btn-xs line_suppc" id="line_suppc-'+category[i].id+'"><i class="fa fa-trash"></i> </button></td>';
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

        function deleterecette(id) {
        $(".imloadDialog").fadeIn("1000");
        appRoutes.controllers.RecetteController.delRecette(id).ajax({
            success : function (data) {
                if(data.result == "ok"){
                    $(".imloadDialog").fadeIn("1000");
                    $('#btnClose').click();
                    alert(data.message);
                    getRecette();
                }else {
                    $(".imloadDialog").fadeIn("1000");
                    $('#btnClose').click();
                    alert(data.message);
                }
            },
            error: function (xmlHttpReques,chaineRetourne,objetExeption) {
                if(objetExeption == "Unauthorized"){
                    $(location).attr('href',"/");
                }
                $(".imloadDialog").fadeIn("1000");
                $('#btnClose').click();
                alert(data.message);
            }
        });
        $(".imloadDialog").fadeIn("1000");
        $('#btnConfirm').attr("disabled", false);
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
                   $('#selupdate_categorie').append(html);
               }
               }
           }
       });
       }

        fileButton0.addEventListener('change', function(e) {
            var file=e.target.files[0];
            var storageRef=firebase.storage().ref("'/fileLocation/'"+file.name);
            console.log("fileLocation ", fileLocation);
            var task=storageRef.put(file);
            task.on('state_changed',
                function progress(snapshot){
                    var percentage=( snapshot.bytesTransferred / snapshot.totalBytes )*100;
                    uploader1.value=percentage;
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
                    console.log("url0 ",downloadURL);
                    url0 = downloadURL;
                }
            );
        });

            fileButtonCategorie.addEventListener('change', function(e) {
                var file=e.target.files[0];
                var storageRef=firebase.storage().ref("'/fileLocation/'"+file.name);
                console.log("fileLocation ", fileLocation);
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
                        console.log("url1 ",downloadURL);
                        url1 = downloadURL;
                    }
                );
            });

       function verifyBeforeDoCreateRecette(){

            var name = $('#tfadd_name').val();
            var photo = url0;
            var duration = $('#tfadd_duration').val();
            var categorie = $('#seladd_categorie').val();
            var information = $('#tfadd_description').val();
            var ingredien = $('#tfadd_ingredien').val();
            var instruction = $('#tfadd_preparation').val();

            if(name == ''){
                alert('name obligatoire !!!');
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
                    getRecette();

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


    function showRecette(id) {
      $(".imload").fadeIn("1000");
            appRoutes.controllers.RecetteController.getRecettebyId(id).ajax({
                success: function (data) {
                console.log("data--",data)
                    if (data.result == "ok"){
                        var recette = data.recettesbyid;

                        for (var i in recette) {
                            var html = '';
                            html += '<tr id="' + recette[i].id + '">';
                            $('#tfupdate_name').val(recette[i].name);
                            $('#urlTitre').val(recette[i].photo);
                            $('#tfupdate_duration').val(recette[i].duration);
                            $('#selupdate_categorie option[value="'+recette[i].categoryName+'"]').prop("selected",true);
                            $('#tfupdate_description').val(recette[i].description);
                            $('#tfupdate_ingredien').val(recette[i].ingredien);
                            $('#tfupdate_preparation').val(recette[i].instruction);

                            html += '</tr>';
                            $('#tbodyRecetteUp').append(html);

                        }
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

    function verifyBeforeUpdate(id){

         $('#bt_modifier_recette').attr("disabled", true);
         var name = $('#tfupdate_name').val();
         var photo = $('#urlTitre').val();
         var duration = $('#tfupdate_duration').val();
         var categoryName = $('#selupdate_categorie').val();
         var description = $('#tfupdate_description').val();
         var ingredien = $('#tfupdate_ingredien').val();
         var instruction = $('#tfupdate_preparation').val();

         if(name == ''){
             alert('nom obligatoire !!!');
             $('#bt_modifier_recette').attr("disabled", false);
         }
         else if(photo == ''){
             alert('photo obligatoire !!!');
             $('#bt_modifier_recette').attr("disabled", false);
         }
         else if(duration == ''){
             alert('duration obligatoire !!!');
             $('#bt_modifier_recette').attr("disabled", false);
         }
         else if(categoryName == ''){
              alert('categorie obligatoire !!!');
              $('#bt_modifier_recette').attr("disabled", false);
          }
          else if(description == ''){
               alert('description obligatoire !!!');
               $('#bt_modifier_recette').attr("disabled", false);
           }
           else if(ingredien == ''){
                alert('ingredien obligatoire !!!');
                $('#bt_modifier_recette').attr("disabled", false);
            }
            else if(instruction == ''){
                alert('instruction obligatoire !!!');
                $('#bt_modifier_recette').attr("disabled", false);
            }
         else {
             var data ={
                 'name' : name,
                 'photo' : photo,
                 'duration' : duration,
                 'categoryName' : categoryName,
                 'description' : description,
                 'ingredien' : ingredien,
                 'instruction' : instruction
             };
             console.log(" selected user id = "+id);
             updateRecette(id,name,photo,duration,categoryName,description,ingredien,instruction);

         }
     }

     function updateRecette(id,name,photo,duration,categoryName,description,ingredien,instruction){
     $(".imloadAdd").fadeIn("1000");
     appRoutes.controllers.RecetteController.updateRecette(id,name,photo,duration,categoryName,description,ingredien,instruction).ajax({
         success : function (json) {

             if (json.result == "ok") {
                 alert(json.message);
                 getRecette();
                 $("#updateRecette").modal("hide");
             }
             else{
                 alert(json.message);
                 $('#bt_modifier_recette').attr("disabled", false);
             }
             $(".imloadAdd").fadeOut("1000");
         },
         error: function (xmlHttpReques,chaineRetourne,objetExeption) {
             if(objetExeption == "Unauthorized"){
                 $(location).attr('href',"/");
             }
             $(".imload").fadeOut("1000");

         }
     });
    }

    $('#bt_modifier_recette').click(function() {
        verifyBeforeUpdate($('#id_selected_recette').val());
    });

    function verifyBeforeDoCreateCategorie(){

                var name = $('#tfadd_nameC').val();
                var photo = url1;

                if(name == ''){
                    alert('name obligatoire !!!');
                    $('#bt_ajouter_categorie').attr("disabled", false);
                }

                else if(photo == ''){
                    alert('photo obligatoire !!!');
                    $('#bt_ajouter_categorie').attr("disabled", false);
                }

                else {
                    var data ={
                        'name' : name,
                        'photo' : photo,
                    };
                    doCreateCategorie(data);

                }
    }

    function doCreateCategorie(data){
        $(".imloadAdd").fadeIn("1000");
        appRoutes.controllers.RecetteController.addCategorie().ajax({
           data : JSON.stringify(data),
           contentType : 'application/json',
           success : function (json){
           console.log(json);

                if (json.result == "ok") {

                    $('#bt_annuler_add_categorie').click();
                    alert(json.message);
                    $("#addCatogorie").modal("hide");
                    getCategorie();

                }
                else{
                    alert(json.message);
                }
                $(".imloadAdd").fadeOut("1000");
                $('#bt_ajouter_categorie').attr("disabled", false);
            },
            error: function (xmlHttpReques,chaineRetourne,objetExeption) {
                if(objetExeption == "Unauthorized"){
                    $(location).attr('href',"/");
                }
                $(".imload").fadeOut("1000");
                $('#bt_ajouter_categorie').attr("disabled", false);
            }
        });
       }

     $('#bt_ajouter_categorie').bind("click",verifyBeforeDoCreateCategorie);

     $('#bt_annuler_add_categorie').click(function (e) {
               $("#addCatogorie").modal("hide");
     });

    });
