Template.postEdit.onCreated(() => {
	Session.set('postEditErrors', {});
});

Template.postEdit.helpers({
	errorMessage(field) {
		return Session.get('postEditErrors')[field];
	},
	errorClass(field) {
		return !!Session.get('postEditErrors')[field] ? 'error' : '';
	}
});

Template.postEdit.events({
	'submit form'(e) {
		e.preventDefault();
		let currentPostId = this._id;
		let postProperties = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()
		}

		let errors = validatePost(postProperties);
		if (errors.title || errors.url)
			return Session.set('postEditErrors', errors);

		Posts.update(currentPostId, {$set: postProperties}, (error) => {
			if (error) {
				//display the error to the user
				throwError(error.reason);
			} else {
				Router.go('postPage', {_id: currentPostId});
			}
		});
	},

	'click .delete'(e) {
		e.preventDefault();

		if (confirm('Delete this post?')) {
			var currentPostId = this._id;
			Posts.remove(currentPostId);
			Router.go('home');
		}
	}
});