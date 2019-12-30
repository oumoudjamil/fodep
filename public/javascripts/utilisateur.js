$(document)
    .ready(
    function (e) {

        loadingTask();

        function loadingTask() {
            $(".imloadDialog").fadeOut("1000");
        }
          getUsers();
          function getUsers(page) {
           $(".imload").fadeIn("1000");
           $('#pagingTop').html('');
           $('#pagingBottom').html('');
           $('#divPaginationhaut').empty();
           $('#divPaginationhaut').removeData("twbs-pagination");
           $('#divPaginationhaut').unbind("page");
           $('#divPagination').empty();
           $('#divPagination').removeData("twbs-pagination");
           $('#divPagination').unbind("page");
            $('#tbodyUsers').html('');
            jsRoutes.controllers.UtilisateurController.getAll(page).ajax({
                success: function (data) {
                    if (data.result == "ok") {
                         console.log(data)
                        var users = data.users;
                        var numLine = (data.per_page * data.current_page) - data.per_page;
                        if (data.current_page == -1){numLine = 0}
                         for (var i in users) {
                            var html = '';
                            numLine += 1;
                            html += '<tr">';
                            html += '<td>' + numLine + '</td>';
                            html += '<td>' + users[i].nom +  '</td>';
                            html += '<td>' + users[i].prenom+ '</td>';
                            html += '<td>' + users[i].role+ '</td>';
                            html += '<td><button type="button" class="btn btn-danger btn-icon btn-xs line_button" data-toggle="modal" data-target="#updateUser" id="line_action-'+users[i].id+'"> Modifier <i class="fa fa-fire"></i> </button></td>';
                            if (users[i].statut == "1") {
                               html += '<td><button  class="btn btn-danger btn-xs retirer btn-icon icon-right" id="btbloque-' + users[i].id +'"  > Bloquer<i class="fa fa-toggle-on"></i></button></td>'
                            } else {
                                html += '<td><button  class="btn btn-success btn-xs valider btn-icon icon-right" id="btbloque-' + users[i].id +'"  > Debloquer <i class="fa fa-toggle-off"></i></button></td>'
                            }
                            html += '<td><button type="button" class="btn btn-black btn-xs line_supp" id="line_supp-'+users[i].id+'"><i class="fa fa-trash"></i> </button></td>';
                            html += '</tr>';
                            $('#tbodyUsers').append(html);
                        }

                            var current_page = data.current_page;
                            if(current_page == -1){current_page = 1}
                            $('#pagingTop').append(current_page + '/' + data.total_page + ' ' + labelPaging);
                            $('#pagingBottom').append(current_page + '/' + data.total_page + ' ' + labelPaging);
                            $('#divPaginationhaut').twbsPagination({
                                totalPages: data.total_page,
                                visiblePages: 3,
                                startPage: page,
                                onPageClick: function (event, numPage) {
                                    page = numPage;
                                    getUsers(page);
                                }
                            });
                            $('#divPagination').twbsPagination({
                                totalPages: data.total_page,
                                visiblePages: 3,
                                startPage: page,
                                onPageClick: function (event, numPage2) {
                                    page = numPage2;
                                    getUsers(page);
                                }
                            });
                        $(".line_supp")
                            .click(
                            function() {
                            var id = $(this).attr('id');
                            var sp = id.split('-');
                            console.log(sp);

                            var reponse = window.confirm("Souhaitez-vous vraiment supprimer cet utilisateur ?");
                                if(reponse)
                                {
                                   deleteUser(sp[1]);
                                }
                          });

                        $(".line_button")
                            .click(
                            function() {
                            var id = $(this).attr('id');
                            var sp1 = id.split('-');
                            console.log("id---",sp1[1])
                            showUser(sp1[1]);
                            $('#id_selected_user').val(sp1[1]);
                        });

                        $(".retirer").click(function(){
                               var id = $(this).attr('id');
                               var sp = id.split('-');
                               bloquerUser(sp[1]);
                         });


                         $(".valider").click(function(){
                              var idd = $(this).attr('id');
                              var spp = idd.split('-');
                               debloquerUser(spp[1]);
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
        function debloquerUser(id){
            changeUserStatut(id,"1");
        }

        function bloquerUser(id){
            changeUserStatut(id,"0");
        }

        function changeUserStatut(id, statut) {
                    $(".imload").fadeIn("1000");

                    jsRoutes.controllers.UtilisateurController.updateStatut(id,statut).ajax({
                                 success : function (json) {
                       if (json.result == "ok") {
                       alert(json.message);
                       getUsers();
                        } else {
                            alert(json.message);
                        }
                    $(".imload").fadeOut("1000");
                    }
                    });
                }

        $('#createUtilisateur').click(function (e) {
            verifyBeforeDoCreate();
        });
        function verifyBeforeDoCreate(){
            $('#createUtilisateur').attr("disabled", true);
            var prenom = $('#prenom').val();
            var nom = $('#nom').val();
            var login = $('#login').val();
            var role = $('#libelleRole').val();

            if(prenom == ''){
                doShowErrorAdd(labelVerifyTel);
                $('#createUtilisateur').attr("disabled", false);
            }
            else {
                var data ={
                    'prenom' : prenom,
                    'nom' : nom,
                    'login' : login,
                    'role' : role
                };
                doCreateUtilisateur(data);
            }
        }
        function doCreateUtilisateur(data){
                    $(".imloadAdd").fadeIn("1000");
                    jsRoutes.controllers.UtilisateurController.addUtilisateur().ajax({
                        data : JSON.stringify(data),
                        contentType : 'application/json',
                        success : function (json) {
                        console.log(json);
                            if (json.result == "ok") {
                                $('#closeModalAddUtilisateur').click();
                                doShowSuccess(json.message);
                                 getUsers();
                            }
                            else{
                                doShowErrorAdd(json.message);
                            }
                            $(".imloadAdd").fadeOut("1000");
                            $('#createUtilisateur').attr("disabled", false);
                        },
                        error: function (xmlHttpReques,chaineRetourne,objetExeption) {
                            if(objetExeption == "Unauthorized"){
                                $(location).attr('href',"/");
                            }
                            $(".imload").fadeOut("1000");
                            $('#createUtilisateur').attr("disabled", false);
                        }
                    });
                }

    function deleteUser(id) {
            $(".imloadDialog").fadeIn("1000");
            jsRoutes.controllers.UtilisateurController.deleteUtilisateur(id).ajax({
                success : function (data) {
                    if(data.result == "ok"){
                        $(".imloadDialog").fadeIn("1000");
                        $('#btnClose').click();
                        alert(data.message);
                        getUsers();
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


     function showUser(id) {
           $(".imload").fadeIn("1000");
                 jsRoutes.controllers.UtilisateurController.getUserById(id).ajax({
                     success: function (data) {
                     console.log("data--",data)
                         if (data.result == "ok"){
                             var user = data.user;

                             for (var i in user) {
                                 var html = '';
                                 html += '<tr id="' + user[i].id + '">';
                                 $('#prenomUp').val(user[i].prenom);
                                 $('#nomUp').val(user[i].nom);
                                 $('#loginUp').val(user[i].login);
                                 $('#libelleRoleUp').val(user[i].role);
                                 html += '</tr>';
                                 $('#tbodyEtatUp').append(html);

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

                $("#fileUploader").change(function(evt){
                    var selectedFile = evt.target.files[0];
                    var reader = new FileReader();
                    reader.onload = function(event) {
                      var data = event.target.result;
                      var workbook = XLSX.read(data, {
                          type: 'binary'
                      });
                      workbook.SheetNames.forEach(function(sheetName) {

                          var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                          var json_object = JSON.stringify(XL_row_object);
                          var etats = JSON.parse(json_object);
                          for (var i in etats) {
                             doCreateEtatWithFile(etats[i].codeetat,etats[i].libelleetat)
                          }
                          getEtatFodep();
                        })
                    };
                    reader.onerror = function(event) {
                      console.error("File could not be read! Code " + event.target.error.code);
                    };
                    reader.readAsBinaryString(selectedFile);
              });

              function doCreateEtatWithFile(codeEtat,libelleEtat){
                        $(".imloadAdd").fadeIn("1000");
                        jsRoutes.controllers.EtatFodepController.addEtatWhithFile(codeEtat,libelleEtat).ajax({
                            success : function (json) {

                                if (json.result == "ok") {
                                    //alert(json.message);
                                }
                                else{
                                    //alert(json.message);
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
               getAllRole();
               function getAllRole(){
                jsRoutes.controllers.UtilisateurController.getAllRole().ajax({
                    success: function (data) {
                    if (data.result == "ok") {
                        var roles = data.roles;
                        console.log("roles",roles)
                        for (var i in roles) {
                            var html = '';
                            html='<option value="'+roles[i].idRole+'">'+roles[i].libelleRole+'</option>';
                            $('#libelleRole').append(html);
                            $('#libelleRoleUp').append(html);
                        }
                        }
                    }
                });
                }

            function verifyBeforeUpdate(id){

                   $('#bt_modifier_user').attr("disabled", true);
                   var prenom = $('#prenomUp').val();
                   var nom = $('#nomUp').val();
                   var login = $('#loginUp').val();
                   var role = $('#libelleRoleUp').val();

                   if(prenom == ''){
                       alert('Prenom obligatoire !!!');
                       $('#bt_modifier_user').attr("disabled", false);
                   }

                   else {
                       var data ={
                           'id' : id,
                           'prenom' : prenom,
                           'nom' : nom,
                           'login' : login,
                           'role' : role
                       };
                       console.log(" selected id user = "+id);
                       updateUser(id,prenom,nom,login,role);
                   }
               }

               function updateUser(id,prenom,nom,login,role){
               $(".imloadAdd").fadeIn("1000");
               jsRoutes.controllers.UtilisateurController.updateUser(id,prenom,nom,login,role).ajax({
                   success : function (json) {

                       if (json.result == "ok") {
                           alert(json.message);
                           getUsers();
                           $("#updateUser").modal("hide");
                       }
                       else{
                           alert(json.message);
                           $('#bt_modifier_user').attr("disabled", false);
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

              $('#bt_modifier_user').click(function() {
                  verifyBeforeUpdate($('#id_selected_user').val());
              });
              $('#bt_annuler_update_user').click(function (e) {
                    $("#updateUser").modal("hide");
              });

});