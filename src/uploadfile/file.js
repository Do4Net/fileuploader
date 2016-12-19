export default class File{
	
	constructor(name,max,url,size,processStatusContainer,beforeStatusContainer,fileWrapStatusContainer,$){
		this.name=name;
		this.max=max;
		this.url=url;
		this.size=0;
		this.processStatusContainer=processStatusContainer;
		this.beforeStatusContainer=beforeStatusContainer;
		this.fileWrapStatusContainer=fileWrapStatusContainer; 
		this.multiple=true;
		this.$=$;
		this.fd = new FormData();
	}
 
	checkSize(size){
		return size>this.max * 1024 * 1024;
	}

	checkFileType(type){ 
		var fileType = ['doc','docx','xls','xlsx','pdf','jpg','png','ppt','pptx','txt'];
		if(fileType.indexOf(type.toLocaleLowerCase()) == -1){
				console.log("暂不支持该类型的文件，请重新选择!");
			    return false;
		}
		return true;
	}

	createFileInput(){
		var random=(1+Math.random()).toString(16).substring(1);
		var input=this.$("<input type='file' name='file'>")
		input.attr({"id":"upload"+random}); 
		  if(this.multiple){
		 	input.attr('multiple', true);
		}
		this.$("body").append(input); 
		input.css({"display":"none"}); 
		this.fileInput=input;
		return input;
	}
 
	bindingChange(callback,input){
		var that=this;
		input.on("change",function(){ 
			if(input.val()==""){
				return;
			}
 
	        var type = input.val().split('.').pop();
			if(!that.checkFileType(type.toLocaleLowerCase())){
				alert("暂不支持该类型的文件，请重新选择!");
			    return;
			}
			var files=input[0].files;
			for(var i=0, file; file=files[i++];){

				if(that.checkSize(file.size)){
		        	alert('请上传小于'+that.max+'M的文件');
		            return;
		        }
		        that.size+=file.size;
			}

	        callback(input[0],that.fd); 
		});

		return input;
	}
}