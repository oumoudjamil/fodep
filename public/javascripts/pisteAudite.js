$(document)
    .ready(
    function (e) {

         loadingTask();

        function loadingTask() {
            $(".imloadDialog").fadeOut("1000");
            $('#codePoste').val('');
            $('#libellePoste').val('');
            $('#etatFodep').val('');

        }
          getPiste();
          function getPiste(page) {
            $('#tbodyPiste').html('');
            $('#pagingTop').html('');
                        $('#pagingBottom').html('');
                        $('#divPaginationhaut').empty();
                        $('#divPaginationhaut').removeData("twbs-pagination");
                        $('#divPaginationhaut').unbind("page");
                        $('#divPagination').empty();
                        $('#divPagination').removeData("twbs-pagination");
                        $('#divPagination').unbind("page");
            jsRoutes.controllers.ReglePonderationController.getAllPiste(page).ajax({
                success: function (data) {
                    if (data.result == "ok") {
                         console.log(data)
                        var pistes = data.pistes;
                        var numLine = (data.per_page * data.current_page) - data.per_page;
                        if (data.current_page == -1){numLine = 0}
                        console.log(pistes);
                         for (var i in pistes) {
                            var html = '';
                            numLine += 1;
                            html += '<tr">';
                            html += '<td>' + numLine + '</td>';
                            html += '<td>' + pistes[i].codePoste +  '</td>';
                            html += '<td>' + pistes[i].libellePoste+ '</td>';
                            html += '<td>' + pistes[i].codeEtat+ '</td>';
                            if(pistes[i].sourceDonnees2==null){
                              html += '<td>' + pistes[i].sourceDonnees+ '</td>';
                            }
                            else if(pistes[i].sourceDonnees2!=null){
                             html += '<td>' + pistes[i].sourceDonnees+ '/'+ pistes[i].sourceDonnees2+'</td>';
                            }
                            if(pistes[i].sourceValeur2==null){
                               html += '<td>' + pistes[i].sourceValeur+ '</td>';
                            }
                            else if(pistes[i].sourceValeur2!=null){
                              html += '<td>' + pistes[i].sourceValeur+ '/'+ pistes[i].sourceValeur2+'</td>';
                            }
                            if(pistes[i].valeur==null){
                              html += '<td> </td>';
                            }else{
                             html += '<td>' + pistes[i].valeur+ '</td>';
                            }
                            html += '<td> </td>';
                            html += '</tr>';
                            $('#tbodyPiste').append(html);
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
                                        getPiste(page);
                                    }
                                });
                                $('#divPagination').twbsPagination({
                                    totalPages: data.total_page,
                                    visiblePages: 3,
                                    startPage: page,
                                    onPageClick: function (event, numPage2) {
                                        page = numPage2;
                                        getPiste(page);
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

        $('#createAttribut').click(function (e) {
            verifyBeforeDoCreate();
        });
        function verifyBeforeDoCreate(){
            $('#createAttribut').attr("disabled", true);
            var codeAttribut = $('#codeAttribut').val();
            var libelleAttribut = $('#libelleAttribut').val();
            var sourceValeur = $('#sourceValeur').val();
            var sourceDonnees = $('#sourceDonnee').val();

            if(codeAttribut == ''){
                doShowErrorAdd(labelVerifyTel);
                $('#createAttribut').attr("disabled", false);
            }
            else {

                var data ={
                    'codeAttribut' : codeAttribut,
                    'libelleAttribut' : libelleAttribut,
                    'sourceValeur' : sourceValeur,
                    'sourceDonnees' : sourceDonnees
                };

                doCreateAttribut(data);
            }
        }
        function doCreateAttribut(data){
                    $(".imloadAdd").fadeIn("1000");
                    jsRoutes.controllers.AttributController.addAttribut().ajax({
                        data : JSON.stringify(data),
                        contentType : 'application/json',
                        success : function (json) {
                        console.log(json);
                            if (json.result == "ok") {
                                $('#closeModalAddAttribut').click();
                                doShowSuccess(json.message);
                                 getAttribut();
                            }
                            else{
                                doShowErrorAdd(json.message);
                            }
                            $(".imloadAdd").fadeOut("1000");
                            $('#createAttribut').attr("disabled", false);
                        },
                        error: function (xmlHttpReques,chaineRetourne,objetExeption) {
                            if(objetExeption == "Unauthorized"){
                                $(location).attr('href',"/");
                            }
                            $(".imload").fadeOut("1000");
                            $('#createAttribut').attr("disabled", false);
                        }
                    });
                }

    function deleteAttribut(codeAttribut) {
            $(".imloadDialog").fadeIn("1000");
            jsRoutes.controllers.AttributController.deleteAttribut(codeAttribut).ajax({
                success : function (data) {
                    if(data.result == "ok"){
                        $(".imloadDialog").fadeIn("1000");
                        $('#btnClose').click();
                        alert(data.message);
                        getAttribut();
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


     function showAttribut(codeAttribut) {
           $(".imload").fadeIn("1000");
                 jsRoutes.controllers.AttributController.getAttributbyCode(codeAttribut).ajax({
                     success: function (data) {
                     console.log("data--",data)
                         if (data.result == "ok"){
                             var attr = data.attributbyid;

                             for (var i in attr) {
                                 var html = '';
                                 html += '<tr id="' + attr[i].codeAttribut + '">';
                                 $('#codeAttributUp').val(attr[i].codeAttribut);
                                 $('#libelleAttributUp').val(attr[i].libelleAttribut);
                                 $('#sourceValeurUp').val(attr[i].sourceValeur);
                                 $('#sourceDonneeUp').val(attr[i].sourceDonnees);
                                 html += '</tr>';
                                 $('#tbodyAttributUp').append(html);

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

         function verifyBeforeUpdate(codeAttribut){

              $('#bt_modifier_attribut').attr("disabled", true);
              var codeAttribut = $('#codeAttributUp').val();
              var libelleAttribut = $('#libelleAttributUp').val();
              var sourceValeur = $('#sourceValeurUp').val();
              var sourceDonnees = $('#sourceDonneeUp').val();

              if(codeAttribut == ''){
                  alert('code Poste obligatoire !!!');
                  $('#bt_modifier_attribut').attr("disabled", false);
              }

              else {
                  var data ={
                      'codeAttribut' : codeAttribut,
                      'libelleAttribut' : libelleAttribut,
                      'sourceValeur' : sourceValeur,
                      'sourceDonnees' : sourceDonnees
                  };
                  console.log(" selected attribut code = "+codeAttribut);
                  updateAttribut(codeAttribut,libelleAttribut,sourceValeur,sourceDonnees);
              }
          }

        function updateAttribut(codeAttribut,libelleAttribut,sourceValeur,sourceDonnees){
          $(".imloadAdd").fadeIn("1000");
          jsRoutes.controllers.AttributController.updateAttribut(codeAttribut,libelleAttribut,sourceValeur,sourceDonnees).ajax({
              success : function (json) {

                  if (json.result == "ok") {
                      alert(json.message);
                      getAttribut();
                      $("#updateAttribut").modal("hide");
                  }
                  else{
                      alert(json.message);
                      $('#bt_modifier_Aatribut').attr("disabled", false);
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

         $('#bt_modifier_attribut').click(function() {
             verifyBeforeUpdate($('#id_selected_attribut').val());
         });
         $('#bt_annuler_update_attribut').click(function (e) {
               $("#updateAttribut").modal("hide");
         });


    $("#sourceDonnee").change(function () {
        var val = $(this).val();
        if (val == "client") {
            getColumns("client")
        } else if (val == "balance") {
            getColumns("balance")
        }
    });

             function getColumns(table){
                    jsRoutes.controllers.AttributController.getColumnsNames(table).ajax({
                        success: function (data) {
                        if (data.result == "ok") {
                            var data = data.columns;
                            var columns = data.split(',');
                            $("#sourceValeur").empty();
                             for (var i = 1; i < columns.length; i++) {
                               var html = '<option value="'+columns[i]+'">'+columns[i]+'</option>';
                               $('#sourceValeur').append(html);
                              }

                            }
                        }
                    });
                    }
});