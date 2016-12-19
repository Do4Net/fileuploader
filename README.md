# fileuploader
fileuploader 原生Ajax 无需插件、语义化标签可配置选择【文件大小、类型配置】、上传进度提示、事件触发机制、ES6<br/> <br/>
eg.
<br/>
&lt; button id="up" class="btn-primary"<br/>
		data-control="uploadfile" <br/>
		data-upload-btn="#up" <br/>
		data-upload-url="http://www.cschao.com/default/upload"  <br/>
		data-upload-max="10" <br/>
		data-show-process="#process"  <br/>
		data-show-before="#before" <br/>
		data-show-end="#fileWrap" &gt;上传文件&lt;/button&gt; <br/>
		&lt;div&gt; <br/>
			&lt;p id="before"&gt;</p&gt; <br/>
			&lt;p id="process"&gt;</p&gt; <br/>
			&lt;div id="fileWrap"&gt; <br/>
				&lt;p&gt;上传文件列表&lt;/p&gt; <br/>
			&lt;/div&gt; <br/>
		&lt;/div&gt; <br/>
