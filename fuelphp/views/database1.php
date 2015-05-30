<?php if (isset($html_error)): ?>
<?php echo $html_error; ?>
<?php endif; ?>

<div id="content">
        <div id='text'></div>
        <div id='message'></div>
</div>
<p id="msg"></p>
<?php echo Form::open(array('onsubmit' => "return false;", 'method' => 'post')); ?>
<p>
<?php echo Form::label('名前', 'name') ?>
<?php echo Form::input('namedesu', Input::post('name'), array('id' => "name")); ?>
</p>
<div class="actions">
<?php echo  Form::submit('name', 'Ajax', array('onclick' => 'func();')); ?>
</div>
<?php echo Form::close(); ?>





