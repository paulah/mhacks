$(function(){
$('#currentTime').html($('#video_container').find('video').get(0).load());                      $('#currentTime').html($('#video_container').find('video').get(0).play());
})
setInterval(function(){
$('#currentTime').html($('#video_container').find('video').get(0).currentTime);
$('#totalTime').html($('#video_container').find('video').get(0).duration);    
},500)

function buttonPressed(emotion) {
	var time = $('#video_container').find('video').get(0).currentTime;
	alert(emotion + ' ' + time);
}