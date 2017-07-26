$(document)
    .ready(
    function(e) {

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
