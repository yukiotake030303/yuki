<?php

require '../bootstrap.php';
require '../MiniBlogApplication.php';
require '../controllers/AccountController.php';

$app = new MiniBlogApplication(true);
$app->run();
