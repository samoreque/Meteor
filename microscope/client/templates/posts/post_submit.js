Template.postSubmit.events({
	'submit form'(e) {
		e.preventDefault();
		var post= {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()
		};

		/*post._id = Posts.insert(post);
		Router.go('postPage', post);*/

		var errors = validatePost(post);
		if (errors.title || errors.url)
			return Session.set('postSubmitErrors', errors);

		Meteor.call('postInsert', post, function(error, result) {
			//display the error to the user and abort
			if (error)
				return throwError(error.reason);

			// show this result but route anyway
			if (result.postExists) {
				throwError('This link has already been posted');
			}
			
			Router.go('postPage', {_id: result._id});
		});
	}	
});

Template.postSubmit.onCreated(() => {
	Session.set('postSubmitErrors', {});
});

Template.postSubmit.helpers({
	errorMessage(field) {
		return Session.get('postSubmitErrors')[field];
	},
	errorClass(field) {
		return !!Session.get('postSubmitErrors')[field] ? 'error' : '';
	}
});