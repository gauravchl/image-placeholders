window.iLayout = (function(){

  var _cHeight = 400;
  var _cWidth  = 400;

  var exports = {};


  // Return Crooped pixels
  // And crooped from: height/width
  var getFrameInfo = function(iWidth, iHeight, fWidth, fHeight){
    var result = {}
    var rw = (iWidth * (fHeight))/iHeight;
    if(rw >= fWidth){
      result.croopedPixel = rw - fWidth;
      result.constant  = "height";
    }else{
      /*Here rh will be always >= cHeight*/
      result.croopedPixel =((iHeight * fWidth)/iWidth) - fHeight;
      result.constant = "width";
    }
    return result
  }



  var oneImageLayout = function(images){
    var constant = getFrameInfo(images[0].width, images[0].height, _cWidth, _cHeight).constant;
    return {posA : {_id:images[0]._id, className:'ilayout l-1 pos-0 ' + constant } }
  }



  var twoImageLayout = function(images){
    var result = {};
    images[0].l2posA = getFrameInfo(images[0].width, images[0].height, _cWidth/2, _cHeight/2)
    images[1].l2posB = getFrameInfo(images[0].width, images[0].height, _cWidth/2, _cHeight/2)
    images[0].l3posA = getFrameInfo(images[0].width, images[0].height, _cWidth/2, _cHeight)
    images[1].l3posB = getFrameInfo(images[0].width, images[0].height, _cWidth/2, _cHeight)

    var layout2Score = images[0].l2posA.croopedPixel + images[1].l2posB.croopedPixel;
    var layout3Score = images[0].l3posA.croopedPixel + images[1].l3posB.croopedPixel;

    if(layout2Score < layout3Score){
        result.posA = {_id:images[0]._id, className:'ilayout l-2 pos-0 ' + images[0].l2posA.constant };
        result.posB = {_id:images[1]._id, className:'ilayout l-2 pos-1 ' + images[1].l2posB.constant };
        result.score = layout2Score;
    }else{
        result.posA = {_id:images[0]._id, className:'ilayout l-3 pos-0 ' + images[0].l3posA.constant }
        result.posB = {_id:images[1]._id, className:'ilayout l-3 pos-1 ' + images[1].l3posB.constant }
        result.score = layout3Score;
    }
    return result;
  }



  // There will be 3 layouts & total 9 possible combinations
  var threeImageLayout = function(images){
    var score = null;
    var result = {};

    for(var i = 0; i<3 ; i++){
      var hf1 = 0.5;
      var hf2 = 0.5;
      if(i==1){hf1 = 2/3; hf2 = 1/3}
      if(i==2){hf1 = 1/3; hf2 = 2/3}

      for(var j = 0; j<3; j++){
        var l = j % 3;
        var m = (j+1) % 3;
        var n = (j+2) % 3;

        var x1 =  getFrameInfo(images[l].width, images[l].height, _cWidth,   _cHeight*hf1);
        var x2 =  getFrameInfo(images[m].width, images[m].height, _cWidth/2, _cHeight*hf2);
        var x3 =  getFrameInfo(images[n].width, images[n].height, _cWidth/2, _cHeight*hf2);

        if(score == null || score > (x1.croopedPixel+x2.croopedPixel+x3.croopedPixel)){
          score = x1.croopedPixel + x2.croopedPixel + x3.croopedPixel;
          result.posA = {_id:images[l]._id, className:'ilayout l-'+(i+4)+' pos-0 '+ x1.constant };
          result.posB = {_id:images[m]._id, className:'ilayout l-'+(i+4)+' pos-1 '+ x2.constant };
          result.posC = {_id:images[n]._id, className:'ilayout l-'+(i+4)+' pos-2 '+ x3.constant };
          result.score = score;
        }
      }
    }
    return result;
  }



  exports.getLayout = function(images){
    var result = null;
    switch(images.length){
      case 1:
        result = oneImageLayout(images);
      break;
      case 2:
        result = twoImageLayout(images);
      break;
      case 3:
        result = threeImageLayout(images);
      break;
    }
    return result;
  }



  return exports;

})();
