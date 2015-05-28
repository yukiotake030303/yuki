$('.datepicker').datepicker({
  format: 'yyyy/mm/dd',
  language: 'ja',       // カレンダー日本語化のため
});
					  
$('#form').validate({
  rules : {
    'newpcname' : { required : true },
    'newadmd' : { required : true },
    'newmavuf' : { required : true },
    'newmodels' : { required : true },
    'newpctype' : { required : true },
    'newos' : { required : true },
    'newlan' : { required : true },
    'newrmac' : { required : true },
    'newvirus' : { required : true },
    'newbuydate' : { required : true },
  },
  messages : {
    'newpcname' : { required : "pc名は必須です" },
    'newadmd' : { required : "管理部門は必須です" },
    'newmavuf' : { required : "メーカーは必須です" },
    'newmodels' : { required : "機種は必須です" },
    'newpctype' : { required : "PC型は必須です" },
    'newos' : { required : "OS詳細は必須です" },
    'newlan' : { required : "無線LANは必須です" },
    'newrmac' : { required : "登録MACは必須です" },
    'newvirus' : { required : "アンチウイルスは必須です" },
    'newbuydate' : { required : "購入時期は必須です" },
  },
submitHandler : function(form) {   
  $.ajax({
    url:'/admin/add/',
    type:'POST',
    datetype:'json',
    data:{newpcname:$('#newpcname').val(),
	      newadmd:$("#newadmd option:selected").text(),
		  newmavuf:$('#newmavuf').val(),
		  newmodels:$('#newmodels').val(),	
		  newpctype:$("input[name='newpctype']:checked").val(),
		  newos:$('#newos').val(),
		  newman:$('#newman').val(),
		  newyouto:$('#newyouto').val(),
		  newlan:$("input[name='newlan']:checked").val(),
		  newrmac:$('#newrmac').val(),
		  newvirus:$("input[name='newvirus']:checked").val(),
		  newspbuy:$('#newspbuy').val(),
		  newmaps:$('#newmaps').val(),
		  newother:$('#newother').val(),
		  newbuydate:$('#newbuydate').val()},
		  timeout: 5000,							
		  success: function(result){	
			$('#newpcname').val("");
			$('#newmavuf').val("");
			$('#newmodels').val("");
			$('#newos').val("");
			$('#newman').val("");
			$('#newyouto').val("");
			$('#newrmac').val("");
			$('#newspbuy').val("");
			$('#newmaps').val("");
			$('#newother').val("");
			$('#newbuydate').val("");    
	      for (i = 1; i <= 2; i++) {
		    document.getElementById('newpctype' + i).checked = false;																
			document.getElementById('newpctype' + 1).checked = true;
		  };
		  for (i = 1; i <= 3; i++) {
		  document.getElementById('newlan' + i).checked = false;
		  document.getElementById('newlan' + 1).checked = true;
		  };
		  for (i = 1; i <= 2; i++) {
		  document.getElementById('newvirus' + i).checked = false;
		  document.getElementById('newvirus' + 1).checked = true;
		  };
		  window.alert('PC名 : '+result.pcname+'\n'+'管理部門 : '+result.admd+'\n'+'メーカー : '+result.mavuf+'\n'+'機種 : '+result.models+'\n'+'PC型 : '+result.pctype+'\n'+'OS詳細 : '+result.os+'\n'+'常時使用者 : '+result.man+'\n'+'主要途 : '+result.youto+'\n'+'無線LAN : '+result.lan+'\n'+'登録MAC : '+result.rmac+'\n'+'アンチウイス : '+result.virus+'\n'+'別途購入 : '+result.spbuy+'\n'+'Microsoft Action Pack Subscription : '+result.maps+'\n'+'その他 : '+result.other+'\n'+'購入時期 : '+result.buydate+'\n'+'を新しく登録しました。')
		  },
		  error: function(){
		  $("#dv_"+result.id).html('サーバーエラーが発生しました。');
		  }
   });
 },
 showErrors: function (errorMap, errorList) {
   var summary = "確認してください:";
   $.each(errorList, function() {
     summary += " * " + this.message + "<br>" ;
   });
   $(".dv_").html(summary);
   this.defaultShowErrors();
 }
});

