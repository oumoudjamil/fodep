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

        loadingTask();

        function loadingTask() {
            $(".imloadDialog").fadeOut("1000");
        }
          getEtatFodep();
          function getEtatFodep(page) {
           $(".imload").fadeIn("1000");
           $('#pagingTop').html('');
           $('#pagingBottom').html('');
           $('#divPaginationhaut').empty();
           $('#divPaginationhaut').removeData("twbs-pagination");
           $('#divPaginationhaut').unbind("page");
           $('#divPagination').empty();
           $('#divPagination').removeData("twbs-pagination");
           $('#divPagination').unbind("page");
            $('#tbodyEtat').html('');
            jsRoutes.controllers.EtatFodepController.getAll().ajax({
                success: function (data) {
                    if (data.result == "ok") {
                         console.log(data)
                        var etat = data.etats;
                         for (var i in etat) {
                            var html = '';
                            html += '<tr">';
                            html += '<td>' + etat[i].codeEtat +  '</td>';
                            html += '<td>' + etat[i].libelleEtat+ '</td>';
                            html += '<td><input type="checkbox" id="etats" name="etats" class="etats" value="'+etat[i].codeEtat+'"></td>';

                            html += '</tr>';
                            $('#tbodyEtat').append(html);
                        }

                        $(".line_supp")
                            .click(
                            function() {
                            var id = $(this).attr('id');
                            var sp = id.split('-');
                            console.log(sp);

                            var reponse = window.confirm("Souhaitez-vous vraiment supprimer cet etat ?");
                                if(reponse)
                                {
                                   deleteEtat(sp[1]);
                                }
                          });

                        $(".line_button")
                            .click(
                            function() {
                            var id = $(this).attr('id');
                            var sp1 = id.split('-');
                            console.log("id---",sp1[1])
                             showEtat(sp1[1]);
                            $('#id_selected_etat').val(sp1[1]);
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
        $("#checkAll").click(function(){
           $('input:checkbox').not($('#etats')).prop('checked', "true");
        });
        $("#uncheckAll").click(function(){
          $('input:checkbox').not($('#etats')).removeAttr('checked');
        });

       $('#chargeResultat').click(function (e) {
            verifyBeforeDoCharge();
        });

        $('#bt_gene_exel').click(function (e) {
            $('input[name="etats"]:checked').each(function() {
               etat = this.value;
               console.log(this.value)
               exportFile(etat)
            });
        });

        function verifyBeforeDoCharge(){
            var codePoste;
            var libellePoste;
            var codeEtat;
            var sessionActive = $('#sessionActive').val()

            if(sessionActive ==""){
               alert("Choisissez une session");

            }else{
             jsRoutes.controllers.PosteFodepController.getAll().ajax({
                success: function (data) {
                    if (data.result == "ok") {
                         console.log(data)
                         var postes = data.postes;
                         console.log(postes)
                         for (var i in postes) {
                            codePoste = postes[i].codePoste;
                            libellePoste = postes[i].libellePoste;
                            codeEtat = postes[i].codeEtat;

                            var data ={
                                 'codePoste' : codePoste,
                                 'libellePoste' : libellePoste,
                                 'codeEtat' : codeEtat,
                                 'session' : sessionActive
                            };
                            doCreateResultat(data)

                         }

                    }
                }
             });
            }
        }

                       function doCreateResultat(data){
                                $(".imloadAdd").fadeIn("1000");
                                jsRoutes.controllers.ResultatsController.chargeResultat().ajax({
                                data : JSON.stringify(data),
                                contentType : 'application/json',
                                success : function (json) {
                                console.log(json);
                                    if (json.result == "ok") {
                                    $(".imloadAdd").fadeOut("1000");
                                       // alert(json.message);
                                         //getPosteFodep();
                                    }
                                    else{
                                        doShowErrorAdd(json.message);
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

         function exportFile(etat){

              $('#chargeResultat').attr("disabled", true);
              var sessionActive = $('#sessionActive').val();

              if(sessionActive == ""){
                 alert("Vous devez choisir une session");
              }
              else {
                  var data ={
                      'etat' : etat,
                      'session' : sessionActive
                  };
                  //console.log(etat);
                  generateFiles(data);
              }
        }
                        function generateFiles(data){
                                 $(".imloadAdd").fadeIn("1000");
                                 jsRoutes.controllers.ExportController.generateReport().ajax({
                                 data : JSON.stringify(data),
                                 contentType : 'application/json',
                                 success : function (json) {
                                 console.log(json)
                                     if (json.result == "ok") {
                                         alert(json.message);
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

                  getSessionActive();

                  function getSessionActive(){
                    jsRoutes.controllers.SessionController.getActiveSession().ajax({
                        success: function (data) {
                        if (data.result == "ok") {
                            var sessions = data.sessions;
                             for (var i in sessions) {
                                 var html = '<option value="'+sessions[i].idSession+'">'+sessions[i].dateSession+'</option>';
                               $('#sessionActive').append(html);
                              }

                            }
                        }
                    });
                  }
});