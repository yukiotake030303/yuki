$(document).ready(function(){
$.ajax({
  url: '/admin/json',
  type: 'GET',
  datatype:'json',
  timeout: 5000,
  success: function(data){ 
    var result = data["result"];
    var msg = '<div id="div"><dl><dd style="width: 130px">';
        msg += 'PC名' + '</dd><dd style="width: 145px">';
        msg += '管理部門' + '</dd><dd style="width: 110px">';
        msg += 'メーカー' + '</dd><dd style="width: 150px">';
        msg += '機種' + '</dd><dd style="width: 50px; font-size:90%">';
        msg += 'PC型' + '</dd><dd style="width: 220px">';
        msg += 'OS詳細' + '</dd><dd style="width: 110px">';
        msg += '常時使用者' + '</dd><dd style="width: 110px">';
        msg += '主要途' + '</dd><dd style="width: 50px; font-size:80%">';
        msg += '無線LAN' + '</dd><dd style="width: 50px; font-size:70%">';
        msg += '登録MAC' + '</dd><dd style="width: 50px; font-size:80%">';
        msg += 'ｱﾝﾁｳｨﾙｽ' + '</dd><dd style="width: 220px">';
        msg += '追加ソフト' + '</dd><dd style="width: 200px; font-size:80%">';
        msg += 'Microsoft Action Pack Subscription' + '</dd><dd style="width: 150px">';
        msg += 'その他' + '</dd><dd style="width: 95px">';
        msg += '購入時期' + '</dd></dl>';
      for(var i=0; i<result.length; i++) {
	      msg += '<form id="form_'+result[i]._id+' style="display:inline"><dl id="dl_'+result[i]._id+'">';
	      msg += '<dd id="dd_'+result[i]._id+'" style="width: 130px"><input type="text" value="'+result[i].pcname+'" name=pcname id="pcname_'+result[i]._id+'" style="width: 127px"></dd>';
	      msg += '<dd style="width: 145px"><input type="text" value="'+result[i].admd+'" name=admd id="admd_'+result[i]._id+'" style="width: 142px"></dd>';
	      msg += '<dd style="width: 110px"><input type="text" value="'+result[i].mavuf+'" name=mavuf id="mavuf_'+result[i]._id+'" style="width: 107px"></dd>';
	      msg += '<dd style="width: 150px"><input type="text" value="'+result[i].models+'" name=models id="models_'+result[i]._id+'" style="width: 147px"></dd>';
	      msg += '<dd style="width: 50px"><input type="text" value="'+result[i].pctype+'" name=pctype id="pctype_'+result[i]._id+'" style="width: 47px"></dd>';
	      msg += '<dd style="width: 220px"><input type="text" value="'+result[i].os+'" name=os id="os_'+result[i]._id+'" style="width: 217px"></dd>';
	      msg += '<dd style="width: 110px"><input type="text" value="'+result[i].man+'" name=man id="man_'+result[i]._id+'" style="width: 107px"></dd>';
	      msg += '<dd style="width: 110px"><input type="text" value="'+result[i].youto+'" name=youto id="youto_'+result[i]._id+'" style="width: 107px"></dd>';
	      msg += '<dd style="width: 50px"><input type="text" value="'+result[i].lan+'" name=lan id="lan_'+result[i]._id+'" style="width: 47px"></dd>';
	      msg += '<dd style="width: 50px"><input type="text" value="'+result[i].rmac+'" name=rmac id="rmac_'+result[i]._id+'" style="width: 47px"></dd>';
	      msg += '<dd style="width: 50px"><input type="text" value="'+result[i].virus+'" name=virus id="virus_'+result[i]._id+'" style="width: 47px"></dd>';
	      msg += '<dd style="width: 220px"><input type="text" value="'+result[i].spbuy+'" name=spbuy id="spbuy_'+result[i]._id+'" style="width: 217px"></dd>';
	      msg += '<dd style="width: 200px"><input type="text" value="'+result[i].maps+'" name=maps id="maps_'+result[i]._id+'" style="width: 197px"></dd>';
    	  msg += '<dd style="width: 150px"><input type="text" value="'+result[i].other+'" name=other id="other_'+result[i]._id+'" style="width: 147px"></dd>';
        msg += '<dd style="width: 95px"><input type="text" value="'+result[i].buydate+'" name=buydate id="buydate_'+result[i]._id+'" style="width: 92px"></dd>';
	      msg += '<dd><input type="hidden" value="'+result[i]._id+'" name=box id="box_'+result[i]._id+'"></dd>';
        msg += '<dd><input type="submit" value="更新" id="update_'+result[i]._id+'"  class="btn btn-info btn-xs" style="display:inline"></dd></dl></form>';
	      msg += '<form id="form2_'+result[i]._id+'" style="display:inline">';
        msg += '<input type="submit" value="削除" onclick="removefunc(\''+result[i]._id+'\')"  class="btn btn-info btn-xs" id="remove">';
	      msg += '<input type="hidden" value="'+result[i]._id+'" name=id id="id_'+result[i]._id+'" style="width: 30px"></form>';
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
          message : {
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
	         var id = $("#box_"+result[i]._id).val();
	          $.ajax({
	            url: '/admin/update/'+id,
		          type: 'POST',
	            datatype: 'json',
	            data: {pcname:$('#pcname').val(),
		                   admd:$("#admd").val(),
                      mavuf:$('#mavuf').val(),
                     models:$('#models').val(),
                     pctype:$("#pctype").val(),
                         os:$('#os').val(),
                        man:$('#man').val(),
                      youto:$('#youto').val(),
                        lan:$("#lan").val(),
                       rmac:$('#rmac').val(),
                      virus:$("#virus").val(),
                      spbuy:$('#spbuy').val(),
                       maps:$('#maps').val(),
		 		              other:$('#other').val(),
                    buydate:$('#buydate').val()},
              timeout: 5000,
	            success: function(data){
                var result = data["result"];
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
       $('#dl_'+id).remove();
     },
     error: function(){
       $('#dl_'+id).html('サーバーエラーが発生しました。');
      }
   });
 };
