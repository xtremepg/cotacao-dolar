$(document).ready(function() {
    $('#dataDaCotacao').mask('00-00-0000');

    obterCotacaoDoDolar();

    setInterval(function() { obterCotacaoDoDolar() }, 60000);

    $('#dataDaCotacao').blur(function() {
        obterCotacaoDoDolar();
    });

    $('.datepicker').datepicker({
        uiLibrary: 'bootstrap4'
    });
});

function obterCotacaoDoDolar() {

    var dataCotacao = obterDataAtualFormatada();

    var url = montarUrl(dataCotacao);

    $.get(url, function(response) {
        var cotacao = response.value[0];
        if (cotacao !== null && typeof cotacao !== 'undefined') {
            $('#valor-dolar-venda').html(cotacao.cotacaoVenda);
            $('#valor-dolar-compra').html(cotacao.cotacaoCompra);
        } else {
            obterCotacaoDoDolar();
        }
    });
}

function obterDataAtualFormatada() {

    var dataCustomizada = $('#dataDaCotacao').val().replace('/\//gm', '-');

    if (dataCustomizada === '') {
        var d = new Date();
        var month = d.getMonth() + 1;
        var day = d.getDate();

        dataCustomizada = (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day + '-' + d.getFullYear();
        $('#dataDaCotacao').val(dataCustomizada);
    }

    return dataCustomizada;

}

function montarUrl(dataCotacao) {
    return "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='" + dataCotacao + "'&$top=100&$format=json";
}