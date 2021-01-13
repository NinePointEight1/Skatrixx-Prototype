var touchstartX = 0;
var touchstartY = 0;
var touchendX = 0;
var touchendY = 0;

window.onload = function() {
	CheckForMobile();
}

$(document).ready(function() {
	GenerateMeasurements();
	LoadLeaderboards();
	LoadFriends();
});

//This function is called in csi.min.js - Do not change.
function LoadFooter() {
	var path = window.location.pathname;
	var page1 = path.split("/").pop();
	var page2 = page1.split(".")[0];
	$("#"+page2).addClass("FooterItemActive");
	$("#text"+page2).addClass("FooterTextActive");
}

function CheckForMobile() {
	if(! /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		$("#NormalStyle").attr("disabled", "disabled");
		window.stop();
		$("body").empty();
		$("body").html("This site is not compatible on desktop. Please try a mobile device.");
	}
}

function SelectItem(e, page) {
	page = $("#"+page);
	//Remove menu item selections
	$(".MenuWrapper").children().attr('class', 'MenuItem');
	//Change to new clicked menu item
	$(e).attr('class', 'MenuItemActive');
	//Show selected page.
	$(".MainDiv").children().removeClass("active");
	$(".MainDiv").find(page).addClass("active");
}


window.addEventListener('touchstart', function(event) {
	touchstartY = event.changedTouches[0].screenY;
}, false);

window.addEventListener('touchend', function(event) {
	touchendY = event.changedTouches[0].screenY;
	handlescroll();
}, false); 

function handlescroll() {
	if ($("#Session").hasClass("active") == 1) {
		if (touchendY >= touchstartY+100) {
			$("#BlurredBackground").animate({top: '86%'},700);
			$("#MeasurementWrapper").animate({marginTop: '0%'},700);
		}

		else if (touchendY+100 <= touchstartY) {
			$("#BlurredBackground").animate({top: '0'},700);
			$("#MeasurementWrapper").animate({marginTop: '20%'},700);
		}
	}
}

var $card = $('.card');
var lastCard = $(".card-list .card").length - 1;

$('.next').click(function(){ 
	var prependList = function() {
		if( $('.card').hasClass('activeNow') ) {
			var $slicedCard = $('.card').slice(lastCard).removeClass('transformThis activeNow');
			$('ul').prepend($slicedCard);
		}
	}
	$('li').last().removeClass('transformPrev').addClass('transformThis').prev().addClass('activeNow');
	setTimeout(function(){prependList(); }, 150);
});

$('.prev').click(function() {
	var appendToList = function() {
		if( $('.card').hasClass('activeNow') ) {
			var $slicedCard = $('.card').slice(0, 1).addClass('transformPrev');
			$('.card-list').append($slicedCard);
		}
	}
	$('li').removeClass('transformPrev').last().addClass('activeNow').prevAll().removeClass('activeNow');
	setTimeout(function(){appendToList();}, 150);
});



function GenerateMeasurements() {
	var dq = '"';
	var titles = Array("Kickflip", "Ollie", "New Trick", "Reverse Kickflip", "Nollie", "Shuvit","Frontside","Heelflip");
	var randomTitle = titles[Math.floor(Math.random()*titles.length)];
	$(".card").empty();
	var htmlstring = '<div id="SavedMeasurementDelete"><div id="DeleteIcon" onclick="DeleteItem();"></div></div>\
	<div id="SavedMeasurementTitle">'+ randomTitle +'</div>\
	<div id="SavedMeasurement">\
	<div class="SessionDivLeft">\
	<div class="SessionIcon"><img src="Icons/measurements/speed.svg" style="width: 100%;filter: invert(1);"></div>\
	<div class="SessionWrapper">\
	<div class="SpeedMeasurement Measurement">'+ getRandomInt(25, 50, "floor") +'</div>\
	<div class="MeasurementTitle">Speed</div>\
	</div>\
	</div>\
	<div class="SessionDivRight">\
	<div class="SessionIcon"><img src="Icons/measurements/height.svg" style="width: 100%;filter: invert(1);"></div>\
	<div class="SessionWrapper">\
	<div class="HeightMeasurement Measurement">'+ getRandomInt(0.5, 2.5, "") +'</div>\
	<div class="MeasurementTitle">Height</div>\
	</div>\
	</div>\
	<div class="SessionDivLeft">\
	<div class="SessionIcon"><img src="Icons/measurements/balance.svg" style="width: 100%;filter: invert(1);"></div>\
	<div class="SessionWrapper">\
	<div class="BalanceMeasurement Measurement">'+ getRandomInt(10, 70, "floor") +'</div>\
	<div class="MeasurementTitle">Balance</div>\
	</div>\
	</div>\
	<div class="SessionDivRight">\
	<div class="SessionIcon"><img src="Icons/measurements/airtime.svg" style="width: 100%;filter: invert(1);"></div>\
	<div class="SessionWrapper">\
	<div class="AirtimeMeasurement Measurement">'+ getRandomInt(1.0, 3.0, "") +'</div>\
	<div class="MeasurementTitle">Airtime</div>\
	</div>\
	</div>\
	<div class="SessionDivLeft">\
	<div class="SessionIcon"><img src="Icons/measurements/hrotation.svg" style="width: 100%;filter: invert(1);"></div>\
	<div class="SessionWrapper" style="margin-top: -20px;">\
	<div class="HRotationTitle1">Hor.</div>\
	<div class="HRotationMeasurement Measurement">'+ getRandomInt(0, 420, "floor") +'&#176;</div>\
	<div class="HRotationTitle2">Rotation</div>\
	</div>\
	</div>\
	<div class="SessionDivRight">\
	<div class="SessionIcon"><img src="Icons/measurements/vrotation.svg" style="width: 100%;filter: invert(1);"></div>\
	<div class="SessionWrapper" style="margin-top: -20px;">\
	<div class="VRotationTitle1">Ver.</div>\
	<div class="VRotationMeasurement Measurement">'+ getRandomInt(0, 420, "floor") +'&#176;</div>\
	<div class="VRotationTitle2">Rotation</div>\
	</div></div></div><div class="GeneralSubmitButton">Share</div><div id="PerformedText">Date performed: 24-11-2020</div>'
	setTimeout(function(){$(".card").append(htmlstring);}, 100);
}

function getRandomInt(min, max, string) {
  // min = Math.ceil(min);
  // max = Math.floor(max);
  if (string == "floor") {
  	return Math.floor(Math.random() * (max - min + 1) + min);
  }
  else {
  	return (Math.random() * (max - min + 1) + min).toFixed(1);
  }
}

function ScrollToKnowledge(value) {
	$('html,body').animate({scrollTop: $("#"+value).offset().top},'700');
}

document.querySelectorAll('.TrickSwipeboard').forEach(item => {
	item.addEventListener('touchstart', event => {
		touchstartX = event.changedTouches[0].screenX;
	})
});

document.querySelectorAll('.TrickSwipeboard').forEach(item => {
	item.addEventListener('touchend', event => {
		touchendX = event.changedTouches[0].screenX;
		handletrickswipe(event);
	})
});

function handletrickswipe(e) {
	if ($("#Knowledge").hasClass("active") == 1) {
		if (touchendX >= touchstartX+10) {
			$(e.target).animate({marginLeft: '75%'},700);
			$(e.target.parentElement).find(".TrickName").animate({marginLeft: '60%'},700);
			var FindColor = $(e.target.parentElement).find(".TrickName").css("color");
			if (rgb2hex(FindColor) == "#101010") {
				$(e.target.parentElement).find(".TrickName").css("color","white");
			}
			else {
				$(e.target.parentElement).find(".TrickName").css("color","#101010");
			}
		}
		else if (touchendX+10 <= touchstartX) {
			$(e.target).animate({marginLeft: '-125%'},700);
			$(e.target.parentElement).find(".TrickName").animate({marginLeft: ''},700);
			var FindColor = $(e.target.parentElement).find(".TrickName").css("color");
			if (rgb2hex(FindColor) == "#101010") {
				$(e.target.parentElement).find(".TrickName").css("color","white");
			}
			else {
				$(e.target.parentElement).find(".TrickName").css("color","#101010");
			}
		}
	}
}

function rgb2hex(rgb) {
	if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;

	rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	function hex(x) {
		return ("0" + parseInt(x).toString(16)).slice(-2);
	}
	return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function LoadLeaderboards() {
	var dq = '"';
	var htmlstring = '';
	var namesi = Array("Kaiden Ruiz", "Bob Hastings", "Robson Haynes", "Johnny Blake", "Arwen Baldwin", "James Young", "Alex Avel", "Roy Lindsey", "Alec Hudson", "Orson Marrow", "Adrian Norman", "Tyler Dean");
	var imagesi = Array("KaidenRuiz.png", "BobHastings.png", "RobsonHaynes.png", "JohnnyBlake.png", "ArwenBaldwin.png", "JamesYoung.png", "AlexAvel.png", "RoyLindsey.png", "AlecHudson.png", "OrsonMarrow.png", "AdrianNorman.png", "TylerDean.png");
	//Country leaderboard (Landing Page)
	$(".RankingListCountry").empty();
	for (var i = 0; i < namesi.length; i++) {
		htmlstring += '<div class="PlayerRankWrapper">\
		<div class="PlayerRankImage" style="background: url(CSS/Images/'+ imagesi[i] +') no-repeat center center;"></div>\
		<div class="PlayerRankContainer">\
		<div class="PlayerRankName">'+ namesi[i] +'</div>\
		<div class="PlayerRankXP">10.450 XP &#9733;</div>\
		</div>\
		<div class="PlayerRankPosition NL">#'+ (i+1) +'</div></div>';
	}
	$(".RankingListCountry").append(htmlstring);

	//World leaderboard
	var namesy = Array("Chad Dominguez", "Shea Mullen", "Devan Maguire", "Kendrick Field", "Anand Marshall", "Kaiden Ruiz", "Alex Avel", "Dean Sparks", "Alec Hudson", "Orson Marrow", "Adrian Norman", "Tyler Dean");
	var imagesy = Array("ChadDominguez.png", "SheaMullen.png", "DevanMaguire.png", "KendrickField.png", "AnandMarshall.png", "KaidenRuiz.png", "RoyLindsey.png", "DeanSparks.png", "AlecHudson.png", "OrsonMarrow.png", "AdrianNorman.png", "TylerDean.png");
	$(".RankingListWorld").empty();
	htmlstring = '';
	for (var y = 0; y < namesy.length; y++) {
		htmlstring += '<div class="PlayerRankWrapper">\
		<div class="PlayerRankImage" style="background: url(CSS/Images/'+ imagesy[y] +') no-repeat center center;"></div>\
		<div class="PlayerRankContainer">\
		<div class="PlayerRankName">'+ namesy[y] +'</div>\
		<div class="PlayerRankXP">10.450 XP &#9733;</div>\
		</div>\
		<div class="PlayerRankPosition '+ ['NL', 'MEX', 'USA'][Math.floor(Math.random() * 3)] +'">#'+ (y+1) +'</div></div>';
	}
	$(".RankingListWorld").append(htmlstring);

	//Friendly leaderboard
	var namesx = Array("Roy Lindsey", "Alec Hudson", "Orson Marrow", "Adrian Norman", "Tyler Dean", "Mark Rivello");
	var imagesx = Array("RoyLindsey.png", "AlecHudson.png", "OrsonMarrow.png", "AdrianNorman.png", "TylerDean.png", "Mark2.png");
	var amountx = Array("15", "8", "5", "3", "3", "2")
	$(".RankingListFriendly").empty();
	htmlstring = '';
	for (var x = 0; x < namesx.length; x++) {
		htmlstring += '<div class="PlayerRankWrapper">\
		<div class="PlayerRankImage" style="background: url(CSS/Images/'+ imagesx[x] +') no-repeat center center;"></div>\
		<div class="PlayerRankContainer" style="width:60%;">\
		<div class="PlayerRankName">'+ namesx[x] +'</div>\
		<div class="PlayerRankXP">'+ amountx[x] +' Kickflips</div>\
		</div>\
		<div class="PlayerRankPosition">#'+ (x+1) +'</div></div>';
	}
	$(".RankingListFriendly").append(htmlstring);
}

function SwitchFriendlyScreen(p) {
	if (p == "create") {
		$("#PositionsScreen").css("display","none");
		$("#CreationScreen").css("display","block");
	}
	else if (p == "back") {
		$("#CreationScreen").css("display","none");
		$("#PositionsScreen").css("display","block");
	}
}

$('.select').on('click','.placeholder',function(){
	var parent = $(this).closest('.select');
	if ( ! parent.hasClass('is-open')){
		parent.addClass('is-open');
		$('.select.is-open').not(parent).removeClass('is-open');
	}else{
		parent.removeClass('is-open');
	}
}).on('click','ul>li',function(){
	var parent = $(this).closest('.select');
	parent.removeClass('is-open').find('.placeholder').text( $(this).text() );
});


$(".BadgeImage").on("click", function() {
	 var popup = $(this).find(".popuptext");
	 $(".popuptext").removeClass("show");
	 popup.toggleClass("show");
})

function LoadFriends() {
	var dq = '"';
	var htmlstring = '';
	var namesi = Array("Kaiden Ruiz", "Bob Hastings", "Robson Haynes", "Johnny Blake", "Arwen Baldwin", "James Young", "Alex Avel", "Roy Lindsey", "Alec Hudson", "Orson Marrow", "Adrian Norman", "Tyler Dean");
	var imagesi = Array("KaidenRuiz.png", "BobHastings.png", "RobsonHaynes.png", "JohnnyBlake.png", "ArwenBaldwin.png", "JamesYoung.png", "AlexAvel.png", "RoyLindsey.png", "AlecHudson.png", "OrsonMarrow.png", "AdrianNorman.png", "TylerDean.png");
	//Country leaderboard (Landing Page)
	$(".RankingListFriends").empty();
	for (var i = 0; i < namesi.length; i++) {
		htmlstring += '<div class="PlayerRankWrapper">\
		<div class="PlayerRankImage" style="background: url(CSS/Images/'+ imagesi[i] +') no-repeat center center;"></div>\
		<div class="PlayerRankContainer">\
		<div class="PlayerRankName">'+ namesi[i] +'</div>\
		<div class="PlayerRankXP">10.450 XP &#9733;</div>\
		</div>\
		<div class="PlayerRankPosition NL"></div></div>';
	}
	$(".RankingListFriends").append(htmlstring);
}