Cmp.RelRastreamento = function () {

    var private = {

        render: function () {

            Cmp.createInput({
                id: 'inputPlaca',
                renderTo: '#divInputPlaca',
                label: 'Placa do veículo',
                width: '200px'
            });

            Cmp.createButton({
                id: 'btnBuscar',
                renderTo: '#divBtnConsultar',
                text: 'Buscar',
                handler: function () {
                    private.buscar();
                }
            });

            Cmp.createGrid({
                id: 'gridDadosRastreamento',
                renderTo: '#divCmpGridRastreamento',
                header: [
                    {
                        text: 'Placa',
                        field: 'placa',
                        width: 150
                    }, {
                        text: 'Funcionário',
                        field: 'funcionario',
                        width: 150

                    }, {
                        text: 'Data',
                        field: 'data',
                        width: 150

                    }, {
                        text: 'Vel. Max.',
                        field: 'vel_maxima',
                        width: 150
                    }, {
                        text: 'Vel.Reg.',
                        field: 'velocidade_registrada',
                        width: 150

                    }, {
                        text: 'Diff.Vel.',
                        field: 'diferenca_velocidade',
                        width: 150

                    }, {
                        text: 'Latitude',
                        field: 'latitude',
                        width: 150

                    }, {
                        text: 'Longitude',
                        field: 'longitude',
                        width: 150

                    }
                ]
            });

            Cmp.request({
                url: 'index.php?mdl=relRastreamento&file=ds_rastreamento.php',
                success: function (res) {
                    if (res.status == 'success') {
                        Cmp.get('gridDadosRastreamento').loadData(res.data);
                    } else {
                        Cmp.showErrorMessage(res.message || 'Ocorreu um erro na requisição');
                    }
                }
            })
        },

        buscar: function () {
            Cmp.showLoading();

            Cmp.request({
                url: 'index.php?mdl=relRastreamento&file=ds_rastreamento.php',
                params: {
                    placa: Cmp.get('inputPlaca').getValue()
                },
                success: function (res) {
                    Cmp.hideLoading();
                    if (res.status == 'success') {
                        Cmp.get('gridDadosRastreamento').loadData(res.data);
                    } else {
                        Cmp.showErrorMessage(res.message || 'Ocorreu um erro na requisição');
                    }
                }
            });
        }
    };

    this.init = function () {
        private.render();
    }

}