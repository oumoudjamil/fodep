$(document)
    .ready(
    function (e) {

        loadingTask();

        function loadingTask() {
            $(".imloadDialog").fadeOut("1000");
        }
          getRoles();
          function getRoles() {
           $(".imload").fadeIn("1000");
           $('#pagingTop').html('');
           $('#pagingBottom').html('');
           $('#divPaginationhaut').empty();
           $('#divPaginationhaut').removeData("twbs-pagination");
           $('#divPaginationhaut').unbind("page");
           $('#divPagination').empty();
           $('#divPagination').removeData("twbs-pagination");
           $('#divPagination').unbind("page");
            $('#tbodyRoles').html('');
            jsRoutes.controllers.UtilisateurController.getAllRole().ajax({
                success: function (data) {
                    if (data.result == "ok") {
                         console.log(data)
                        var roles = data.roles;

                         for (var i in roles) {
                            var html = '';
                            html += '<tr">';
                            html += '<td>' + roles[i].idRole +  '</td>';
                            html += '<td>' + roles[i].libelleRole+ '</td>';

                            html += '<td><button type="button" class="btn btn-black btn-xs line_supp" id="line_supp-'+roles[i].idRole+'"><i class="fa fa-trash"></i> </button></td>';
                            html += '</tr>';
                            $('#tbodyRoles').append(html);
                        }


                        $(".line_supp")
                            .click(
                            function() {
                            var id = $(this).attr('id');
                            var sp = id.split('-');
                            console.log(sp);

                            var reponse = window.confirm("Souhaitez-vous vraiment supprimer ce role ?");
                                if(reponse)
                                {
                                   deleteRole(sp[1]);
                                }
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

function deleteRole(id) {
            $(".imloadDialog").fadeIn("1000");
            jsRoutes.controllers.UtilisateurController.deleteRole(id).ajax({
                success : function (data) {
                    if(data.result == "ok"){
                        $(".imloadDialog").fadeIn("1000");
                        $('#btnClose').click();
                        alert(data.message);
                        getRoles();
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

$('#createRole').click(function (e) {
            verifyBeforeDoCreate();
        });
        function verifyBeforeDoCreate(){
            $('#createRole').attr("disabled", true);
            var role = $('#roleLib').val();
               console.log("role",role)
                var data ={
                    'role' : role
                };
                doCreateRole(data);

        }
        function doCreateRole(data){
                    $(".imloadAdd").fadeIn("1000");
                    jsRoutes.controllers.UtilisateurController.addRole().ajax({
                        data : JSON.stringify(data),
                        contentType : 'application/json',
                        success : function (json) {
                        console.log(json);
                            if (json.result == "ok") {
                                $('#closeModalAddRole').click();
                                doShowSuccess(json.message);
                                 getRoles();
                            }
                            else{
                                doShowErrorAdd(json.message);
                            }
                            $(".imloadAdd").fadeOut("1000");
                            $('#createRole').attr("disabled", false);
                        },
                        error: function (xmlHttpReques,chaineRetourne,objetExeption) {
                            if(objetExeption == "Unauthorized"){
                                $(location).attr('href',"/");
                            }
                            $(".imload").fadeOut("1000");
                            $('#createRole').attr("disabled", false);
                        }
                    });
                }
});