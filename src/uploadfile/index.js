import File from './file.js'; 
import $ from "jquery";

class UploadFileHanler{
	  
	constructor(){
		this.instance=$("[data-control='uploadfile']");
		if(this.instance==null||this.instance==undefined){
			console.log("can not find uploadfile control in this page!");
		}

		this.hasControl=true;
		var data=this.instance.data();
		this.file=new File(this.instance.val(),data.uploadMax,data.uploadUrl,null,data.showProcess,data.showBefore,data.showEnd,$); 
		this.bindingClickEvent(data.uploadBtn);
	}

	bindingClickEvent(btn){
		if(!this.hasControl){
			return;
		}
		var item=$(btn);
		if(item==null||this.instance==undefined){
			console.log(`can not find ${btn} item in this page!`);
		}
		//注意闭包
		(function(that){
			item.on("click",function(){
				that.handler();
			});
		})(this);
		 
	}

	beforeSend(){
		$(this.file.beforeStatusContainer).html("开始上传...");
	}

	uploading(pre){
		$(this.file.processStatusContainer).html(`当前上传进度为：${pre}%`);
	}

	callback(res){
		res=JSON.parse(res); 
		if(res && res.Code == 200){ 				 
			$(this.file.beforeStatusContainer).html("上传成功!");
			this.file.fileInput.remove();
		}else{
			console.log(`上传失败，原因：${res.Msg} ;错误码：${res.Code}`);
			return;
		}
			 
		for(var i=0; i<res.Data.length; i++){
			var p=$("<p></p>"); 
			let file = $("<a></a>");
			file.attr({"href":'//www.cschao.com/test/fileupload/' + res.Data[i].Path,"target":"_blank"});
			file.html("文件名：" + res.Data[i].Name)
			p.append(file);
			$(this.file.fileWrapStatusContainer).append(p);
		}
	}

	handler(){
		var that=this;
		if(!that.hasControl){
			return;
		}
		//Chrome7+	Firefox (Gecko) 4.0 (2.0)	Internet Explorer 10+	Opera 12+	Safari 5+
		var fd = new FormData();
		var input=that.file.createFileInput(); 
		input.trigger("click");
 		
 		that.file.bindingChange(function(input,fd){
 			if(that.beforeSend instanceof Function){
	            if(that.beforeSend() === false){
	                return false;
	            }
	        }

	        for(let i=0, file; file=input.files[i++];){
	        	console.log(fd)
				fd.append('file'+i, file);
			}

			that.ajax(fd);
 		},input) 
	}

	ajax(fd){
		var that=this;
		var xhr = new XMLHttpRequest();
		xhr.open('post', that.file.url);
		xhr.onreadystatechange = function(){
	    	if(xhr.status == 200){
	        	if(xhr.readyState == 4){
	            	if(that.callback instanceof Function){
	                	that.callback(xhr.responseText);
	            	}
	        	}
	    	}else{
	        	alert("上传失败！");
	    	}
		}
		xhr.upload.onprogress = function(event){
	    	var pre = Math.floor(100 * event.loaded / event.total);
	    	if(that.uploading instanceof Function){
	        	that.uploading(pre);
	    	}
		}

	 	xhr.send(fd);
	}

};

new UploadFileHanler();