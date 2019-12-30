/**
 * Created by bosco on 02/11/2016.
 */
$(document)
    .ready(
    function(e) {


        $(".imload").fadeIn("1000");
        $('#menuCocaTrans').addClass('active');

        getAllTransaction();

        function getAllTransaction(status, mobile, debut, fin, page){
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
                    mobile = $('#phoneSearch').val();
                    status = $('#statusSearch').val();
                    debut = $('#dateDebut').val();
                    fin = $('#dateFin').val();
                    appRoutes.controllers.CocaTransactionController.getCocaTransaction(status, mobile, debut, fin, page).ajax({
                        success: function (json) {
                            if (json.result == "ok") {
                                var listTransaction = json.list;
                                if(listTransaction.length == 0){
                                    doShowWarning(labelEmptyDCV);
                                }
                                else{
                                    var numLine = (json.per_page * json.current_page) - json.per_page;
                                    if (json.current_page == -1){numLine = 0}
                                    for (var i in listTransaction) {
                                        var html = '';
                                        numLine +=1;
                                        html += '<tr id="' + listTransaction[i].idTransaction + '">';
                                        html += '<td>' + numLine + '</td>';
                                        html += '<td class="codeTransaction" id="' + listTransaction[i].codeTransaction + '">' + listTransaction[i].codeTransaction + '</td>';
                                        html += '<td class="mobileSender" id="' + listTransaction[i].mobileSender + '">' + listTransaction[i].mobileSender + '</td>';
                                        html += '<td class="accountReceiver" id="' + listTransaction[i].accountReceiver + '">' + listTransaction[i].accountReceiver + '</td>';
                                        html += '<td class="surnameReceiver" id="' + listTransaction[i].surnameReceiver + '">' + listTransaction[i].surnameReceiver + '</td>';
                                        html += '<td class="nameReceiver" id="' + listTransaction[i].nameReceiver + '">' + listTransaction[i].nameReceiver + '</td>';
                                        html += '<td class="amount" id="' + listTransaction[i].amount + '" align="right">' + listTransaction[i].amount + '</td>';
                                        html += '<td class="fee" id="' + listTransaction[i].fee + '" align="right">' + listTransaction[i].fee + '</td>';
                                        html += '<td class="status" id="' + listTransaction[i].status + '">' + listTransaction[i].status + '</td>';
                                        html += '<input type="hidden" class="service" id="' + listTransaction[i].service + '">';
                                        html += '<input type="hidden" class="numeroCompte" id="' + listTransaction[i].numeroCompte + '">';
                                        html += '<input type="hidden" class="surnameSender" id="' + listTransaction[i].surnameSender + '">';
                                        html += '<input type="hidden" class="nameSender" id="' + listTransaction[i].nameSender + '">';
                                        html += '<input type="hidden" class="emailSender" id="' + listTransaction[i].emailSender + '">';
                                        html += '<input type="hidden" class="imeiSender" id="' + listTransaction[i].imeiSender + '">';
                                        html += '<input type="hidden" class="countryReceiver" id="' + listTransaction[i].countryReceiver + '">';
                                        html += '<input type="hidden" class="bankReceiver" id="' + listTransaction[i].bankReceiver + '">';
                                        html += '<input type="hidden" class="dateCreation" id="' + listTransaction[i].dateCreation + '">';
                                        html += '<input type="hidden" class="dateExpiration" id="' + listTransaction[i].dateExpiration + '">';
                                        html += '<input type="hidden" class="codeRetour" id="' + listTransaction[i].codeRetour + '">';
                                        html += '<input type="hidden" class="datePaiement" id="' + listTransaction[i].datePaiement + '">';
                                        html += '<input type="hidden" class="sequence" id="' + listTransaction[i].sequence + '">';
                                        html += '<input type="hidden" class="motifRetour" id="' + listTransaction[i].motifRetour + '">';
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
                                            getAllTransaction(status, mobile, debut, fin, page);
                                        }
                                    });
                                    $('#divPagination').twbsPagination({
                                        totalPages: json.total_page,
                                        visiblePages: 3,
                                        startPage: current_page,
                                        onPageClick: function (event, numPage2) {
                                            page = numPage2;
                                            getAllTransaction(status, mobile, debut, fin, page);
                                        }
                                    });


                                    $('.btn-detail').click(function (e) {
                                        $('#myModalLabelTitle').html('');
                                        $('#serviceCocaDetail').html('');           $('#acountSenderDetail').html('');
                                        $('#surnameSenderDetail').html('');         $('#nameSenderDetail').html('');
                                        $('#emailSenderDetail').html('');           $('#mobileSenderDetail').html('');
                                        $('#imeiSenderDetail').html('');            $('#accountReceiverDetail').html('');
                                        $('#surnameReceiverDetail').html('');       $('#nameReceiverDetail').html('');
                                        $('#countryReceiverDetail').html('');       $('#bankReceiverDetail').html('');
                                        $('#amountDetail').html('');                $('#feeDetail').html('');
                                        $('#dateCreationDetail').html('');          $('#dateExpireDetail').html('');
                                        $('#statusDetail').html('');                $('#codeRetourDetail').html('');
                                        $('#datePayDetail').html('');               $('#sequenceDetail').html('');
                                        $('#motifRetourDetail').html('');

                                        $('#myModalLabelTitle').append(labelDetail + " : " +
                                                            $(this).parent().parent().children('.codeTransaction').attr('id') );
                                        $('#serviceCocaDetail').append($(this).parent().parent().children('.service').attr('id'));
                                        $('#acountSenderDetail').append($(this).parent().parent().children('.numeroCompte').attr('id'));
                                        $('#surnameSenderDetail').append($(this).parent().parent().children('.surnameSender').attr('id'));
                                        $('#nameSenderDetail').append($(this).parent().parent().children('.nameSender').attr('id'));
                                        $('#emailSenderDetail').append($(this).parent().parent().children('.emailSender').attr('id'));
                                        $('#mobileSenderDetail').append($(this).parent().parent().children('.mobileSender').attr('id'));
                                        $('#imeiSenderDetail').append($(this).parent().parent().children('.imeiSender').attr('id'));
                                        $('#accountReceiverDetail').append($(this).parent().parent().children('.accountReceiver').attr('id'));
                                        $('#surnameReceiverDetail').append($(this).parent().parent().children('.surnameReceiver').attr('id'));
                                        $('#nameReceiverDetail').append($(this).parent().parent().children('.nameReceiver').attr('id'));
                                        $('#countryReceiverDetail').append($(this).parent().parent().children('.countryReceiver').attr('id'));
                                        $('#bankReceiverDetail').append($(this).parent().parent().children('.bankReceiver').attr('id'));
                                        $('#amountDetail').append($(this).parent().parent().children('.amount').attr('id') + " XAF");
                                        $('#feeDetail').append($(this).parent().parent().children('.fee').attr('id') + " XAF");
                                        $('#dateCreationDetail').append($(this).parent().parent().children('.dateCreation').attr('id'));
                                        $('#dateExpireDetail').append($(this).parent().parent().children('.dateExpiration').attr('id'));
                                        $('#statusDetail').append($(this).parent().parent().children('.status').attr('id'));
                                        $('#codeRetourDetail').append($(this).parent().parent().children('.codeRetour').attr('id'));
                                        $('#datePayDetail').append($(this).parent().parent().children('.datePaiement').attr('id'));
                                        $('#sequenceDetail').append($(this).parent().parent().children('.sequence').attr('id'));
                                        $('#motifRetourDetail').append($(this).parent().parent().children('.motifRetour').attr('id'));

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
                var statusSearch = $('#statusSearch').val();
                var telephone = $('#phoneSearch').val();
                if(dateDebut == "" && dateFin == "" && statusSearch == "" && telephone == ""){
                    doShowError(labelVerifySearch);
                }
                else{
                    $('#btnsearch').attr("disabled", true);
                    getAllTransaction();
                    $('#btnsearch').attr("disabled", false);
                }
        });

        $("#dateDebut" ).keydown(function( event ) {
            if(event.keyCode == 13){
                var dateDebut = $('#dateDebut').val();
                var dateFin = $('#dateFin').val();
                var statusSearch = $('#statusSearch').val();
                var telephone = $('#phoneSearch').val();
                if(dateDebut == "" && dateFin == "" && statusSearch == "" && telephone == ""){
                    doShowError(labelVerifySearch);
                }
                else{
                    $('#btnsearch').attr("disabled", true);
                    getAllTransaction();
                    $('#btnsearch').attr("disabled", false);
                }
            }
        });

        $("#dateFin" ).keydown(function( event ) {
            if(event.keyCode == 13){
                var dateDebut = $('#dateDebut').val();
                var dateFin = $('#dateFin').val();
                var statusSearch = $('#statusSearch').val();
                var telephone = $('#phoneSearch').val();
                if(dateDebut == "" && dateFin == "" && statusSearch == "" && telephone == ""){
                    doShowError(labelVerifySearch);
                }
                else{
                    $('#btnsearch').attr("disabled", true);
                    getAllTransaction();
                    $('#btnsearch').attr("disabled", false);
                }
            }
        });

        $("#statusSearch" ).keydown(function( event ) {
            if(event.keyCode == 13){
                var dateDebut = $('#dateDebut').val();
                var dateFin = $('#dateFin').val();
                var statusSearch = $('#statusSearch').val();
                var telephone = $('#phoneSearch').val();
                if(dateDebut == "" && dateFin == "" && statusSearch == "" && telephone == ""){
                    doShowError(labelVerifySearch);
                }
                else{
                    $('#btnsearch').attr("disabled", true);
                    getAllTransaction();
                    $('#btnsearch').attr("disabled", false);
                }
            }
        });

        $("#phoneSearch" ).keydown(function( event ) {
            if(event.keyCode == 13){
                var dateDebut = $('#dateDebut').val();
                var dateFin = $('#dateFin').val();
                var statusSearch = $('#statusSearch').val();
                var telephone = $('#phoneSearch').val();
                if(dateDebut == "" && dateFin == "" && statusSearch == "" && telephone == ""){
                    doShowError(labelVerifySearch);
                }
                else{
                    $('#btnsearch').attr("disabled", true);
                    getAllTransaction();
                    $('#btnsearch').attr("disabled", false);
                }
            }
        });


        $("#exportPDF").click(function(){
            $( "#dateDebut").datepicker( "option", "dateFormat", "yy-mm-dd" );
            $( "#dateFin").datepicker( "option", "dateFormat", "yy-mm-dd" );
            var debut = $('#dateDebut').val();
            var fin = $('#dateFin').val();
            var telephone = $('#phoneSearch').val();
            var status = $('#statusSearch').val();
            window.location.href = "/bgfimoney/export/cocaTransactions?typeExport=pdf&debut=" + debut + "&fin=" + fin + "&telephone=" + telephone + "" + "&status=" + status + "";
            return false;
        });

        $("#exportXLS").click(function(){
            $( "#dateDebut").datepicker( "option", "dateFormat", "yy-mm-dd" );
            $( "#dateFin").datepicker( "option", "dateFormat", "yy-mm-dd" );
            var debut = $('#dateDebut').val();
            var fin = $('#dateFin').val();
            var telephone = $('#phoneSearch').val();
            var status = $('#statusSearch').val();
            window.location.href = "/bgfimoney/export/cocaTransactions?typeExport=xls&debut=" + debut + "&fin=" + fin + "&telephone=" + telephone + "" + "&status=" + status + "";
            return false;
        });


    });
