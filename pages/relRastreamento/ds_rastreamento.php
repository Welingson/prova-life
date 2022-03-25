<?php

$where = 'WHERE v.vel_maxima < r.velocidade_registrada';

if(!empty($_REQUEST['placa'])) {
    $where = "WHERE v.placa LIKE '%{$_REQUEST['placa']}%' AND v.vel_maxima < r.velocidade_registrada";
}

$db = new Database();

if($db->connect()) {

    $dados = $db->sqlQueryArray(
        "SELECT v.placa, f.nome AS funcionario, r.created_at AS data, v.vel_maxima, r.velocidade_registrada, ST_X(coordenadas) AS latitude, ST_Y(coordenadas) AS longitude FROM rastreamento r INNER JOIN funcionario f ON f.id = r.funcionario_id INNER JOIN veiculo v ON v.id = r.veiculo_id
        {$where}"
    );

    foreach ($dados as $d => $value) {
        $dados[$d]['diferenca_velocidade'] = porcentageSpeedDiff($dados[$d]['vel_maxima'], ($dados[$d]['velocidade_registrada'] - $dados[$d]['vel_maxima']));
    }

    echo json_encode(array(
        'status' => 'success',
        'data' => $dados
    ));

} else {
    echo json_encode(array(
        'status' => 'failure',
        'message' => 'Erro ao conectar ao banco'
    ));
}