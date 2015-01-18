/**** our stuff ****/
function buttonPressed(emotion) {
	var timestamp = truncate($('#video_container').find('video').get(0).currentTime);
	alert(emotion + ' ' + timestamp);
	var MobileServiceClient = WindowsAzure.MobileServiceClient,
		client = new MobileServiceClient('https://tutorialmhacks.azure-mobile.net/', 'jZAJirfKvRpQMCDqajiOKPWjxtsqzI47'),
        todoItemTable = client.getTable('TimestampTable');
    
    /* check if the number needs to be incremented */
    var need_to_insert = true;
    var b_arr = [];
    var query = todoItemTable.where({time: timestamp, emotion: emotion}).read().then(function(todoItems) {
			listItems = $.map(todoItems, function(item) {
				console.log('same time item');
				var newValue = item.number + 1;
				todoItemTable.update({ id: item.id, emotion: emotion, number: newValue });
				b_arr.push(item);
				console.log(item + ' pushed');
				return b_arr;
			});
    });

	function refreshTodoItems() {
	}

    if(b_arr.length == 0)
		todoItemTable.insert({ time: timestamp, emotion: emotion, number: 1}).then(refreshTodoItems); 
}


function truncate(n) {
  return n | 0; // bitwise operators convert operands to 32-bit integers
}
/****** AZURE *******/

$(function() {
    
    var timestamp = truncate($('#video_container').find('video').get(0).currentTime);
	var totalDuration = truncate($('#video_container').find('video').get(0).duration);
    //// Configure the MobileServiceClient to communicate with your mobile service by
    //// uncommenting the following code and replacing AppUrl & AppKey with values from  
    //// your mobile service, which are obtained from the Windows Azure Management Portal.
	//// Do this after you add a reference to the Mobile Services client to your project.
    var MobileServiceClient = WindowsAzure.MobileServiceClient,
		client = new MobileServiceClient('https://tutorialmhacks.azure-mobile.net/', 'jZAJirfKvRpQMCDqajiOKPWjxtsqzI47'),
        todoItemTable = client.getTable('TimestampTable');

    //// TODO: Uncomment the following method. 
    
    	var arr = [];
		var query = todoItemTable;
		
		query.take(500).read().then(function(todoItems) {
			
			listItems = $.map(todoItems, function(item) {
				arr.push([item.time, item.emotion, item.number]);
				return arr;
			});
			arr = listItems;
		});

		function refreshTodoItems() {
		}
	
 

	function getGraphStats() {
		//var currentTime = truncate($('#video_container').find('video').get(0).currentTime);
		var currentTime = 5;
		var arrayLength = arr.length;
		var map = {};
		map['exclamation'] = 0;
		map['happy'] = 0;
		map['sad'] = 0;
		map['question'] = 0;
		for(var i=0; i< arrayLength; i++) {
			var element = arr[i];
			//var time = element[0];
			var time = element[0];
			if((currentTime - 5) <= time) {
				console.log('found element');
				if(element[1] in map)
					map[element[1]] = map[element[1]]+element[2];
				else
					map[element[1]] = element[2];
				console.log('things added!')
			}
		}
		console.log(map);
		return map;
	}

	$(function () {
    var callMap = getGraphStats();
    var likeCount = callMap['happy'];
    var dislikeCount = callMap['sad'];
    var questionCount = callMap['question'];
    var surpirseCount = callMap['exclamation'];


    $('#container').highcharts({

        

        chart: {
            type: 'column'
        },
        title: {
            text: 'graph'
        },
        xAxis: {
            categories: [
                'current second',
            ]
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Clicks'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} clicks</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: ':)',
            data: [likeCount]

        }, {
            name: ':(',
            data: [dislikeCount]

        }, {
            name: '?',
            data: [questionCount]

        }, {
            name: '!',
            data: [surpirseCount]

        }]
    });
});



	setInterval(function () {
        var callMap = getGraphStats();
        var likeCount = callMap['happy'];
        var dislikeCount = callMap['sad'];
        var questionCount = callMap['question'];
        var surpirseCount = callMap['exclamation'];


        $('#container').highcharts({

            

            chart: {
                type: 'column'
            },
            title: {
                text: 'graph'
            },
            xAxis: {
                categories: [
                    'current second',
                ]
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Clicks'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} clicks</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: ':)',
                data: [likeCount]

            }, {
                name: ':(',
                data: [dislikeCount]

            }, {
                name: '?',
                data: [questionCount]

            }, {
                name: '!',
                data: [surpirseCount]

            }]
        });
    }, 1000);

    /*function getTodoItemId(formElement) {
        return $(formElement).closest('li').attr('data-todoitem-id');
    }*/

	// Handle inserts.
    
	// // TODO: Uncomment the following event hander. 
    $('#add-item').submit(function(evt) {
        var textbox = $('#new-item-text'),
            itemText = textbox.val();
        if (itemText !== '') {
            todoItemTable.insert({ text: itemText, complete: false }).then(refreshTodoItems);
        }
        textbox.val('').focus();
        evt.preventDefault();
    });

    // Handle updates.
	
	//// TODO: Uncomment the following event handlers. 
	$(document.body).on('change', '.item-text', function() {
			var newText = $(this).val();
			todoItemTable.update({ id: getTodoItemId(this), text: newText });
		});

		$(document.body).on('change', '.item-complete', function() {
			var isComplete = $(this).prop('checked');
			todoItemTable.update({ id: getTodoItemId(this), complete: isComplete }).then(refreshTodoItems);
	});

    // Handle deletes.
	$(document.body).on('click', '.item-delete', function () {
        todoItemTable.del({ id: getTodoItemId(this) }).then(refreshTodoItems);
    });
	
    // On initial load, start by fetching the current data
    refreshTodoItems();

    //loop redraw
    /*var tracker = 0;
    while(1)
    {   
        timestamp = truncate($('#video_container').find('video').get(0).currentTime);
        if(timestamp != tracker)
        {
            var callMap = getGraphStats();
            var likeCount = callMap['happy'];
            var dislikeCount = callMap['sad'];
            var questionCount = callMap['question'];
            var surpirseCount = callMap['exclamation'];


            $('#container').highcharts({

                

                chart: {
                    type: 'column'
                },
                title: {
                    text: 'graph'
                },
                xAxis: {
                    categories: [
                        'current second',
                    ]
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Clicks'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f} clicks</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: ':)',
                    data: [likeCount]

                }, {
                    name: ':(',
                    data: [dislikeCount]

                }, {
                    name: '?',
                    data: [questionCount]

                }, {
                    name: '!',
                    data: [surpirseCount]

                }]
            });
        }
        else
        {
            console.log('Derp derp derp derp');
        }
        

    }*/
});

