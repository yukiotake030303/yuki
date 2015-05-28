 var express = require('express');
 var router = express.Router();
 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;
 var adminSchema = new Schema({
   'pcname' : String,  
   'admd' : String,
   'mavuf' : String,
   'models' : String,
   'pctype' : String,
   'os' : String,
   'man' : String,
   'youto' : String,
   'lan' : String,
   'rmac' : String,
   'virus' : String,
   'spbuy' : String,
   'maps' : String,
   'other' : String,
   'buydate' : Date,
 });

 var admin = mongoose.model('admin', adminSchema);
 mongoose.connect('mongodb://localhost/mydb',function(err) {
   if(err){
     console.log(err);
   } 
 });

 router.get('/', function(req,res){
   admin.find({},function(err,docs){
     if(err){
      console.log(err);
     } 
     res.render('admin',{
       title : 'PC管理表',
     });
   });
 });

 router.get('/json', function(req,res){
 var datas = [];
   admin.find({},function(err,result){
     if(err){
       console.log(err);
    }
   for (var i=0; i<result.length; i++) {
      var buydate = result[i]['buydate'];
      var stringbuydate = changestring(buydate);
      var data = new Object({
        '_id'  :  result[i]['_id'],
       'pcname' : result[i]['pcname'],
       'admd' : result[i]['admd'],
       'mavuf' : result[i]['mavuf'],
       'models' : result[i]['models'],
       'pctype' : result[i]['pctype'],
       'os' : result[i]['os'],
       'man' : result[i]['man'],
       'youto' : result[i]['youto'],
       'lan' : result[i]['lan'],
       'rmac' : result[i]['rmac'],
       'virus' : result[i]['virus'],
       'spbuy' : result[i]['spbuy'],
       'maps' : result[i]['maps'],
       'other' : result[i]['other'],
       'buydate' : stringbuydate
      });
      datas.push(data);
     }; 
      res.send(datas);
  });
 });

 router.post('/update/:id', function(req,res){
   var id = req.params.id;
   var pcname = req.body.pcname;
   var admd = req.body.admd;
   var mavuf = req.body.mavuf;
   var models = req.body.models;
   var pctype = req.body.pctype;
   var os = req.body.os;
   var man = req.body.man;
   var youto = req.body.youto;
   var lan = req.body.lan;
   var rmac = req.body.rmac;
   var virus = req.body.virus;
   var spbuy = req.body.spbuy;
   var maps = req.body.maps;
   var other = req.body.other;
   var buydate = req.body.buydate;
  
   admin.findOne({
     '_id' : id
   },function(err, doc){
     if(err){
       console.log(err);
     }
     doc.pcname = pcname;
     doc.admd = admd;
     doc.mavuf = mavuf;
     doc.models = models;
     doc.pctype = pctype;
     doc.os = os;
     doc.man = man;
     doc.youto = youto;
     doc.lan = lan;
     doc.rmac = rmac;
     doc.virus = virus;
     doc.spbuy = spbuy;
     doc.maps = maps;
     doc.other = other;
     doc.buydate = buydate;
     doc.save(function(err, result){
       if(err){
        console.log(err);
       }
      var buydate = result['buydate'];
      var Stringbuydate = changestring(buydate);
      var data = new Object({
        '_id'   : result['id'],
       'pcname' : result['pcname'],
       'admd' : result['admd'],
       'mavuf' : result['mavuf'],
       'models' : result['models'],
       'pctype' : result['pctype'],
       'os' : result['os'],
       'man' : result['man'],
       'youto' : result['youto'],
       'lan' : result['lan'],
       'rmac' : result['rmac'],
       'virus' : result['virus'],
       'spbuy' : result['spbuy'],
       'maps' : result['maps'],
       'other' : result['other'],
       'buydate' : Stringbuydate,
      });
      res.send(data);
     });
   });
 });

 router.post('/remove/:id', function(req, res){
   var id = req.params.id;
   admin.findOne({
     '_id' : id
   }, function(err, doc) {
        if(err){
          console.log(err);
        }
        doc.remove(function(err) {
          if(err){
            console.log (err);
          }
          res.json({
            result: true
          });
        });
   });
 });

 router.get('/edit', function(req, res){
   res.render('add',{
	   title:'PC管理表',
	   subtitle:'新規登録画面',
	 });
 });
  
 router.post('/add', function(req, res){
   var newpcname = req.body.newpcname;
	 var newadmd = req.body.newadmd;
   var newmavuf = req.body.newmavuf;
   var newmodels = req.body.newmodels;
   var newpctype = req.body.newpctype;
   var newos = req.body.newos;
   var newman = req.body.newman;
   var newyouto = req.body.newyouto;
   var newlan = req.body.newlan;
   var newrmac = req.body.newrmac;
   var newvirus = req.body.newvirus;
   var newspbuy = req.body.newspbuy;
   var newmaps = req.body.newmaps;
   var newother = req.body.newother;
   var newbuydate = req.body.newbuydate;
	 var docs = new admin({
    'pcname' : newpcname,
    'admd' : newadmd,
    'mavuf' : newmavuf,
    'models' : newmodels,
    'pctype' : newpctype,
    'os' : newos,
    'man' : newman,
    'youto' : newyouto,
    'lan' : newlan,
    'rmac' : newrmac,
    'virus' : newvirus,
    'spbuy' : newspbuy,
    'maps' : newmaps,
    'other' : newother,
	   'buydate' : newbuydate
   });
   docs.save(function(err, result) {
     if (err){
       console.log(err);
     }
     var buydate = result['buydate'];
     var stringbuydate = changestring(buydate);
     var data = new Object({
       'pcname' : newpcname,
       'admd' : newadmd,
       'mavuf' : newmavuf,
       'models' : newmodels,
       'pctype' : newpctype,
       'os' : newos,
       'man' : newman,
       'youto' : newyouto,
       'lan' : newlan,
       'rmac' : newrmac,
       'virus' : newvirus,
       'spbuy' : newspbuy,
       'maps' : newmaps,
       'other' : newother,
       'buydate' : stringbuydate,
     });
     res.send(data);
	 });
 });

 function changestring(buydate){
   var numberyear = buydate.getFullYear();
   var year = numberyear + "";
   var numbermonth = buydate.getMonth()+1;
   var month = numbermonth + "";
   var numberdate = buydate.getDate();
   var date = numberdate + "";
   var Stringbuydate =  '' + year + '/' + month + '/' + date + '';
   return Stringbuydate;
}

module.exports = router;
