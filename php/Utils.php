<?php

function JSRequire($module, $file)
{
    echo "<script type=\"text/javascript\" src=\"pages/$module/js/$file\"></script>";
}

function porcentageSpeedDiff($valueBase, $value)
{
    return round($value / $valueBase * 100)."%";
}
