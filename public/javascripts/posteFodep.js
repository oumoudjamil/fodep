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
            $('#codePoste').val('');
            $('#libellePoste').val('');
            $('#seletatFodep').val('');

        }
          getPosteFodep();
          function getPosteFodep(page) {
            $('#tbodyPoste').html('');
            $(".imload").fadeIn("1000");
            $('#pagingTop').html('');
            $('#pagingBottom').html('');
            $('#divPaginationhaut').empty();
            $('#divPaginationhaut').removeData("twbs-pagination");
            $('#divPaginationhaut').unbind("page");
            $('#divPagination').empty();
            $('#divPagination').removeData("twbs-pagination");
            $('#divPagination').unbind("page");
            jsRoutes.controllers.PosteFodepController.getAllPoste(page).ajax({
                success: function (data) {
                    if (data.result == "ok") {
                         console.log(data)
                        var etat = data.postes;
                        var numLine = (data.per_page * data.current_page) - data.per_page;
                        if (data.current_page == -1){numLine = 0}
                         for (var i in etat) {
                            var html = '';
                            numLine += 1;
                            html += '<tr">';
                            html += '<td>' + numLine + '</td>';
                            html += '<td>' + etat[i].codePoste +  '</td>';
                            html += '<td>' + etat[i].libellePoste+ '</td>';
                             html += '<td>' + etat[i].codeEtat+ '</td>';
                            html += '<td><button type="button" class="btn btn-danger btn-icon btn-xs line_button" data-toggle="modal" data-target="#updatePoste" id="line_action-'+etat[i].codePoste+'"> Modifier <i class="fa fa-fire"></i> </button></td>';
                            html += '<td><button type="button" class="btn btn-black btn-xs line_supp" id="line_supp-'+etat[i].codePoste+'"><i class="fa fa-trash"></i> </button></td>';

                            html += '</tr>';
                            $('#tbodyPoste').append(html);
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
                                    getPosteFodep(page);
                                }
                            });
                            $('#divPagination').twbsPagination({
                                totalPages: data.total_page,
                                visiblePages: 3,
                                startPage: page,
                                onPageClick: function (event, numPage2) {
                                    page = numPage2;
                                    getPosteFodep(page);
                                }
                            });

                        $(".line_supp")
                            .click(
                            function() {
                            var id = $(this).attr('id');
                            var sp = id.split('-');
                            console.log(sp);

                            var reponse = window.confirm("Souhaitez-vous vraiment supprimer ce poste ?");
                                if(reponse)
                                {
                                   deletePoste(sp[1]);
                                }
                          });

                        $(".line_button")
                            .click(
                            function() {
                            var id = $(this).attr('id');
                            var sp1 = id.split('-');
                            console.log("id---",sp1[1])
                             showPoste(sp1[1]);
                            $('#id_selected_poste').val(sp1[1]);
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

        $('#createPosteFodep').click(function (e) {
            verifyBeforeDoCreate();
        });
        function verifyBeforeDoCreate(){
            $('#createPosteFodep').attr("disabled", true);
            var codePoste = $('#codePoste').val();
            var libellePoste = $('#libellePoste').val();
            var etatFodep = $('#seletatFodep').val();

            if(codePoste == ''){
                doShowErrorAdd(labelVerifyTel);
                $('#createPosteFodep').attr("disabled", false);
            }
            else if(libellePoste == ''){
                doShowErrorAdd(labelVerifyNom);
                $('#createPosteFodep').attr("disabled", false);
            }
            else if(etatFodep == ''){
                doShowErrorAdd(labelVerifyNom);
                $('#createPosteFodep').attr("disabled", false);
            }

            else {

                var data ={
                    'codePoste' : codePoste,
                    'libellePoste' : libellePoste,
                    'codeEtat' : etatFodep
                };

                doCreatePoste(data);
            }
        }
        function doCreatePoste(data){
                    $(".imloadAdd").fadeIn("1000");
                    jsRoutes.controllers.PosteFodepController.addPoste().ajax({
                        data : JSON.stringify(data),
                        contentType : 'application/json',
                        success : function (json) {
                        console.log(json);
                            if (json.result == "ok") {
                                $('#closeModalAddPosteFodep').click();
                                doShowSuccess(json.message);
                                 getPosteFodep();
                            }
                            else{
                                doShowErrorAdd(json.message);
                            }
                            $(".imloadAdd").fadeOut("1000");
                            $('#createPosteFodep').attr("disabled", false);
                        },
                        error: function (xmlHttpReques,chaineRetourne,objetExeption) {
                            if(objetExeption == "Unauthorized"){
                                $(location).attr('href',"/");
                            }
                            $(".imload").fadeOut("1000");
                            $('#createPosteFodep').attr("disabled", false);
                        }
                    });
                }

    function deletePoste(codePoste) {
            $(".imloadDialog").fadeIn("1000");
            jsRoutes.controllers.PosteFodepController.deletePoste(codePoste).ajax({
                success : function (data) {
                    if(data.result == "ok"){
                        $(".imloadDialog").fadeIn("1000");
                        $('#btnClose').click();
                        alert(data.message);
                        getPosteFodep();
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


     function showPoste(codePoste) {
           $(".imload").fadeIn("1000");
                 jsRoutes.controllers.PosteFodepController.getPostebyCode(codePoste).ajax({
                     success: function (data) {
                     console.log("data--",data)
                         if (data.result == "ok"){
                             var poste = data.Postebyid;

                             for (var i in poste) {
                                 var html = '';
                                 html += '<tr id="' + poste[i].codePoste + '">';
                                 $('#tfupdate_code').val(poste[i].codePoste);
                                 $('#tfupdate_libelle').val(poste[i].libellePoste);
                                  $('#selupdate_etat').val(poste[i].codeEtat);
                                 html += '</tr>';
                                 $('#tbodyPosteUp').append(html);

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

              $('#bt_modifier_poste').attr("disabled", true);
              var codePoste = $('#tfupdate_code').val();
              var libellePoste = $('#tfupdate_libelle').val();
              var codeEtat = $('#selupdate_etat').val();

              if(codePoste == ''){
                  alert('code Poste obligatoire !!!');
                  $('#bt_modifier_poste').attr("disabled", false);
              }
              else if(libellePoste == ''){
                  alert('libelle Poste obligatoire !!!');
                  $('#bt_modifier_poste').attr("disabled", false);
              }
              else if(codeEtat == ''){
                  alert('Etat obligatoire !!!');
                  $('#bt_modifier_poste').attr("disabled", false);
              }

              else {
                  var data ={
                      'codePoste' : codePoste,
                      'libellePoste' : libellePoste,
                      'codeEtat' : codeEtat
                  };
                  console.log(" selected poste code = "+codePoste);
                  updatePoste(codePoste,libellePoste,codeEtat);
              }
          }

          function updatePoste(codePoste,libellePoste,codeEtat){
          $(".imloadAdd").fadeIn("1000");
          jsRoutes.controllers.PosteFodepController.updatePoste(codePoste,libellePoste,codeEtat).ajax({
              success : function (json) {

                  if (json.result == "ok") {
                      alert(json.message);
                      getPosteFodep();
                      $("#updatePoste").modal("hide");
                  }
                  else{
                      alert(json.message);
                      $('#bt_modifier_poste').attr("disabled", false);
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

         $('#bt_modifier_poste').click(function() {
             verifyBeforeUpdate($('#id_selected_poste').val());
         });
         $('#bt_annuler_update_poste').click(function (e) {
               $("#updatePoste").modal("hide");
         });

         getAllEtat();
         function getAllEtat(){
                jsRoutes.controllers.EtatFodepController.getAll().ajax({
                    success: function (data) {
                    if (data.result == "ok") {
                        var etat = data.etats;
                        for (var i in etat) {
                            var html = '';
                            html='<option value="'+etat[i].codeEtat+'">'+etat[i].libelleEtat+'</option>';
                            $('#seletatFodep').append(html);
                            $('#selupdate_etat').append(html);
                        }
                        }
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
                          var postes = JSON.parse(json_object);
                          console.log("poste",postes)
                          for (var i in postes) {
                             doCreatePosteWithFile(postes[i].codeposte,postes[i].libelleposte, postes[i].codeetat)
                          }

                        })
                        getPosteFodep();
                    };
                    reader.onerror = function(event) {
                      console.error("File could not be read! Code " + event.target.error.code);
                    };
                    reader.readAsBinaryString(selectedFile);
              });

              function doCreatePosteWithFile(codePoste,libellePoste,codeEtat){
                        $(".imloadAdd").fadeIn("1000");
                        jsRoutes.controllers.PosteFodepController.addPosteWhithFile(codePoste,libellePoste,codeEtat).ajax({
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
});