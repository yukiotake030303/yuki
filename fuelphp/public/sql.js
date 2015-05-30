function func(){

  $.ajax({
    url: '/mysql',
    type: 'POST',
    datatype:'json',
    data:{name:$('#name').val()},
    timeout: 5000,
    success: function(result1){
      var docs = result1.docs;
      var comments = result1.result;
      var msg = '<form id="fm_" onsubmit="return false;">';
          msg += '<input type="text" name="name" id="name1"><br>';
          msg += '<input type="text" name="age" id="age"><br>';
          msg += '<input type="submit" value="送信" id="add" onclick="\'/add/\'"><br></form>';
          msg += '<hr></hr>';
          msg += '<table><tbody id="table_id" border="1">';
          msg += '<tr><th>' + 'ID';
          msg += 'NAME';
          msg += 'AGE';
          msg += '更新';
          msg += '削除';
          msg += 'コメント入力';
          msg += '送信' + '</th></tr>';

      for (var i=0; i<docs.length; i++) {
        var doc = docs[i];
        doc.comments = [];
        doc.comments = comments.filter(function(comment){return comment.id1 == doc.id});
      }
      result = docs;
        for (var i=0; i<result.length; i++) {
          msg += '<tr id="tr_'+result[i].id+'" class="tr"><td id="td_'+result[i].id+'" class="td">';
          msg += '<form id="fm_'+result[i].id+'" onsubmit="return false;" class="form">';
          msg += '<input type="text" value='+result[i].id+' name=id id="id_'+result[i].id+'" class="id">';
          msg += '<input type="text" name=name value='+result[i].name+' id="name_'+result[i].id+'">';
          msg += '<input type="text" name=age value='+result[i].age+' id="age_'+result[i].id+'" >';
          msg += '<input type="submit" value=更新 id="up_'+result[i].id+'">';
          msg += '<input type="hidden" name=box value='+result[i].id+' ></form>';
          msg += '<form id="fmm_'+result[i].id+'" onsubmit="return false;">';
          msg += '<input type="hidden" value='+result[i].id+' name=id id="id_'+result[i].id+'">';
          msg += '<input type="hidden" name=name value='+result[i].name+' id="name_'+result[i].id+'">';
          msg += '<input type="hidden" name=age value='+result[i].age+' id="age_'+result[i].id+'" >';
          msg += '<input type="submit" value=削除  onclick="removefunc(\''+result[i].id+'\')" id="se_'+result[i].id+'"></form></td></tr>';
          msg += '<tr id="tr2_'+result[i].id+'" value='+result[i].id+'><td id="td2_'+result[i].id+'">';
          msg += '<form id="form_'+result[i].id+'" onsubmit="return false;">';
          msg += '<input type="text" name=comment1 id="comment1_'+result[i].id+'">';
          msg += '<input type="submit" value=送信  onclick="admfunc(\''+result[i].id+'\')" id="adder_'+result[i].id+'"></form></td></tr>';
          msg += '<tr id="tr3_'+result[i].id+'"><td id="td_'+result[i].id+'"></td></tr>';
        
          for(var k=result[i].comments.length-1; k>=0; k--){
            msg += '<tr id="tr1_'+result[i].comments[k].number+'" class="tr2"><td id="td1_'+result[i].comments[k].number+'" class="td2"><form id="form1_'+result[i].comments[k].number+'" onsubmit="return false;" class="form2">';
            msg += '<input type="hidden" name=number1 value='+result[i].comments[k].number+' id="number1_'+result[i].comments[k].number+'" class="number">';
            msg += '<input type="hidden" value='+result[i].comments[k].id1+' name=id1 id="id1_'+result[i].comments[k].number+'" >';
            msg += '<input type="text" name=comment value='+result[i].comments[k].comment+' id="comment_'+result[i].comments[k].number+'">';
            msg += '<input type="submit" value=更新 id="fm1_'+result[i].comments[k].number+'">';
            msg += '<input type="hidden" name=box1 value='+result[i].comments[k].number+'></form>';
            msg += '<form id="form2_'+result[i].comments[k].number+'" onsubmit="return false;">';
            msg += '<input type="hidden" name=number1 value='+result[i].comments[k].number+' id="number1_'+result[i].comments[k].number+'">';
            msg += '<input type="hidden" value='+result[i].comments[k].id1+' name=id1 id="id1_'+result[i].comments[k].number+'">';
            msg += '<input type="hidden" name=comment value='+result[i].comments[k].comment+' id="comment_'+result[i].comments[k].number+'">';
            msg += '<input type="submit" value=削除  onclick="deletefunc(\''+result[i].comments[k].number+'\')" id="se1_'+result[i].comments[k].number+'"></form></td></tr>';
          };
        };
          msg +='</tbody></table>';
        $('#msg').html(msg);


        for (var i=0; i<result.length; i++) {
          for(var k=result[i].comments.length-1; k>=0; k--){
            $("#form1_"+result[i].comments[k].number).validate({
              rules : {
                'comment' : { required : true }
              },
              message : {
                'comment' : { required : "年齢を入れましょう"}
              },
            submitHandler : function(form) {
              var id = $(form).find('input[name=box1]').val();
              $.ajax({
                url: '/mysql/upupup/'+id,
                type: 'POST',
                datetype:'json',
                data:{comment:$(form).find('input[name=comment]').val()},
                timeout: 5000,
                success: function(){
                       window.alert('更新が完了しました')
                },
                error: function(){
                  console.error();
                }
              });
            },
            showErrors: function(errorMap, errorList){
              var summary = "確認してください:";
              $.each(errorList, function() {
                summary += " * " + this.message + "<br>"
              });
              $("#tr1_"+result.id).html(summary);
                this.defaultShowErrors();
            }
            });
          }
        }
        for (var i=0; i<result.length; i++) {
          $("#fm_"+result[i].id).validate({
            rules : {
              'name' : { required : true },
              'age' : { required : true }
            },
            message : {
              'name' : { required : "名前が必須です" },
              'age' : { required : "年齢を入れましょう"}
            },
          submitHandler : function(form) {
            var id = $(form).find('input[name=box]').val();
            $.ajax({
              url: '/mysql/update/'+id,
              type: 'POST',
              datetype:'json',
              data:{name:$(form).find('input[name=name]').val(),
                     age:$(form).find('input[name=age]').val()},
              timeout: 5000,
              success: function(){
                window.alert('更新が完了しました')
              },
              error: function(){
                console.error();
               }
            });
          },
          showErrors: function(errorMap, errorList){
            var summary = "確認してください:";
            $.each(errorList, function() {
              summary += " * " + this.message + "<br>"
            });
            $("#tr_"+result.id).html(summary);
              this.defaultShowErrors();
          }
          });
        };
        $('#fm_').validate({
          rules : {
           'name' : { required : true }
          },
          messages: {
            'name'  : { required : "コメントを入れましょう" }
          },
          submitHandler : function(form) {
            $.ajax({
                url: '/mysql/add/',
               type: 'POST',
           datatype:'json',
               data:{ name:$(form).find('input[name=name]').val(),
                      age:$(form).find('input[name=age]').val()},
            timeout: 5000,
            success: function(result){
              $("#name1").val("")
              $("#age").val("")
              var table = document.getElementById("table_id");
              var child = document.createElement("tr");
              $(child).addClass("tr");
              var msg = '<td id="td_'+result.id+'" class="td">';
                  msg += '<form id="fm_'+result.id+'" onsubmit="return false;" class="form">';
                  msg += '<input type="text" name=id id="id_'+result.id+'" value='+result.id+' class="id">';
                  msg += '<input id="name_'+result.id+'" type="text" name=name value='+result.name+'>';
                  msg += '<input id="age_'+result.id+'" type="text" name=age value='+result.age+'>';
                  msg += '<input type="submit" value=更新 id="up_'+result.id+'">';
                  msg += '<input type="hidden" value='+result.id+' name=box></form>';
                  msg += '<form id="fmm_'+result.id+'" onsubmit="return false;">';
                  msg += '<input type="hidden" name=id id="id_'+result.id+'" value='+result.id+'>';
                  msg += '<input id="name_'+result.id+'" type="hidden" name=name value='+result.name+'>';
                  msg += '<input id="age_'+result.id+'" type="hidden" name=age value='+result.age+'>';
　　　　　     　 msg += '<input type="submit" value=削除 onclick="removefunc(\''+result.id+'\')" id="se_'+result.id+'"></form></td>';
                var komsg = '<tr id="tr2_'+result.id+'"><td id="td2_'+result.id+'">';      
                    komsg += '<form id="form_'+result.id+'" onsubmit="return false;">';
                    komsg += '<input type="text" name=comment1  id="comment1_'+result.id+'">';
                    komsg += '<input type="submit" value=送信  onclick="admfunc(\''+result.id+'\')" id="adder_'+result.id+'"></form></td></tr>';
                    komsg += '<tr id="tr3_'+result.id+'"><td id="td3_'+result.id+'"></td></tr>';
              child.id = "tr_"+result.id;        
              $(child).append(msg);
              $(table).append(child);
              $(child).after(komsg);

                $("#fm_"+result.id).validate({
                  rules : {
                    'name' : { required : true },
                     'age' : { required : true }
                  },
                  messages : {
                   'name' : { required : "名前が必須です" },
                   'age' : { required : "年齢を入れましょう" }
                  },
                submitHandler : function(form) {
                  var id = $(form).find('input[name=box]').val();
                  $.ajax({
                    url: '/mysql/update/'+id,
                    type: 'POST',
                    datatype:'json',
                    data:{name:$(form).find('input[name=name]').val(),
                           age:$(form).find('input[name=age]').val()},
                    timeout: 5000,
                    success: function(){
                      window.alert('更新が完了しました')
                    },
                    error: function(){
                      console.error();
                    }
                  });

                },
                showErrors: function(errorMap, errorList){
                  var summary = "確認してください:";
                  $.each(errorList, function() {
                    summary += " * " + this.message + "<br>"
                  });
                  $("#tr_"+result.id).html(summary);
                  this.defaultShowErrors();
                }
                });
            },
            error: function(){
            $("#tr_"+result.id).html('サーバーエラーが発生しました。');
            }
        });
        },
　　　　showErrors: function (errorMap, errorList) {
          var summary = "確認してください:";
          $.each(errorList, function() {
            summary += " * " + this.message + "<br>" ;
          });
          $("#div_").html(summary);
          this.defaultShowErrors();
        }
      });
    },
    error: function(){
      $("#msg").html('名前を入れてください');
    },
  });
};

function removefunc(id){
  $.ajax({
    url: '/mysql/remove/'+id,
 　 type: 'POST',
    datetype:'json',
    timeout: 5000,
    success: function(){
      $('#tr_'+id).remove();
    },
    error: function(){
      $('#tr_'+id).html('サーバーエラーが発生しました。');
    }
  });
};

function admfunc(id){
  $.ajax({
    url: '/mysql/adm/'+id,
    type: 'POST',
    datatype:'json',
    data:{ comment1 :$("#form_"+id).find("#comment1_"+id).val( },
    timeout: 5000,
    success: function(result){
      var comment1 = result.comment;
      var id = result.id1;
      var number2 = result.number;
      $("#comment1_"+id).val("");
        var child1 = document.getElementById("tr3_"+id);
        var tuika =  '<tr id="tr1_'+number2+'" class="tr2"><td id="td1_'+number2+'" class="td2">';
            tuika += '<form id="form1_'+number2+'" onsubmit="return false;" class="form2">';
            tuika += '<input type="hidden" name=number1 value="'+number2+'" id="number1_'+number2+'" class="number">';
            tuika += '<input type="hidden" value='+id+' name=id1 id="id1_'+number2+'">';
            tuika += '<input type="text" name=comment value="'+comment1+'" id="comment_'+number2+'">';
            tuika += '<input type="submit" value=更新 id="fm1_'+number2+'">';
            tuika += '<input type="hidden" name=box1 value='+number2+'></form>';
            tuika += '<form id="form2_'+number2+'" onsubmit="return false;">';
            tuika += '<input type="hidden" name=number1 value="'+number2+'" id="number1_'+number2+'">';
            tuika += '<input type="hidden" value='+id+' name=id1 id="id1_'+number2+'">';
            tuika += '<input type="hidden" name=comment value="'+comment1+'" id="comment_'+number2+'">';
            tuika += '<input type="submit" value=削除  onclick="deletefunc(\''+number2+'\')" id="se1_'+number2+'"></form></td></tr>';
      $(child1).after(tuika);

      $("#form1_"+number2).validate({
        rules : {
          'comment' : { required : true }
        },
        messages : {
          'comment' : { required : "コメントを入れましょう"}
        },
        submitHandler : function(form) {
          var id = $(form).find('input[name=box1]').val();
          $.ajax({
            url: '/mysql/upupup/'+number2,
            type: 'POST',
            datetype:'json',
            data: { comment:$(form).find('input[name=comment]').val()},
            timeout: 5000,
            success: function(){
              window.alert('更新が完了しました')
            },
            error: function(){
              console.error();
            }
          });
        },
        showErrors: function(errorMap, errorList){
          var summary = "確認してください:";
          $.each(errorList, function() {
            summary += " * " + this.message + "<br>"
          });
          $("#tr1_"+id).html(summary);
            this.defaultShowErrors();
        }
      });
    },
    error: function(){
        console.error();
    }
  });
};

function deletefunc(id){
  var number1 = $('#form2_'+id).find("#number1_"+id).val();
  $.ajax({
    url: '/mysql/delete/'+number1,
 　 type: 'POST',
    datetype:'json',
    timeout: 5000,
    success: function(result){
      $('#tr1_'+id).remove();
    },
    error: function(){
      $('#tr1_'+id).html('サーバーエラーが発生しました。');
    }
  });
};



                                                      
