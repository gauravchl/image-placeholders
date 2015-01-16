/*Layout1 = 1 image*/
/*Layout2 = 2 images*/
/*Layout3 = 2 images*/
/*Layout4 = 3 image*/
/*Layout5 = 3 image*/
/*Layout6 = 3 image*/



$(document).ready(function(){

    totalHeight = 400;
    totalWidth  = 400;
	images = [];

	function readURL(file, index) {
	        var reader = new FileReader();

	        reader.onload = function (e) {
	        	var img = new Image();
	        	img.onload = function(){
                    id = newImgId();
	        		images.push({_id: id, img: e.target.result, width: this.width, height: this.height});
                    ele = $("<div class='img-container' data-id='"+id+"'><div class='btn-close' title='Remove Image'></div></div>").append(img);;
                    $('.input-images').append(ele);
	        	}
	        	img.src = e.target.result;

	        }
	        reader.readAsDataURL(file);
	}

    $("#file1").change(function () {
    	$.each(this.files,function(index, file){
	        readURL(file, index);
	    })
    });






    $('.input-images').on("click",".img-container .btn-close",function(e){
        ele = $(e.currentTarget);
        imgId = ele.parents('.img-container').attr('data-id')
        ele.parents('.img-container').remove()
        removeImage(imgId);

    });
    startCalc =  function(){

        $('.image-grid').remove();

        switch(images.length){
            case 1:
                oneImageLayout();
                break;
            case 2:
                /*Creating layout for 2 images*/
                twoImageLayout();
                break;
            case 3:
                /*Creating layout for 3 images*/
                threeImageLayout();

                break;
        }








    }


    /*A function for calculating croped pixel to fit images in container*/
    calcPixel = function(imgWidth, imgHeight, cWidth, cHeight){


            rw =(imgWidth * (cHeight))/imgHeight;
            if(rw >= cWidth){
                return rw - cWidth;
            }else{
                /*Here rh will be always >= cHeight*/
                rh =(imgHeight * cWidth)/imgWidth;
                return rh - cHeight;
            }


    }
    /*return a required property to set image on container, height or width*/
    calcProperty = function(imgWidth, imgHeight, cWidth, cHeight){
        rw =(imgWidth * (cHeight))/imgHeight;
            if(rw >= cWidth){
                return 'height="'+cHeight+'"';
            }else{
                /*Here rh will be always >= cHeight*/
                return 'width="'+cWidth+'"';


            }
    }

    oneImageLayout = function () {
        console.log(images[0].width);
        console.log(images[0].height);
        if (images[0].width > totalWidth || images[0].height > totalHeight){
            console.log(images[0].width);
            console.log(images[0].height);
            rw =(images[0].width * (totalHeight))/images[0].height;
            if(rw >= totalWidth){
            imgProperty = "width="+totalWidth;
            }else{
                /*Here rh will be always >= cHeight*/
                imgProperty = "height="+totalHeight;
            }
        }
        else{
           imgProperty = "";

        }

        layout1 = $('<div class="image-grid layout1"></div>');
        layout1.append('<a href="javascript:;"><div class="wrapper" style="max-width:'+totalWidth+'px;max-height:'+totalHeight+'px;"><img '+imgProperty+' style=""  src="'+images[0].img+'"></div></a>');
        $('section.main .row').prepend(layout1);

    }

    twoImageLayout= function(){

        /*Layout 2 score*/
        score1 = calcPixel(images[0].width, images[0].height, totalWidth, totalHeight/2) + calcPixel(images[1].width, images[1].height, totalWidth, totalHeight/2)
        /*Layout 3 score*/
        score2 = calcPixel(images[0].width, images[0].height, totalWidth/2, totalHeight/2) + calcPixel(images[1].width, images[1].height, totalWidth/2, totalHeight/2)


        layout2 = $('<div class="image-grid layout2"></div>')
        layout3 = $('<div class="image-grid layout2"></div>')

        layout2.append('<a href="javascript:;"><div class="wrapper" style="max-width:'+totalWidth+'px;max-height:'+totalHeight/2+'px;"><img '+calcProperty(images[0].width, images[0].height, totalWidth, totalHeight/2)+' style=""  src="'+images[0].img+'"></div></a>');
        layout2.append('<a href="javascript:;"><div class="wrapper" style="max-width:'+totalWidth+'px;max-height:'+totalHeight/2+'px;"><img '+calcProperty(images[1].width, images[1].height, totalWidth, totalHeight/2)+' style=""  src="'+images[1].img+'"></div></a>');
        layout2.append('<p>Score: '+score1+'</p>')

        layout3.append('<a href="javascript:;"><div class="wrapper" style="max-width:'+totalWidth/2+'px;max-height:'+totalHeight/2+'px;float:left;"><img '+calcProperty(images[0].width, images[0].height, totalWidth/2, totalHeight/2)+' style=""  src="'+images[0].img+'"></div></a>');
        layout3.append('<a href="javascript:;"><div class="wrapper" style="max-width:'+totalWidth/2+'px;max-height:'+totalHeight/2+'px;float:left;"><img '+calcProperty(images[1].width, images[1].height, totalWidth/2, totalHeight/2)+' style=""  src="'+images[1].img+'"></div></a>');
        layout3.append('<p>Score: '+score2+'</p>')

        $('section.main .row').prepend(layout2);
        $('section.main .row').prepend(layout3);

        if(score1 < score2){
            /*applyLayout(2);*/
        }else{
            /*applyLayout(3);*/
        }

    }

    threeImageLayout = function(){
        /*There are 3 layouts for three images Layout4, Layout5, Layout6*/

        /*First see all combination of layout 4*/
        totalImages = 3;

        for(var i=0;i<totalImages;i++){
            a=i;
            b=(i+1)%totalImages;
            c=(i+2)%totalImages;

            layout4 = $('<div class="image-grid layout4" style="max-width:'+totalWidth+'px;"></div>')

            layout4.append('<a href="javascript:;"><div class="wrapper" style="float:left;max-width:'+totalWidth+'px; max-height:'+totalHeight/2+'px;"><img '+calcProperty(images[a].width, images[a].height, totalWidth, totalHeight/2)+' style=""  src="'+images[a].img+'"></div></a>');
            layout4.append('<a href="javascript:;"><div class="wrapper" style="float:left;max-width:'+totalWidth/2+'px; max-height:'+totalHeight/2+'px;"><img '+calcProperty(images[b].width, images[b].height, totalWidth/2, totalHeight/2)+' style=""  src="'+images[b].img+'"></div></a>');
            layout4.append('<a href="javascript:;"><div class="wrapper" style="float:left;max-width:'+totalWidth/2+'px; max-height:'+totalHeight/2+'px;"><img '+calcProperty(images[c].width, images[c].height, totalWidth/2, totalHeight/2)+' style=""  src="'+images[c].img+'"></div></a>');

            score = calcPixel(images[a].width, images[a].height, totalWidth, totalHeight/2) + calcPixel(images[b].width, images[b].height, totalWidth/2, totalHeight/2) + calcPixel(images[c].width, images[c].height, totalWidth/2, totalHeight/2);
            layout4.append('<p>Score: '+score+'</p>')
            $('section.main .row').append(layout4);

        }
        $('section.main .row').append('<div class="clear"></div><br><br>');

        /*Now all Combination of layout 5*/
        for(var i=0;i<totalImages;i++){
            a=i;
            b=(i+1)%totalImages;
            c=(i+2)%totalImages;

            layout5 = $('<div class="image-grid layout5" style="max-width:'+totalWidth+'px;"></div>')

            layout5.append('<a href="javascript:;"><div class="wrapper" style="float:left;max-width:'+totalWidth+'px;max-height:'+totalHeight*2/3+'px;"><img '+calcProperty(images[a].width, images[a].height, totalWidth, totalHeight*2/3)+' style=""  src="'+images[a].img+'"></div></a>');

            layout5.append('<a href="javascript:;"><div class="wrapper" style="float:left;max-width:'+totalWidth/2+'px;max-height:'+totalHeight/3+'px;"><img '+calcProperty(images[c].width, images[c].height, totalWidth/2, totalHeight/3)+' style=""  src="'+images[c].img+'"></div></a>');
            layout5.append('<a href="javascript:;"><div class="wrapper" style="float:left;max-width:'+totalWidth/2+'px;max-height:'+totalHeight/3+'px;"><img '+calcProperty(images[b].width, images[b].height, totalWidth/2, totalHeight/3)+' style=""  src="'+images[b].img+'"></div></a>');

            score = calcPixel(images[a].width, images[a].height, totalWidth, totalHeight*2/3) + calcPixel(images[b].width, images[b].height, totalWidth/2, totalHeight/3) + calcPixel(images[c].width, images[c].height, totalWidth/2, totalHeight/3);
            layout5.append('<p>Score: '+score+'</p>')
            $('section.main .row').append(layout5);


        }
        $('section.main .row').append('<div class="clear"></div><br><br>');
        /*Now all Combination of layout 6*/
        for(var i=0;i<totalImages;i++){
            a=i;
            b=(i+1)%totalImages;
            c=(i+2)%totalImages;

            layout6 = $('<div class="image-grid layout6" style="max-width:'+totalWidth+'px;"></div>')

            layout6.append('<a href="javascript:;"><div class="wrapper" style="float:left;max-width:'+totalWidth/2+'px;max-height:'+totalHeight*2/3+'px;"><img '+calcProperty(images[a].width, images[a].height, totalWidth/2, totalHeight*2/3)+' style=""  src="'+images[a].img+'"></div></a>');
            layout6.append('<a href="javascript:;"><div class="wrapper" style="float:left;max-width:'+totalWidth/2+'px;max-height:'+totalHeight*2/3+'px;"><img '+calcProperty(images[b].width, images[b].height, totalWidth/2, totalHeight*2/3)+' style=""  src="'+images[b].img+'"></div></a>');
            layout6.append('<a href="javascript:;"><div class="wrapper" style="float:left;max-width:'+totalWidth+'px;max-height:'+totalHeight/3+'px;"><img '+calcProperty(images[c].width, images[c].height, totalWidth, totalHeight/3)+' style=""  src="'+images[c].img+'"></div></a>');

            score = calcPixel(images[a].width, images[a].height, totalWidth/2, totalHeight*2/3) + calcPixel(images[b].width, images[b].height, totalWidth/2, totalHeight*2/3) + calcPixel(images[c].width, images[c].height, totalWidth, totalHeight/3);
            layout6.append('<p>Score: '+score+'</p>')
            $('section.main .row').append(layout6);


        }

    }





    applyLayout = function(layout){
        $('.finalLayout').html('');
        switch(layout){
            case 1:break;
            case 2:
                $('.finalLayout').append('<a href="javascript:;"><div class="wrapper" style="max-width:'+totalWidth+'px;max-height:'+totalHeight/2+'px;"><img '+calcProperty(images[0].width, images[0].height, totalWidth, totalHeight/2)+' style=""  src="'+images[0].img+'"></div></a>');
                $('.finalLayout').append('<a href="javascript:;"><div class="wrapper" style="max-width:'+totalWidth+'px;max-height:'+totalHeight/2+'px;"><img '+calcProperty(images[1].width, images[1].height, totalWidth, totalHeight/2)+' style=""  src="'+images[1].img+'"></div></a>');
            break;
            case 3:
                $('.finalLayout').append('<a href="javascript:;"><div class="wrapper" style="max-width:'+totalWidth/2+'px;max-height:'+totalHeight/2+'px;float:left;"><img '+calcProperty(images[0].width, images[0].height, totalWidth/2, totalHeight/2)+' style=""  src="'+images[0].img+'"></div></a>');
                $('.finalLayout').append('<a href="javascript:;"><div class="wrapper" style="max-width:'+totalWidth/2+'px;max-height:'+totalHeight/2+'px;float:left;"><img '+calcProperty(images[1].width, images[1].height, totalWidth/2, totalHeight/2)+' style=""  src="'+images[1].img+'"></div></a>');

            break;

        }

    }

    $('.btn-apply').click(function(){startCalc();})

});

removeImage = function(id){

    images.forEach(function(img, index){
        if(img._id == id){
            images.splice(index, 1);
        }
    });

    for(var i=0; i< images.length; i++){
        if(images[i]._id == id){

        }
    }

}

newImgId = function(){
    if(images.length == 0){
        return 0;
    }else{
        return parseInt(images[images.length - 1]._id) + 1;
    }
}