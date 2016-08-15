Template.postsList.helpers({
	posts: function() {
		return Posts.find({}, {short: {submitted: -1}});
	}
});
