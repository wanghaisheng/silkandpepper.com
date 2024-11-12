//$Id$
function getValue(p_n, ix){
	
	var q_s = '';
	if  (p_n == 'q'){
		var ref = document.referrer;
		if (ref != undefined) {
		q_s= ref.split('?')[1];
		}
	}
	else{
		try{
                   q_s = window.top.location.search.substring(1);
		}
		catch(e){
			q_s = '';
	    }
	}
	var pa_n = p_n +'='; 
	var p_v = '';
	if(q_s!=undefined && q_s.length > 0 ){
		begin = q_s.indexOf( pa_n );
		if ( begin != -1 ){
			begin += pa_n.length;end = q_s.indexOf( '&' , begin );
			if ( end == -1 ){
				end = q_s.length
			}
			p_v = q_s.substring( begin, end );
		}
	}
	if (p_v == undefined || p_v==''){
		p_v=g_c(GAd.indexValueArr[ix]);
	}
	if (p_v!=undefined){
		p_v = p_v.replace(/\+/g,' ');
	}
	return p_v;
}


GAd.prop=GAd.prop || [];
GAd.indexValueArr=new Array('gclid');
function GAd(){
 
}
GAd.prototype.initialize=function(){
	
	GAd.prop.push([GAd.indexValueArr[0],getValue(GAd.indexValueArr[0],0)]);
	//GAd.prop.push([GAd.indexValueArr[1],getValue(GAd.indexValueArr[1],1)]);
	//GAd.prop.push([GAd.indexValueArr[2],getValue(GAd.indexValueArr[2],2)]);
	for (var i=0;i<GAd.prop.length;i++){
		this.s_c(i);	
	}
	//this.s_Hid();
	
}
GAd.prototype.s_Hid=function(){
	
	var all_Frm = document.forms;
	
	for( var i = 0; i < all_Frm.length; i++ ) {
		var frm = all_Frm[i];
			for (var ii=0;ii<frm.length;ii++){
	
				if( frm.elements[ii].name == 'zc_gad' ) {
					
					var p = g_c(GAd.indexValueArr[0]);
					var hidEl = document.getElementsByName('zc_gad');
					if (hidEl){
						for (var idx =0 ; idx < hidEl.length; idx++ ){
							hidEl[idx].value = p;   
		                		}
					}
				
				}
			}
	}
}
GAd.prototype.s_c=function(index,path,domain,secure)
{
	value = GAd.prop[index];
	var c_str = GAd.indexValueArr[index] + "=" + escape( value[1] );
	var exp_d=30;
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+exp_d);
	c_str += "; expires=" + exdate.toGMTString();//No I18N
	//if ( path )
	c_str += "; path=/";//No I18N
	if ( domain ) {
		c_str += "; domain=" + escape( domain );//No I18N
	}
	if ( secure ) {
		c_str += "; secure";//No I18N
	}
	document.cookie = c_str;
}
new GAd().initialize();

function g_c(c_name){
        var cArr = document.cookie.split('; ');
        var cArrLen = cArr.length;
        for (var i = 0; i < cArrLen ; i++) {
                var cVals = cArr[i].split('=');
		if (cVals[0] === c_name && cVals[1]){
			return unescape(cVals[1]);
		}
        }
}

/* Iframe support goes here */
function IFrameSupport()
{
	
	var frm = document.getElementsByTagName("iframe");
	for(var i = 0; i < frm.length; ++i){
		
		if((frm[i].src).indexOf('formperma') > 0 ){
			var gclid = g_c(GAd.indexValueArr[0]);
			var src = frm[i].src;
			if(src.indexOf('?') > 0){
                              src = src+"&gclid="+gclid;//No I18N
			}else{
			      src = src+"?gclid="+gclid;//No I18N
			}
			frm[i].src = src;
		}else{
			var gclid = g_c(GAd.indexValueArr[0]);
			var src = frm[i].src;
		}	
	}
}
IFrameSupport();

/* JSPERMA support goes here */
function JSEmbedSupport(id) {
    document.getElementById('zforms_iframe_id').removeAttribute("onload"); 
    var frm11 = document.getElementById("zforms_iframe_id");
    var gclid = g_c(GAd.indexValueArr[0]);
    
    var src1 = frm11.src;
    if(src1.indexOf('?') > 0){
        src1 = src1+"&gclid="+gclid;//No I18N
    }else{
	src1 = src1+"?gclid="+gclid;//No I18N
    }
    frm11.src = src1;
}
/* Download Html support goes here */
function downloadHtmlGclid() {
	var gclid = g_c(GAd.indexValueArr[0]);
   	var fieldObj = document.forms.form.zc_gad;
   	if(fieldObj){
   		fieldObj.value = gclid;
   	}
}
downloadHtmlGclid();

