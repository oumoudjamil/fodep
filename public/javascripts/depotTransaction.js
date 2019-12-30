/**
 * Created by bosco on 08/12/2015.
 */
$(document)
    .ready(
    function(e) {


        $(".imload").fadeIn("1000");
        $('#menuDepotTransaction').addClass('active');

        getAllDepotTransaction();

        function getAllDepotTransaction(page){
            $(".imload").fadeIn("1000");
            $('#tbodyDepot').html('');
            $('#pagingTop').html('');
            $('#pagingBottom').html('');
            $('#divPaginationhaut').empty();
            $('#divPaginationhaut').removeData("twbs-pagination");
            $('#divPaginationhaut').unbind("page");
            $('#divPagination').empty();
            $('#divPagination').removeData("twbs-pagination");
            $('#divPagination').unbind("page");
            appRoutes.controllers.DepotTransactionController.getAllDepotTransaction(page).ajax({
                success: function (json) {
                    if (json.result == "ok") {
                        var listDepot = json.listDepot;
                        if(listDepot.length == 0){
                            doShowWarning(labelEmptyDCV);
                        }
                        else{
                            var numLine = (json.per_page * json.current_page) - json.per_page;
                            if (json.current_page == -1){numLine = 0}
                            for (var i in listDepot) {
                                var html = '';
                                numLine +=1;
                                html += '<tr id="' + listDepot[i].idTransaction + '">';
                                html += '<td>' + numLine + '</td>';
                                html += '<td class="codeTransaction" id="' + listDepot[i].codeTransaction + '">' + listDepot[i].codeTransaction + '</td>';
                                html += '<td class="prenom" id="' + listDepot[i].prenom + '">' + listDepot[i].prenom + '</td>';
                                html += '<td class="nom" id="' + listDepot[i].nom + '">' + listDepot[i].nom + '</td>';
                                html += '<td class="mobile" id="' + listDepot[i].mobile + '">' + listDepot[i].mobile + '</td>';
                                html += '<td class="montant" id="' + listDepot[i].montant + '" align="right">' + formatMillier(listDepot[i].montant) + '</td>';
                                html += '<td class="frais" id="' + listDepot[i].frais + '" align="right">' + formatMillier(listDepot[i].frais) + '</td>';
                                html += '<td class="deltaDateOperation" id="' + listDepot[i].deltaDateOperation + '">' + listDepot[i].deltaDateOperation + '</td>';
                                html += '<td class="status" id="' + listDepot[i].status + '">' + listDepot[i].status + '</td>';
                                html += '<input type="hidden" class="numeroCompte" id="' + listDepot[i].numeroCompte + '">';
                                html += '<input type="hidden" class="deltaAgence" id="' + listDepot[i].deltaAgence + '">';
                                html += '<input type="hidden" class="deltaOperation" id="' + listDepot[i].deltaOperation + '">';
                                html += '<input type="hidden" class="deltaEvenement" id="' + listDepot[i].deltaEvenement + '">';
                                html += '<input type="hidden" class="deltaGuichet" id="' + listDepot[i].deltaGuichet + '">';
                                html += '<input type="hidden" class="deltaCaisse" id="' + listDepot[i].deltaCaisse + '">';
                                html += '<input type="hidden" class="deltaType" id="' + listDepot[i].deltaType + '">';
                                html += '<input type="hidden" class="deltaNatureOperation" id="' + listDepot[i].deltaNatureOperation + '">';
                                html += '<input type="hidden" class="deltaEtatOperation" id="' + listDepot[i].deltaEtatOperation + '">';
                                html += '<input type="hidden" class="deltaUser" id="' + listDepot[i].deltaUser + '">';
                                html += '<input type="hidden" class="deltaUTF" id="' + listDepot[i].deltaUTF + '">';
                                html += '<input type="hidden" class="deltaUTA" id="' + listDepot[i].deltaUTA + '">';
                                html += '<input type="hidden" class="dateOperation" id="' + listDepot[i].dateOperation + '">';
                                html += '<input type="hidden" class="dateModification" id="' + listDepot[i].dateModification + '">';
                                html += '<input type="hidden" class="motif" id="' + listDepot[i].motif + '">';
                                html += '<td align="center"> <button type="button" class="btn btn-default btn-xs btn-detail" data-toggle="modal" data-target="#pop-detail-transaction">' + btnDetail + '</button> </td>';
                                html += '</tr>';
                                $('#tbodyDepot').append(html);
                            }

                            var current_page = json.current_page;
                            if(current_page == -1){current_page = 1}
                            $('#pagingTop').append(current_page + '/' + json.total_page + ' ' + labelPaging);
                            $('#pagingBottom').append(current_page + '/' + json.total_page + ' ' + labelPaging);
                            $('#divPaginationhaut').twbsPagination({
                                totalPages: json.total_page,
                                visiblePages: 3,
                                startPage: current_page,
                                onPageClick: function (event, numPage) {
                                    page = numPage;
                                    getAllDepotTransaction(page);
                                }
                            });
                            $('#divPagination').twbsPagination({
                                totalPages: json.total_page,
                                visiblePages: 3,
                                startPage: current_page,
                                onPageClick: function (event, numPage2) {
                                    page = numPage2;
                                    getAllDepotTransaction(page);
                                }
                            });


                            $('.btn-detail').click(function (e) {
                                $('#myModalLabelTitle').html('');       $('#num_compte').html('');
                                $('#prenom_client').html('');           $('#nom_client').html('');
                                $('#mobile_client').html('');           $('#montant_transaction').html('');
                                $('#frais_transaction').html('');       $('#delta_operation').html('');
                                $('#delta_date_operation').html('');    $('#delta_agence').html('');
                                $('#delta_evenement').html('');         $('#delta_guichet').html('');
                                $('#delta_caisse').html('');            $('#delta_type').html('');
                                $('#delta_nat_op').html('');            $('#delta_etat_op').html('');
                                $('#delta_user').html('');              $('#delta_UTF').html('');
                                $('#delta_UTA').html('');               $('#date_operation').html('');
                                $('#date_modification').html('');       $('#status_trans').html('');
                                $('#motif_trans').html('');

                                $('#myModalLabelTitle').append(labelDetail + " : " +
                                                    $(this).parent().parent().children('.codeTransaction').attr('id') );
                                $('#num_compte').append($(this).parent().parent().children('.numeroCompte').attr('id'));
                                $('#prenom_client').append($(this).parent().parent().children('.prenom').attr('id'));
                                $('#nom_client').append($(this).parent().parent().children('.nom').attr('id'));
                                $('#mobile_client').append($(this).parent().parent().children('.mobile').attr('id'));
                                $('#montant_transaction').append($(this).parent().parent().children('.montant').attr('id') + " XAF");
                                $('#frais_transaction').append($(this).parent().parent().children('.frais').attr('id') + " XAF");
                                $('#delta_operation').append($(this).parent().parent().children('.deltaOperation').attr('id'));
                                $('#delta_date_operation').append($(this).parent().parent().children('.deltaDateOperation').attr('id'));
                                $('#delta_agence').append($(this).parent().parent().children('.deltaAgence').attr('id'));
                                $('#delta_evenement').append($(this).parent().parent().children('.deltaEvenement').attr('id'));
                                $('#delta_guichet').append($(this).parent().parent().children('.deltaGuichet').attr('id'));
                                $('#delta_caisse').append($(this).parent().parent().children('.deltaCaisse').attr('id'));
                                $('#delta_type').append($(this).parent().parent().children('.deltaType').attr('id'));
                                $('#delta_nat_op').append($(this).parent().parent().children('.deltaNatureOperation').attr('id'));
                                $('#delta_etat_op').append($(this).parent().parent().children('.deltaEtatOperation').attr('id'));
                                $('#delta_user').append($(this).parent().parent().children('.deltaUser').attr('id'));
                                $('#delta_UTF').append($(this).parent().parent().children('.deltaUTF').attr('id'));
                                $('#delta_UTA').append($(this).parent().parent().children('.deltaUTA').attr('id'));
                                $('#date_operation').append($(this).parent().parent().children('.dateOperation').attr('id'));
                                $('#date_modification').append($(this).parent().parent().children('.dateModification').attr('id'));
                                $('#status_trans').append($(this).parent().parent().children('.status').attr('id'));
                                $('#motif_trans').append($(this).parent().parent().children('.motif').attr('id'));
                            });


                        }

                    } else if(json.result == "nok"){
                        doShowWarning(json.message);
                    }else if(json.result == "nosession"){
                        $(location).attr('href',"/");
                    }
                    $(".imload").fadeOut("1000");
                },
                error: function (xmlHttpReques,chaineRetourne,objetExeption) {
                    if(objetExeption == "Unauthorized"){
                        $(location).attr('href',"/");
                    }
                    $(".imload").fadeOut("1000");
                }
            });
        }

        $('#btnsearch').click(
            function (e) {
                var dateDebut = $('#dateDebut').val();
                var dateFin = $('#dateFin').val();
                var codeTransaction = $('#codeTransSearch').val();
                var telephone = $('#phoneSearch').val();
                if(dateDebut == "" && dateFin == "" && codeTransaction == "" && telephone == ""){
                    doShowError(labelVerifySearch);
                }
                else{
                    $('#btnsearch').attr("disabled", true);
                    getSearchDepotTransaction();
                    $('#btnsearch').attr("disabled", false);
                }
        });

        $("#dateDebut" ).keydown(function( event ) {
            if(event.keyCode == 13){
                var dateDebut = $('#dateDebut').val();
                var dateFin = $('#dateFin').val();
                var codeTransaction = $('#codeTransSearch').val();
                var telephone = $('#phoneSearch').val();
                if(dateDebut == "" && dateFin == "" && codeTransaction == "" && telephone == ""){
                    doShowError(labelVerifySearch);
                }
                else{
                    $('#btnsearch').attr("disabled", true);
                    getSearchDepotTransaction();
                    $('#btnsearch').attr("disabled", false);
                }
            }
        });

        $("#dateFin" ).keydown(function( event ) {
            if(event.keyCode == 13){
                var dateDebut = $('#dateDebut').val();
                var dateFin = $('#dateFin').val();
                var codeTransaction = $('#codeTransSearch').val();
                var telephone = $('#phoneSearch').val();
                if(dateDebut == "" && dateFin == "" && codeTransaction == "" && telephone == ""){
                    doShowError(labelVerifySearch);
                }
                else{
                    $('#btnsearch').attr("disabled", true);
                    getSearchDepotTransaction();
                    $('#btnsearch').attr("disabled", false);
                }
            }
        });

        $("#codeTransSearch" ).keydown(function( event ) {
            if(event.keyCode == 13){
                var dateDebut = $('#dateDebut').val();
                var dateFin = $('#dateFin').val();
                var codeTransaction = $('#codeTransSearch').val();
                var telephone = $('#phoneSearch').val();
                if(dateDebut == "" && dateFin == "" && codeTransaction == "" && telephone == ""){
                    doShowError(labelVerifySearch);
                }
                else{
                    $('#btnsearch').attr("disabled", true);
                    getSearchDepotTransaction();
                    $('#btnsearch').attr("disabled", false);
                }
            }
        });

        $("#phoneSearch" ).keydown(function( event ) {
            if(event.keyCode == 13){
                var dateDebut = $('#dateDebut').val();
                var dateFin = $('#dateFin').val();
                var codeTransaction = $('#codeTransSearch').val();
                var telephone = $('#phoneSearch').val();
                if(dateDebut == "" && dateFin == "" && codeTransaction == "" && telephone == ""){
                    doShowError(labelVerifySearch);
                }
                else{
                    $('#btnsearch').attr("disabled", true);
                    getSearchDepotTransaction(e);
                    $('#btnsearch').attr("disabled", false);
                }
            }
        });

        function getSearchDepotTransaction(dateDebut, dateFin, codeTransaction, telephone, page){
            $(".imload").fadeIn("1000");
            $('#tbodyDepot').html('');
            $('#pagingTop').html('');
            $('#pagingBottom').html('');
            $('#divPaginationhaut').empty();
            $('#divPaginationhaut').removeData("twbs-pagination");
            $('#divPaginationhaut').unbind("page");
            $('#divPagination').empty();
            $('#divPagination').removeData("twbs-pagination");
            $('#divPagination').unbind("page");
            $( "#dateDebut" ).datepicker( "option", "dateFormat", "yy-mm-dd" );
            $( "#dateFin" ).datepicker( "option", "dateFormat", "yy-mm-dd" );
            dateDebut = $('#dateDebut').val();
            dateFin = $('#dateFin').val();
            codeTransaction = $('#codeTransSearch').val();
            telephone = $('#phoneSearch').val();
            appRoutes.controllers.DepotTransactionController.searchDepotTransaction(dateDebut,
                                            dateFin, codeTransaction, telephone, page).ajax({
                success: function (json) {
                    if (json.result == "ok") {
                        var listDepot = json.listDepot;
                        if(listDepot.length == 0){
                            doShowWarning(labelEmptyDCV);
                        }
                        else{
                            var numLine = (json.per_page * json.current_page) - json.per_page;
                            if (json.current_page == -1){numLine = 0}
                            for (var i in listDepot) {
                                var html = '';
                                numLine +=1;
                                html += '<tr id="' + listDepot[i].idTransaction + '">';
                                html += '<td>' + numLine + '</td>';
                                html += '<td class="codeTransaction" id="' + listDepot[i].codeTransaction + '">' + listDepot[i].codeTransaction + '</td>';
                                html += '<td class="prenom" id="' + listDepot[i].prenom + '">' + listDepot[i].prenom + '</td>';
                                html += '<td class="nom" id="' + listDepot[i].nom + '">' + listDepot[i].nom + '</td>';
                                html += '<td class="mobile" id="' + listDepot[i].mobile + '">' + listDepot[i].mobile + '</td>';
                                html += '<td class="montant" id="' + listDepot[i].montant + '" align="right">' + formatMillier(listDepot[i].montant) + '</td>';
                                html += '<td class="frais" id="' + listDepot[i].frais + '" align="right">' + formatMillier(listDepot[i].frais) + '</td>';
                                html += '<td class="deltaDateOperation" id="' + listDepot[i].deltaDateOperation + '">' + listDepot[i].deltaDateOperation + '</td>';
                                html += '<td class="status" id="' + listDepot[i].status + '">' + listDepot[i].status + '</td>';
                                html += '<input type="hidden" class="numeroCompte" id="' + listDepot[i].numeroCompte + '">';
                                html += '<input type="hidden" class="deltaAgence" id="' + listDepot[i].deltaAgence + '">';
                                html += '<input type="hidden" class="deltaOperation" id="' + listDepot[i].deltaOperation + '">';
                                html += '<input type="hidden" class="deltaEvenement" id="' + listDepot[i].deltaEvenement + '">';
                                html += '<input type="hidden" class="deltaGuichet" id="' + listDepot[i].deltaGuichet + '">';
                                html += '<input type="hidden" class="deltaCaisse" id="' + listDepot[i].deltaCaisse + '">';
                                html += '<input type="hidden" class="deltaType" id="' + listDepot[i].deltaType + '">';
                                html += '<input type="hidden" class="deltaNatureOperation" id="' + listDepot[i].deltaNatureOperation + '">';
                                html += '<input type="hidden" class="deltaEtatOperation" id="' + listDepot[i].deltaEtatOperation + '">';
                                html += '<input type="hidden" class="deltaUser" id="' + listDepot[i].deltaUser + '">';
                                html += '<input type="hidden" class="deltaUTF" id="' + listDepot[i].deltaUTF + '">';
                                html += '<input type="hidden" class="deltaUTA" id="' + listDepot[i].deltaUTA + '">';
                                html += '<input type="hidden" class="dateOperation" id="' + listDepot[i].dateOperation + '">';
                                html += '<input type="hidden" class="dateModification" id="' + listDepot[i].dateModification + '">';
                                html += '<input type="hidden" class="motif" id="' + listDepot[i].motif + '">';
                                html += '<td align="center"> <button type="button" class="btn btn-default btn-xs btn-detail" data-toggle="modal" data-target="#pop-detail-transaction">' + btnDetail + '</button> </td>';
                                html += '</tr>';
                                $('#tbodyDepot').append(html);
                            }

                            var current_page = json.current_page;
                            if(current_page == -1){current_page = 1}
                            $('#pagingTop').append(current_page + '/' + json.total_page + ' ' + labelPaging);
                            $('#pagingBottom').append(current_page + '/' + json.total_page + ' ' + labelPaging);
                            $('#divPaginationhaut').twbsPagination({
                                totalPages: json.total_page,
                                visiblePages: 3,
                                startPage: current_page,
                                onPageClick: function (event, numPage) {
                                    page = numPage;
                                    getSearchDepotTransaction(dateDebut, dateFin, codeTransaction, telephone, page);
                                }
                            });
                            $('#divPagination').twbsPagination({
                                totalPages: json.total_page,
                                visiblePages: 3,
                                startPage: current_page,
                                onPageClick: function (event, numPage2) {
                                    page = numPage2;
                                    getSearchDepotTransaction(dateDebut, dateFin, codeTransaction, telephone, page);
                                }
                            });


                            $('.btn-detail').click(function (e) {
                                $('#myModalLabelTitle').html('');       $('#num_compte').html('');
                                $('#prenom_client').html('');           $('#nom_client').html('');
                                $('#mobile_client').html('');           $('#montant_transaction').html('');
                                $('#frais_transaction').html('');       $('#delta_operation').html('');
                                $('#delta_date_operation').html('');    $('#delta_agence').html('');
                                $('#delta_evenement').html('');         $('#delta_guichet').html('');
                                $('#delta_caisse').html('');            $('#delta_type').html('');
                                $('#delta_nat_op').html('');            $('#delta_etat_op').html('');
                                $('#delta_user').html('');              $('#delta_UTF').html('');
                                $('#delta_UTA').html('');               $('#date_operation').html('');
                                $('#date_modification').html('');       $('#status_trans').html('');
                                $('#motif_trans').html('');

                                $('#myModalLabelTitle').append(labelDetail + " : " +
                                                    $(this).parent().parent().children('.codeTransaction').attr('id') );
                                $('#num_compte').append($(this).parent().parent().children('.numeroCompte').attr('id'));
                                $('#prenom_client').append($(this).parent().parent().children('.prenom').attr('id'));
                                $('#nom_client').append($(this).parent().parent().children('.nom').attr('id'));
                                $('#mobile_client').append($(this).parent().parent().children('.mobile').attr('id'));
                                $('#montant_transaction').append($(this).parent().parent().children('.montant').attr('id') + " XAF");
                                $('#frais_transaction').append($(this).parent().parent().children('.frais').attr('id') + " XAF");
                                $('#delta_operation').append($(this).parent().parent().children('.deltaOperation').attr('id'));
                                $('#delta_date_operation').append($(this).parent().parent().children('.deltaDateOperation').attr('id'));
                                $('#delta_agence').append($(this).parent().parent().children('.deltaAgence').attr('id'));
                                $('#delta_evenement').append($(this).parent().parent().children('.deltaEvenement').attr('id'));
                                $('#delta_guichet').append($(this).parent().parent().children('.deltaGuichet').attr('id'));
                                $('#delta_caisse').append($(this).parent().parent().children('.deltaCaisse').attr('id'));
                                $('#delta_type').append($(this).parent().parent().children('.deltaType').attr('id'));
                                $('#delta_nat_op').append($(this).parent().parent().children('.deltaNatureOperation').attr('id'));
                                $('#delta_etat_op').append($(this).parent().parent().children('.deltaEtatOperation').attr('id'));
                                $('#delta_user').append($(this).parent().parent().children('.deltaUser').attr('id'));
                                $('#delta_UTF').append($(this).parent().parent().children('.deltaUTF').attr('id'));
                                $('#delta_UTA').append($(this).parent().parent().children('.deltaUTA').attr('id'));
                                $('#date_operation').append($(this).parent().parent().children('.dateOperation').attr('id'));
                                $('#date_modification').append($(this).parent().parent().children('.dateModification').attr('id'));
                                $('#status_trans').append($(this).parent().parent().children('.status').attr('id'));
                                $('#motif_trans').append($(this).parent().parent().children('.motif').attr('id'));
                            });


                        }

                    } else if(json.result == "nok"){
                        doShowWarning(json.message);
                    }else if(json.result == "nosession"){
                        $(location).attr('href',"/");
                    }
                    $(".imload").fadeOut("1000");
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
