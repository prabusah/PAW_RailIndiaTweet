
$(document).ready(function(){
	var mins = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('Name'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: ministries
	});
	var jsonData = null;
	mins.initialize();
	$('.typeahead').typeahead(
	    null, {
	    name: 'mins',
	    displayKey: 'Name',
	    source: mins.ttAdapter()
	}).on('typeahead:selected', function(event, data){
	  jsonData = data;
	  $('.ministry').val(data.Ministry);
	  $('.cm').val(data.CM);
	  $.each(data.Zones, function (key, value) {
            $("#dropDownZones").append($('<option></option>').val(value).html(key));
      });
      $("#tweetContent").append(data.Ministry).append(" ").append(data.CM);
	});
	
	$( "#dropDownZones" ).change(function() {
  		var selectedZone = $("#dropDownZones :selected").text();
  		$.each(jsonData.Zones, function (key, value) {
            if(key === selectedZone) {
            	$('.gm').val(value.gm);
            	$("#dropDownDRMS").html("");
            	$("#dropDownDRMS").append($('<option></option>').val("None").html("Select Division"));
            	for(var i=0;i< value.drms.length; i++){
            		var obj = value.drms[i];
            		$("#dropDownDRMS").append($('<option></option>').val(obj.handle).html(obj.city));
            	}
            	$("#tweetContent").append(" ").append(value.gm);	
            }
      	});
	});
	$( "#dropDownDRMS" ).change(function() {
  		var drm = $("#dropDownDRMS :selected").val();
    	$('.drm').val(drm);
    	$("#tweetContent").append(" ").append(drm);
	});
	$( "#dropdownType" ).change(function() {
		var type = $("#dropdownType :selected").val();
		$("#tweetContent").append(" ").append(type);
	});	

	$("#tweetButton").click(function() {
		if($('#ministry').val() === undefined || $('#ministry').val() === "") return;
 		var url = "twitter://post?message="+encodeURIComponent($("#tweetContent").val());
 		var deep_url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent($("#tweetContent").val());

 		get(url).then(function(response) {
  			console.log("Success!", response);
  			window.open(url, "myWindow", "width=200,height=100"); 
		}, function(error) {
		  	console.error("Failed!", error);
		  	window.open(deep_url, "myWindow", "width=200,height=100"); 
		});
    });

    function get(url) {
	  return new Promise(function(resolve, reject) {
	    var req = new XMLHttpRequest();
	    req.open('GET', url);

	    req.onload = function() {
	      if (req.status == 200) {
	        resolve(req.response);
	      }
	      else {
	        reject(Error(req.statusText));
	      }
	    };
	    req.onerror = function() {
	      reject(Error("Network Error"));
	    };
	    req.send();
	  });
	}
});

var ministries = [
{ "Id": "41",  "Name":  "Ministry of Railways",
"Ministry": "@RailMinIndia",
"CM": "@sureshpprabhu",
"Zones": {
	"Central": {
		"gm": "@gm_crly",
		"drms": [{"city": "Mumbai", "handle": "@drmmumbaicr"}, {"city": "Nagpur", "handle": "@drmcrngp"}, {"city": "Pune", "handle": "@drmpune"}, {"city": "Solapur", "handle": "@drmsolapur"}, {"city": "Bhusawal", "handle": "@bhusavaldivn"}]
	},
	"Eastern": {
		"gm": "@EasternRailway",
		"drms": [{"city": "Sealdah", "handle": "@drmsdah"}, {"city": "Howrah", "handle": "@drmhowrah"}, {"city": "Malda", "handle": "@drmmalda"}, {"city": "Asansol", "handle": "@DRM_ASN"}]
	},
	"East Central": {
		"gm": "@GM_ECRly",
		"drms": [{"city": "Danapur", "handle": "@DrmDnr"}, {"city": "Dhanbad", "handle": "@drmdhnecr"}, {"city": "Mugalsarai", "handle": "@drmmgs"}, {"city": "Sonpur", "handle": "@drmsee1"}, {"city": "Samastipur", "handle": "@spjdivn"}]
	},
	"East Coast": {
		"gm": "@gmeastcoastrly",
		"drms": [{"city": "Waltair", "handle": "@drmwat_ecor"}, {"city": "Khurda Road", "handle": "@DRMKhurdaroad"}, {"city": "Sambhalpur", "handle": "@drmsambalpur"}]
	},
	"Northern": {
		"gm": "@GM_NRly",
		"drms": [{"city": "Moradabad", "handle": "@drm_moradabad"}, {"city": "Firozpur", "handle": "@firozpur_nrly"}, {"city": "Lucknow", "handle": "@drmlko25"}, {"city": "Delhi", "handle": "@drmdelhi"}, {"city": "Ambala", "handle": "@drmumb"}]
	},
	"North Central": {
		"gm": "@GMNCR1",
		"drms": [{"city": "Allahabad", "handle": "@drmncrald"}, {"city": "Jhansi", "handle": "@Drmjhansi"}, {"city": "Agra", "handle": "@DRM_Agra"}]
	},
	"North Eastern": {
		"gm": "@gmner_gkp",
		"drms": [{"city": "Izzatnagar", "handle": "@drm_drmizn"}, {"city": "Varanasi", "handle": "@drmbsbner"}, {"city": "Lucknow", "handle": "@drmljn"}]
	},
	"Northeast Frontier": {
		"gm": "@gm_nfr",
		"drms": [{"city": "Katihar", "handle": "@DRM_KIR"}, {"city": "Alipurduar", "handle": "@drm_apdj"}, {"city": "Rangiya", "handle": "@DRM_RNY"}, {"city": "Tinsukhia", "handle": "@Drm_tsk"}, {"city": "Lumding", "handle": "@drmnfr-lmg"}]
	},
	"North Western": {
		"gm": "@GMNWRailway",
		"drms": [{"city": "Jaipur", "handle": "@DRMJaipur"}, {"city": "Jodhpur", "handle": "@DRMJodhpurNWR"}, {"city": "Bikaner", "handle": "@drmbikaner"}, {"city": "Ajmer", "handle": "@DRMAjmer"}]
	},
	"Southern": {
		"gm": "@GMSRailway",
		"drms": [{"city": "Chennai", "handle": "@Drmchennai"}, {"city": "Trivendrum", "handle": "@TVC138"}, {"city": "Salem", "handle": "@SalemDRM"}, {"city": "Madurai", "handle": "@drmmadurai"}, {"city": "Palghat", "handle": "@propgt14"}, {"city": "Trichchirappalli", "handle": "@Drmtpj"}]
	},
	"South Central": {
		"gm": "@Gmscrailway",
		"drms": [{"city": "Secunderabad", "handle": "@drmsecunderabad"}, {"city": "Hyderabad", "handle": "@drmhyb"}, {"city": "Vijaywada", "handle": "@drmvijayawada"}, {"city": "Guntakal", "handle": "@drmgti"}, {"city": "Nanded", "handle": "@drmned"}, {"city": "Guntur", "handle": "@drmgnt"}]
	},
	"South Eastern": {
		"gm": "@GMSERAILWAY",
		"drms": [{"city": "Chakradharpur", "handle": "@DRMCKP"}, {"city": "Adra", "handle": "@ADRARAIL"}, {"city": "Kharagpur", "handle": "@drmkgp"}, {"city": "Ranchi", "handle": "@drmrnc"}]
	},
	"South East Central": {
		"gm": "@Gmsecr",
		"drms": [{"city": "Bilaspur", "handle": "@DRM_Bilaspur"}, {"city": "Raipur", "handle": "@Drm_raipur"}, {"city": "Nagpur", "handle": "@drmngpsecr"}]
	},
	"South Western": {
		"gm": "@gmswr",
		"drms": [{"city": "Hubli", "handle": "@DRMUBL"}, {"city": "Bengaluru", "handle": "@DRMSBC"}, {"city": "Mysore", "handle": "@DRMMYS"}]
	},
	"Western": {
		"gm": "@Gmwrly",
		"drms": [{"city": "BCT", "handle": "@Drmbct"}, {"city": "Ahemdabad", "handle": "@drmadiwr"}, {"city": "Ratlam", "handle": "@RatlamDrm"}, {"city": "Rajkot", "handle": "@wrdrmrjt"}, {"city": "Bhavnagar", "handle": "@drm_bvp"}, {"city": "Vadodara", "handle": "@drmbrcwr"}]
	},
	"West Central": {
		"gm": "@Gmwcrailway",
		"drms": [{"city": "Bhopal", "handle": "@Drmbhopal"}, {"city": "Jabalpur", "handle": "@drmjabalpur"}, {"city": "Kota", "handle": "@drmkota"}]
	}
}}];