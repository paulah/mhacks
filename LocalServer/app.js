
/****** AZURE *******/

$(function() {

	//// Configure the MobileServiceClient to communicate with your mobile service by
    //// uncommenting the following code and replacing AppUrl & AppKey with values from  
    //// your mobile service, which are obtained from the Windows Azure Management Portal.
	//// Do this after you add a reference to the Mobile Services client to your project.
    var MobileServiceClient = WindowsAzure.MobileServiceClient,
		client = new MobileServiceClient('https://tutorialmhacks.azure-mobile.net/', 'jZAJirfKvRpQMCDqajiOKPWjxtsqzI47'),
        todoItemTable = client.getTable('TimestampTable');

    //// TODO: Uncomment the following method. 
    function refreshTodoItems() {

		var query = todoItemTable;

		query.read().then(function(todoItems) {
			/* listItems = $.map(todoItems, function(item) {
				return $('<li>')
					.attr('data-todoitem-id', item.id)
					.append($('<button class="item-delete">Delete</button>'))
					.append($('<input type="checkbox" class="item-complete">').prop('checked', item.complete))
					.append($('<div>').append($('<input class="item-text">').val(item.text)));
			});
				   
			$('#todo-items').empty().append(listItems).toggle(listItems.length > 0);
			$('#summary').html('<strong>' + todoItems.length + '</strong> item(s)');*/
		});
	}

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
});

/**** our stuff ****/

function buttonPressed(emotion) {
	var timestamp = $('#video_container').find('video').get(0).currentTime;
	alert(emotion + ' ' + timestamp);
	todoItemTable.insert({ time: timestamp, emotion: emotion, number: 1}); /* .then(refreshTodoItems); */
}
