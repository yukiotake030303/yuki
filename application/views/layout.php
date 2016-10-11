<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset="utf-8" />
    <title><?php if (isset($title)): echo $this->escape($title) . ' - '; endif; ?>MINI BLOG</title>
</head>
<body>
    <div id="header">
        <h1><a href="<?php echo $base_url; ?>/">MINI BLOG</a></h1>
    </div>

    <div id="main">
	<?php echo $_content; ?>
    </div>
</body>
</html>
