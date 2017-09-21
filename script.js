var $iframes = $('.iframes'),
	$devices = $('form[action="devices"]'),
	shazamBar = 64,
	myShazamBar = 49,
	devices = {
		'ipad-pro': {
			'os': 'ios',
			'format': 'tablet',
			'pretty_name': 'iPad Pro',
			'width': 1024,
			'height': 1366
		},
		'ipad': {
			'os': 'ios',
			'format': 'tablet',
			'pretty_name': 'iPad *',
			'width': 768,
			'height': 1024
		},
		'iphone-4': {
			'os': 'ios',
			'format': 'mobile',
			'pretty_name': 'iPhone 4',
			'width': 320,
			'height': 480
		},
		'iphone-5': {
			'os': 'ios',
			'format': 'mobile',
			'pretty_name': 'iPhone 5',
			'width': 320,
			'height': 568
		},
		'iphone-6': {
			'os': 'ios',
			'format': 'mobile',
			'pretty_name': 'iPhone 6',
			'width': 375,
			'height': 667
		},
		'iphone-6-plus': {
			'os': 'ios',
			'format': 'mobile',
			'pretty_name': 'iPhone 6 Plus',
			'width': 414,
			'height': 736
		},
		'iphone-7': {
			'os': 'ios',
			'format': 'mobile',
			'pretty_name': 'iPhone 7',
			'width': 375,
			'height': 667
		},
		'galaxy-s2': {
			'os': 'android',
			'format': 'mobile',
			'pretty_name': 'Samsung Galaxy S2',
			'width': 320,
			'height': 533
		},
		'galaxy-s37': {
			'os': 'android',
			'format': 'mobile',
			'pretty_name': 'Samsung Galaxy S3/7',
			'width': 360,
			'height': 640
		},
		'galaxy-note-4': {
			'os': 'android',
			'format': 'mobile',
			'pretty_name': 'Samsung Galaxy Note 4',
			'width': 360,
			'height': 640
		},
		'nexus-4': {
			'os': 'android',
			'format': 'mobile',
			'pretty_name': 'Nexus 4',
			'width': 384,
			'height': 640
		},
		'nexus-5': {
			'os': 'android',
			'format': 'mobile',
			'pretty_name': 'Nexus 5',
			'width': 360,
			'height': 640
		},
		'nexus-6': {
			'os': 'android',
			'format': 'mobile',
			'pretty_name': 'Nexus 6',
			'width': 412,
			'height': 690
		},
		'nexus-5x': {
			'os': 'android',
			'format': 'mobile',
			'pretty_name': 'Nexus 5X',
			'width': 412,
			'height': 732
		},
		'lg-g3': {
			'os': 'android',
			'format': 'mobile',
			'pretty_name': 'LG G3',
			'width': 360,
			'height': 640
		}
	};

function init() {

	navigator.__defineGetter__('userAgent', function(){
	    return 'Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30' // customized user agent
	});

	navigator.userAgent; // 'foo'

	if (typeof(Storage) !== 'undefined') {
		if(localStorage.getItem('device-iframes-origin') !== null) {
			src = localStorage.getItem('device-iframes-origin');
			$('[name="origin"]').val(src);
		}
	}

	for (var device in devices) {
	    if (devices.hasOwnProperty(device)) {

	        var pretty_name = devices[device].pretty_name,
	        	os = devices[device].os,
	        	format = devices[device].format;

        	var input = '<input type="checkbox" name="device" value="' + device + 
				'" id="' + device + 
				'" data-os="' + os + 
				'" data-format="' + format + 
				'" style="display: none;">';

        	$devices.append(input);

	    }
	}

	$('[name="shazam"]').change(function(){
		$('iframe').each(function(){
			var device = $(this).attr('id'),
				height = devices[device].height,
				$shazam = $('input[name=shazam]:checked');

			if($shazam.length > 0) {
				if($shazam.val() == 'shazam') {
					height = height - shazamBar;
				} else if($shazam.val() == 'my-shazam') {
					height = height - shazamBar - myShazamBar;
				}
			}

			$(this).attr('height',height);
		});
	});

	$('[name="device"]').change(function(){
		var device = $(this).attr('value');

		if($('iframe#' + device).length > 0) {

			// remove iframe
			$('iframe#' + device).parent().remove();

		}
		else {

			var width = devices[device].width,
				height = devices[device].height,
				pretty_name = devices[device].pretty_name,
				$shazam = $('input[name=shazam]:checked');

			if($shazam.length > 0) {
				if($shazam.val() == 'shazam') {
					height = height - shazamBar;
				} else if($shazam.val() == 'my-shazam') {
					height = height - shazamBar - myShazamBar;
				}
			}

			var iframe = '<div class="iframe-container">' + 
        					'<p>' + pretty_name + '</p>' + 
        					'<iframe src="' + src + '" id="' + device + '" width="' + width + '" height="' + height + '" frameborder="0"></iframe>' + 
    					'</div>';

			$iframes.prepend(iframe);

		}
	});

	$('#show-all').click(function(){
		$('[name="device"]:not(:checked)').trigger('click');
		$('#show-ios, #show-android').addClass('active');
	});

	$('#show-ios').click(function(){
		$('[name="device"][data-os="ios"]').trigger('click');
		$(this).toggleClass('active');
	});

	$('#show-android').click(function(){
		$('[name="device"][data-os="android"]').trigger('click');
		$(this).toggleClass('active');
	});

	$('#origin').keypress(function(e){
		if(e.which == 13) {
			var origin = $('[name="origin"]').val();

			src = origin;

			refreshOrigin();
		}
	});

	$('.origin-button').click(function(){
		var origin = $('[name="origin"]').val();

		src = origin;

		refreshOrigin();
	});

	function refreshOrigin() {
		$('iframe').each(function(){
			$(this).attr('src',src);
		});

		if (typeof(Storage) !== 'undefined') {
			localStorage.setItem('device-iframes-origin', src);
		}
	}

}