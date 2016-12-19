# fileuploader
fileuploader 原生Ajax 无需插件、语义化标签可配置选择【文件大小、类型配置】、上传进度提示、事件触发机制、ES6
<button id="up" class="btn-primary"
		data-control="uploadfile"
		data-upload-btn="#up"
		data-upload-url="http://fx.utour.com/default/upload" 
		data-upload-max="10"
		data-show-process="#process" 
		data-show-before="#before"
		data-show-end="#fileWrap" >上传文件</button>
		<div>
			<p id="before"></p>
			<p id="process"></p>
			<div id="fileWrap">
				<p>上传文件列表</p>
			</div>
		</div>
