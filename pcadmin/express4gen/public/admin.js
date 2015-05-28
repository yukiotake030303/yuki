$(document).ready(function(){
$.ajax({
  url: '/admin/json',
  type: 'GET',
  datatype:'json',
  timeout: 5000,
  success: function(result){ 
    var msg = '<div id="div"><dl><dd style="width: 150px" class = "tag">';
        msg += 'PC名' + '</dd><dd style="width: 300px" class = "tag">';
        msg += '管理部門' + '</dd><dd style="width: 200px" class = "tag">';
        msg += 'メーカー' + '</dd><dd style="width: 200px" class = "tag">';
        msg += '機種' + '</dd><dd style="width: 50px; font-size:90%" class = "tag">';
        msg += 'PC型' + '</dd><dd style="width: 250px" class = "tag">';
        msg += 'OS詳細' + '</dd><dd style="width: 200px" class = "tag">';
        msg += '常時使用者' + '</dd><dd style="width: 200px" class = "tag">';
        msg += '主要途' + '</dd><dd style="width: 50px; font-size:80%" class = "tag">';
        msg += '無線LAN' + '</dd><dd style="width: 150px;" class = "tag">';
        msg += '登録MAC' + '</dd><dd style="width: 50px; font-size:80%" class = "tag">';
        msg += 'ｱﾝﾁｳｨﾙｽ' + '</dd><dd style="width: 350px" class = "tag">';
        msg += '追加ソフト' + '</dd><dd style="width: 350px" class = "tag">';
        msg += 'Microsoft Action Pack Subscription' + '</dd><dd style="width: 600px" class = "tag">';
        msg += 'その他' + '</dd><dd style="width: 95px" class = "tag">';
        msg += '購入時期' + '</dd></dl>';
      for(var i=0; i<result.length; i++) {
        msg += '<form id="form_'+result[i]._id+'" onsubmit="return false;">';
        msg += '<dl id="dl_'+result[i]._id+'">';
	      msg += '<dd id="dd_'+result[i]._id+'" style="width: 150px border-left: 4px solid #ddd;"><input type="text" value="'+result[i].pcname+'" name=pcname id="pcname_'+result[i]._id+'" style="width: 147px"></dd>';
	      msg += '<dd style="width: 300px"><input type="text" value="'+result[i].admd+'" name=admd id="admd_'+result[i]._id+'" style="width: 297px"></dd>';
	      msg += '<dd style="width: 200px"><input type="text" value="'+result[i].mavuf+'" name=mavuf id="mavuf_'+result[i]._id+'" style="width: 197px"></dd>';
	      msg += '<dd style="width: 200px"><input type="text" value="'+result[i].models+'" name=models id="models_'+result[i]._id+'" style="width: 197px"></dd>';
	      msg += '<dd style="width: 50px"><input type="text" value="'+result[i].pctype+'" name=pctype id="pctype_'+result[i]._id+'" style="width: 47px"></dd>';
	      msg += '<dd style="width: 250px"><input type="text" value="'+result[i].os+'" name=os id="os_'+result[i]._id+'" style="width: 247px"></dd>';
	      msg += '<dd style="width: 200px"><input type="text" value="'+result[i].man+'" name=man id="man_'+result[i]._id+'" style="width: 197px"></dd>';
	      msg += '<dd style="width: 200px"><input type="text" value="'+result[i].youto+'" name=youto id="youto_'+result[i]._id+'" style="width: 197px"></dd>';
	      msg += '<dd style="width: 50px"><input type="text" value="'+result[i].lan+'" name=lan id="lan_'+result[i]._id+'" style="width: 47px"></dd>';
	      msg += '<dd style="width: 150px"><input type="text" value="'+result[i].rmac+'" name=rmac id="rmac_'+result[i]._id+'" style="width: 147px"></dd>';
	      msg += '<dd style="width: 50px"><input type="text" value="'+result[i].virus+'" name=virus id="virus_'+result[i]._id+'" style="width: 47px"></dd>';
	      msg += '<dd style="width: 350px"><input type="text" value="'+result[i].spbuy+'" name=spbuy id="spbuy_'+result[i]._id+'" style="width: 347px"></dd>';
	      msg += '<dd style="width: 350px"><input type="text" value="'+result[i].maps+'" name=maps id="maps_'+result[i]._id+'" style="width: 347px"></dd>';
    	  msg += '<dd style="width: 600px"><input type="text" value="'+result[i].other+'" name=other id="other_'+result[i]._id+'" style="width: 597px"></dd>';
        msg += '<dd style="width: 95px"><input type="text" value="'+result[i].buydate+'" name=buydate id="buydate_'+result[i]._id+'" style="width: 92px"></dd>';
	      msg += '<dd><input type="hidden" value="'+result[i]._id+'" name=box id="box_'+result[i]._id+'"></dd>';
        msg += '<dd><input type="submit" value="更新" id="update_'+result[i]._id+'"  class="btn btn-info btn-xs" style="display:inline"></dd>';
        msg += '<dd><input type="button" value="削除" onclick="removefunc(\''+result[i]._id+'\')"  class="btn btn-info btn-xs"></dd></dl></form>';
	    }
      msg += '</div></form>';
      $('#msg').html(msg);

      for (var i=0; i<result.length; i++) {
        $("#form_"+result[i]._id).validate({
          rules : {
            'pcname' : { required : true },
            'admd' : { required : true },
            'mavuf' : { required : true },
            'models' : { required : true },
            'pctype' : { required : true },
            'os' : { required : true },
            'lan' : { required : true },
            'rmac' : { required : true },
            'virus' : { required : true },
            'buydate' : { required : true },
          },
          messages : {
	          'pcname' : { required : "PC名は必須です"},
            'admd' : { required : "管理部門名は必須です"},
		        'mavuf' : { required : "メーカーは必須です"},
            'models' : { required : "機種は必須です"},
            'pctype' : { required : "PC型は必須です"},
		        'os' : { required : "OS詳細は必須です"},
		        'lan' : { required : "無線LANは必須です"},
            'rmac' : { required : "登録MACは必須です"},
            'virus' : { required : "アンチウイルスは必須です"},
            'buydate' : { required : "購入時期は必須です"},
          },
          submitHandler : function(form) {
            var id = $(form).find('input[name=box]').val();
            var date = $(form).find('input[name=buydate]').val();
            console.log(date);
	          $.ajax({
	            url: '/admin/update/'+id,
		          type: 'POST',
	            datatype: 'json',
	            data: {pcname:$(form).find('input[name=pcname]').val(),
		                   admd:$(form).find('input[name=admd]').val(),
                      mavuf:$(form).find('input[name=mavuf]').val(),
                     models:$(form).find('input[name=models]').val(),
                     pctype:$(form).find('input[name=pctype]').val(),
                         os:$(form).find('input[name=os]').val(),
                        man:$(form).find('input[name=man]').val(),
                      youto:$(form).find('input[name=youto]').val(),
                        lan:$(form).find('input[name=lan]').val(),
                       rmac:$(form).find('input[name=rmac]').val(),
                      virus:$(form).find('input[name=virus]').val(),
                      spbuy:$(form).find('input[name=spbuy]').val(),
                       maps:$(form).find('input[name=maps]').val(),
		 		              other:$(form).find('input[name=other]').val(),
                    buydate:$(form).find('input[name=buydate]').val()},
              timeout: 5000,
	            success: function(result){  
                window.alert('PC名 : '+result.pcname+'\n'+'管理部門 : '+result.admd+'\n'+'メーカー : '+result.mavuf+'\n'+'機種 : '+result.models+'\n'+'PC型 : '+result.pctype+'\n'+'OS詳細 : '+result.os+'\n'+'常時使用者 : '+result.man+'\n'+'主要途 : '+result.youto+'\n'+'無線LAN : '+result.lan+'\n'+'登録MAC : '+result.rmac+'\n'+'アンチウイス : '+result.virus+'\n'+'追加ソフト: '+result.spbuy+'\n'+'Microsoft Action Pack Subscription : '+result.maps+'\n'+'その他 : '+result.other+'\n'+'購入時期 : '+result.buydate+'\n'+'を新しく更新しました。');
              },
	            error: function(){
	              console.error();
	            }
            });
          },
	        showerrors : function(errorMap, errorList){
	          var summary = "確認してください:";
	          $.each(errorList, function() {
              summary += " * " + this.message + "<br>"
            });
            $("#dd_"+result.id).html(summary);
            this.defaultShowErrors();
          }
        });
      };
  },
  error: function(){
    $("#dl_"+result._id).html('サーバーエラーが発生しました。');
  }
 });
 });

 function removefunc(id){
   $.ajax({
     url: '/admin/remove/'+id,
     type: 'POST',
     datetype:'json',
     timeout: 5000,
     success: function(){
       $('#form_'+id).remove();
      },
     error: function(){
       $('#dl_'+id).html('サーバーエラーが発生しました。');
      }
   });
 };
