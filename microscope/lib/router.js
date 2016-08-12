Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function () {return Meteor.subscribe('posts');}
});

Router.route('/', {name: 'postsList'});
Router.route('/posts/:_id', {
	name: 'postPage',
	data: function() {return Posts.findOne(this.params._id); }
});

Router.route('/submit', {name: 'postSubmit'});

var requiereLogin = function() {
	if (! Meteor.user()) {
		this.render('accessDenied');		
	} else {
		this.next();
	}
}

Router.onBeforeAction(requiereLogin, {only: 'postPage'});
Router.onBeforeAction('dataNotFound', {only: 'postPage'});

