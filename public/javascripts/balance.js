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
          getBalance();
          function getBalance(page) {
            $('#tbodyBalance').html('');
            $(".imload").fadeIn("1000");
            $('#pagingTop').html('');
            $('#pagingBottom').html('');
            $('#divPaginationhaut').empty();
            $('#divPaginationhaut').removeData("twbs-pagination");
            $('#divPaginationhaut').unbind("page");
            $('#divPagination').empty();
            $('#divPagination').removeData("twbs-pagination");
            $('#divPagination').unbind("page");
            jsRoutes.controllers.BalanceController.getAll(page).ajax({
                success: function (data) {
                    if (data.result == "ok") {
                         console.log(data)
                        var balances = data.balances;
                        var numLine = (data.per_page * data.current_page) - data.per_page;
                        if (data.current_page == -1){numLine = 0}
                         for (var i in balances) {
                            var html = '';
                            numLine += 1;
                            html += '<tr">';
                            html += '<td>' + numLine + '</td>';
                            html += '<td>' + balances[i].idSession +  '</td>';
                            html += '<td>' + balances[i].agence+ '</td>';
                            html += '<td>' + balances[i].devise+ '</td>';
                            html += '<td>' + balances[i].compte+ '</td>';
                            html += '<td>' + balances[i].solde+ '</td>';
                            html += '<td>' + balances[i].soldeContreValeur+ '</td>';
                            html += '<td>' + balances[i].taux+ '</td>';
                            html += '<td>' + balances[i].chapitre+ '</td>';
                            html += '<td>' + balances[i].client+ '</td>';
                            /*html += '<td><button type="button" class="btn btn-danger btn-icon btn-xs line_button" data-toggle="modal" data-target="#updateAttribut" id="line_action-'+balances[i].idSession+'"> Modifier <i class="fa fa-fire"></i> </button></td>';
                            html += '<td><button type="button" class="btn btn-black btn-xs line_supp" id="line_supp-'+balances[i].idSession+'"><i class="fa fa-trash"></i> </button></td>';
*/
                            html += '</tr>';
                            $('#tbodyBalance').append(html);
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
                                    getBalance(page);
                                }
                            });
                            $('#divPagination').twbsPagination({
                                totalPages: data.total_page,
                                visiblePages: 3,
                                startPage: page,
                                onPageClick: function (event, numPage2) {
                                    page = numPage2;
                                    getBalance(page);
                                }
                            });

                        /*$(".line_supp")
                            .click(
                            function() {
                            var id = $(this).attr('id');
                            var sp = id.split('-');
                            console.log(sp);

                            var reponse = window.confirm("Souhaitez-vous vraiment supprimer cet Attribut ?");
                                if(reponse)
                                {
                                   deleteAttribut(sp[1]);
                                }
                          });

                        $(".line_button")
                            .click(
                            function() {
                            var id = $(this).attr('id');
                            var sp1 = id.split('-');
                            console.log("id---",sp1[1])
                             showAttribut(sp1[1]);
                            $('#id_selected_attribut').val(sp1[1]);
                        });*/



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

});