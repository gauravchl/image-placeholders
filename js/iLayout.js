window.iLayout = (function(){

  var _cHeight = 350;
  var _cWidth  = 350;

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
    //var constant = getFrameInfo(images[0].iWidth, images[0].iHeight, _cWidth, _cHeight).constant;
    images[0].className = 'ilayout l-1 pos-0 width'
    return images;
  }



  var twoImageLayout = function(images){
    var l2posA = getFrameInfo(images[0].iWidth, images[0].iHeight, _cWidth/2, _cHeight/2)
    var l2posB = getFrameInfo(images[1].iWidth, images[1].iHeight, _cWidth/2, _cHeight/2)
    var l3posA = getFrameInfo(images[0].iWidth, images[0].iHeight, _cWidth,   _cHeight/2)
    var l3posB = getFrameInfo(images[1].iWidth, images[1].iHeight, _cWidth,   _cHeight/2)

    var layout2Score = l2posA.croopedPixel + l2posB.croopedPixel;
    var layout3Score = l3posA.croopedPixel + l3posB.croopedPixel;

    if(layout2Score < layout3Score){
        images[0].className = 'ilayout l-2 pos-0 ' + l2posA.constant;
        images[1].className = 'ilayout l-2 pos-1 ' + l2posB.constant;
    }else{
        images[0].className = 'ilayout l-3 pos-0 ' + l3posA.constant;
        images[1].className = 'ilayout l-3 pos-1 ' + l3posB.constant;
    }
    return images;
  }



  // There will be 3 layouts & total 9 possible combinations
  var threeImageLayout = function(images){
    var score = null;

    for(var i = 0; i<3 ; i++){
      var hf1 = hf2 = hf3 = 0.5;
      var wf1 = 1;
      var wf2 = wf3 = 0.5;
      if(i==1){hf1 = 2/3; hf2 = hf3 = 1/3;}
      if(i==2){hf1 = hf2 = 2/3; hf3 = 1/3; wf1 = wf2 = 0.5; wf3 = 1;}

      for(var j = 0; j<3; j++){
        var l = j % 3;
        var m = (j+1) % 3;
        var n = (j+2) % 3;

        var x1 =  getFrameInfo(images[l].iWidth, images[l].iHeight, _cWidth*wf1, _cHeight*hf1);
        var x2 =  getFrameInfo(images[m].iWidth, images[m].iHeight, _cWidth*wf2, _cHeight*hf2);
        var x3 =  getFrameInfo(images[n].iWidth, images[n].iHeight, _cWidth*wf3, _cHeight*hf3);

        if(score == null || score > (x1.croopedPixel+x2.croopedPixel+x3.croopedPixel)){
          score = x1.croopedPixel + x2.croopedPixel + x3.croopedPixel;
          images[l].className = 'ilayout l-'+(i+4)+' pos-0 '+ x1.constant;images[l].pos = 0;
          images[m].className = 'ilayout l-'+(i+4)+' pos-1 '+ x2.constant;images[m].pos = 1;
          images[n].className = 'ilayout l-'+(i+4)+' pos-2 '+ x3.constant;images[n].pos = 2;
        }
      }
    }
    return images.sort(function(a, b){return a.pos - b.pos});
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
