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
            jsRoutes.controllers.EtatFodepController.getAllEtat(page).ajax({
                success: function (data) {
                    if (data.result == "ok") {
                         console.log(data)
                        var etat = data.etats;
                        var numLine = (data.per_page * data.current_page) - data.per_page;
                        if (data.current_page == -1){numLine = 0}
                         for (var i in etat) {
                            var html = '';
                            numLine += 1;
                            html += '<tr">';
                            html += '<td>' + numLine + '</td>';
                            html += '<td>' + etat[i].codeEtat +  '</td>';
                            html += '<td>' + etat[i].libelleEtat+ '</td>';
                            html += '<td> <button type="button" class="btn btn-icon line_poste" data-toggle="modal" data-target="#voirPoste" id="voirPoste-'+etat[i].codeEtat+'"><i class="fas fa-eye"></i></button></td>';
                            html += '<td><button type="button" class="btn btn-danger btn-icon btn-xs line_button" data-toggle="modal" data-target="#updateEtat" id="line_action-'+etat[i].codeEtat+'"> Modifier <i class="fa fa-fire"></i> </button></td>';
                            html += '<td><button type="button" class="btn btn-black btn-xs line_supp" id="line_supp-'+etat[i].codeEtat+'"><i class="fa fa-trash"></i> </button></td>';

                            html += '</tr>';
                            $('#tbodyEtat').append(html);
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
                                    getEtatFodep(page);
                                }
                            });
                            $('#divPagination').twbsPagination({
                                totalPages: data.total_page,
                                visiblePages: 3,
                                startPage: page,
                                onPageClick: function (event, numPage2) {
                                    page = numPage2;
                                    getEtatFodep(page);
                                }
                            });
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

                        $(".line_poste")
                            .click(
                            function() {
                            var id = $(this).attr('id');
                            var sp = id.split('-');
                             console.log(sp);
                             getAllPosteByEtat(sp[1])

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

        $('#createEtatFodep').click(function (e) {
            verifyBeforeDoCreate();
        });
        function verifyBeforeDoCreate(){
            $('#createEtatFodep').attr("disabled", true);
            var codeEtat = $('#codeEtat').val();
            var libelleEtat = $('#libelleEtat').val();


            if(codeEtat == ''){
                doShowErrorAdd(labelVerifyTel);
                $('#createEtatFodep').attr("disabled", false);
            }
            else if(libelleEtat == ''){
                doShowErrorAdd(labelVerifyNom);
                $('#createEtatFodep').attr("disabled", false);
            }

            else {

                var data ={
                    'codeEtat' : codeEtat,
                    'libelleEtat' : libelleEtat,
                };
                console.log(codeEtat,libelleEtat)
                doCreateEtat(data);
            }
        }
        function doCreateEtat(data){
                    $(".imloadAdd").fadeIn("1000");
                    jsRoutes.controllers.EtatFodepController.addEtat().ajax({
                        data : JSON.stringify(data),
                        contentType : 'application/json',
                        success : function (json) {
                        console.log(json);
                            if (json.result == "ok") {
                                $('#closeModalAddEtatFodep').click();
                                doShowSuccess(json.message);
                                 getEtatFodep();
                            }
                            else{
                                doShowErrorAdd(json.message);
                            }
                            $(".imloadAdd").fadeOut("1000");
                            $('#createEtatFodep').attr("disabled", false);
                        },
                        error: function (xmlHttpReques,chaineRetourne,objetExeption) {
                            if(objetExeption == "Unauthorized"){
                                $(location).attr('href',"/");
                            }
                            $(".imload").fadeOut("1000");
                            $('#createEtatFodep').attr("disabled", false);
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


     function showEtat(codeEtat) {
           $(".imload").fadeIn("1000");
                 jsRoutes.controllers.EtatFodepController.getEtatbyCode(codeEtat).ajax({
                     success: function (data) {
                     console.log("data--",data)
                         if (data.result == "ok"){
                             var etat = data.etatbyid;

                             for (var i in etat) {
                                 var html = '';
                                 html += '<tr id="' + etat[i].codeEtat + '">';
                                 $('#tfupdate_code').val(etat[i].codeEtat);
                                 $('#tfupdate_libelle').val(etat[i].libelleEtat);
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

         function verifyBeforeUpdate(codeEtat){

              $('#bt_modifier_etat').attr("disabled", true);
              var codeEtat = $('#tfupdate_code').val();
              var libelleEtat = $('#tfupdate_libelle').val();

              if(codeEtat == ''){
                  alert('code Etat obligatoire !!!');
                  $('#bt_modifier_etat').attr("disabled", false);
              }
              else if(libelleEtat == ''){
                  alert('libelle Etat obligatoire !!!');
                  $('#bt_modifier_etat').attr("disabled", false);
              }

              else {
                  var data ={
                      'codeEtat' : codeEtat,
                      'libelleEtat' : libelleEtat
                  };
                  console.log(" selected etat code = "+codeEtat);
                  updateEtat(codeEtat,libelleEtat);

              }
          }

          function updateEtat(codeEtat,libelleEtat){
          $(".imloadAdd").fadeIn("1000");
          jsRoutes.controllers.EtatFodepController.updateEtat(codeEtat,libelleEtat).ajax({
              success : function (json) {

                  if (json.result == "ok") {
                      alert(json.message);
                      getEtatFodep();
                      $("#updateEtat").modal("hide");
                  }
                  else{
                      alert(json.message);
                      $('#bt_modifier_etat').attr("disabled", false);
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

         $('#bt_modifier_etat').click(function() {
             verifyBeforeUpdate($('#id_selected_etat').val());
         });
         $('#bt_annuler_update_etat').click(function (e) {
               $("#updateEtat").modal("hide");
         });
         $('#bt_fermer').click(function (e) {
                        $("#voirPoste").modal("hide");
            });

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









       $('#generateEP20').click(function (e) {
            verifyBeforeDoCharge();
        });

        function verifyBeforeDoCharge(){
            var codePoste;
            var libellePoste;
            var codeEtat;

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
                                 'codeEtat' : codeEtat
                            };
                            doCreateResultat(data)
                         }

                    }
                }
            });
        }

                       function doCreateResultat(data){
                                $(".imloadAdd2").fadeIn("1000");
                                jsRoutes.controllers.ResultatsController.chargeResultat().ajax({
                                data : JSON.stringify(data),
                                contentType : 'application/json',
                                success : function (json) {
                                console.log(json);
                                    if (json.result == "ok") {
                                        doShowSuccess(json.message);
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


             function getAllPosteByEtat(codeEtat){
                jsRoutes.controllers.PosteFodepController.getAllPosteByEtat(codeEtat).ajax({
                    success: function (data) {
                    if (data.result == "ok") {
                        var postes = data.postes;
                        $('#tbodyPosteUp').html('');
                        for (var i in postes) {
                            var html = '';
                            if(postes[i].libellePoste!=null){
                               html='<tr> <td>'+postes[i].codePoste+'</td> <td>'+postes[i].libellePoste+'</td> </tr>';
                               $('#tbodyPosteUp').append(html);
                            }

                        }
                        }
                    }
                });
             }
});