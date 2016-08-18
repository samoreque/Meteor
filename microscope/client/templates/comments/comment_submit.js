Template.commentSubmit.onCreated(() => {
  Session.set('commentSubmitErrors', {});
});

Template.commentSubmit.helpers({
  errorMessage(field) {
    return Session.get('commentSubmitErrors')[field];
  },
  errorClass(field) {
    return !!Session.get('commentSubmitErrors')[field] ? 'error' : '';
  }
});

Template.commentSubmit.events({
  'submit form'(e, template) {
    e.preventDefault();

    let $body = $(e.target).find('[name=body]');
    let comment = {
      body: $body.val(),
      postId: template.data._id
    };

    let errors = {};
    if (! comment.body) {
      errors.body = "Please write some content";
      return Session.set('commentSubmitErrors', errors);
    }

    Meteor.call('commentInsert', comment, (error, commentId) => {
      if (error){
        throwError(error.reason);
      } else {
        $body.val('');
      }
    });
  }
});
