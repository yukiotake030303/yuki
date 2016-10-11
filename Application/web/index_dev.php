<?php

require '../bootstrap.php';
require '../Controller/MiniBlogApplication.php';

$app = new MiniBlogApplication(true);
$app->run();
