$(document)
    .ready(
    function (e) {

        var compteClient;
        var prenomClient;
        var nomClient;
        var telephoneClient;
        var emailClient;
        var action;
        var ntc;
        $( "#dateSession").datepicker( "option", "dateFormat", "yy-mm-dd" );
        loadingTask();

        function loadingTask() {
            $(".imloadDialog").fadeOut("1000");
        }
          getSessionFodep();
          function getSessionFodep() {
            $('#tbodySession').html('');
            jsRoutes.controllers.SessionController.getAll().ajax({
                success: function (data) {
                    if (data.result == "ok") {
                         console.log(data)
                        var session = data.sessions;
                         for (var i in session) {
                            var html = '';
                            html += '<tr">';
                            html += '<td>' + session[i].idSession +  '</td>';
                            html += '<td>' + session[i].dateSession+ '</td>';
                            if (session[i].statut == "ac") {
                              html += '<td> <img src="/assets/images/on.png" width="15" height="15" / >  </td>';
                            }else {
                               html += '<td> <img src="/assets/images/off.png" width="15" height="15" / >  </td>';
                            }

                            if (session[i].statut == "ac") {
                              html += '<td><button  class="btn btn-danger btn-xs arreter btn-icon icon-right" data-toggle="modal" data-target="#myModalDebloquer" id="btarreter_' + session[i].idSession+'"  > Arreter <i class="fa fa-toggle-off"></i></button></td>';
                            }
                            else{
                               html += '<td> TERMINER </td>';
                            }
                            //html += '<td><button type="button" class="btn btn-black btn-xs line_supp" id="line_supp-'+session[i].idSession+'"><i class="fa fa-trash"></i> </button></td>';

                            html += '</tr>';
                            $('#tbodySession').append(html);
                        }

                        $(".line_supp")
                            .click(
                            function() {
                            var id = $(this).attr('id');
                            var sp = id.split('-');
                            console.log(sp);

                            var reponse = window.confirm("Souhaitez-vous vraiment supprimer cet ?");
                                if(reponse)
                                {
                                   deleteEtat(sp[1]);
                                }
                          });

                        $(".arreter").click(function(){
                           var id = $(this).attr('id');
                           var sp = id.split('_');
                           var reponse = window.confirm("Souhaitez-vous vraiment arreter cette session ?");
                             if(reponse) {
                                 stopSession(sp[1],"ar");
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

        $('#createSessionFodep').click(function (e) {
            verifyBeforeDoCreate();
        });
        function verifyBeforeDoCreate(){
            $('#createSessionFodep').attr("disabled", true);
            var idSession = $('#idSession').val();
            var dateSession = $('#dateSession').val();
            var status = "ac"

            if(idSession == ''){
                doShowErrorAdd(labelVerifyTel);
                $('#createSessionFodep').attr("disabled", false);
            }
            else if(dateSession == ''){
                doShowErrorAdd(labelVerifyNom);
                $('#createSessionFodep').attr("disabled", false);
            }

            else {

                var data ={
                    'idSession' : idSession,
                    'dateSession' : dateSession,
                    'status' : status
                };
                doCreateSession(data);
            }
        }
        function doCreateSession(data){
                    $(".imloadAdd").fadeIn("1000");
                    jsRoutes.controllers.SessionController.addSession().ajax({
                        data : JSON.stringify(data),
                        contentType : 'application/json',
                        success : function (json) {
                        console.log(json);
                            if (json.result == "ok") {
                                $('#closeModalAddSessionFodep').click();
                                doShowSuccess(json.message);
                                 getSessionFodep();
                            }
                            else{
                                doShowErrorAdd(json.message);
                            }
                            $(".imloadAdd").fadeOut("1000");
                            $('#createSessionFodep').attr("disabled", false);
                        },
                        error: function (xmlHttpReques,chaineRetourne,objetExeption) {
                            if(objetExeption == "Unauthorized"){
                                $(location).attr('href',"/");
                            }
                            $(".imload").fadeOut("1000");
                            $('#createSessionFodep').attr("disabled", false);
                        }
                    });
                }

    function deleteEtat(id) {
            $(".imloadDialog").fadeIn("1000");
            jsRoutes.controllers.EtatFodepController.deleteEtat(id).ajax({
                success : function (data) {
                    if(data.result == "ok"){
                        $(".imloadDialog").fadeIn("1000");
                        $('#btnClose').click();
                        alert(data.message);
                        getEtatFodep();
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



         function stopSession(id, statut) {
              $(".imload").fadeIn("1000");

              statut="ar";
              jsRoutes.controllers.SessionController.updateStatus(id, statut).ajax({
                      success : function (json) {
                  if (json.result == "ok") {
                  alert(json.message);
                  getSessionFodep();
                   } else {
                       alert(json.message);
                   }
               $(".imload").fadeOut("1000");
               }
              });
           }

});