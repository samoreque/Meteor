Template.header.helpers({
	activeRouteClass(/* route names */) {
		let args = Array.prototype.slice.call(arguments, 0);
		args.pop();
		var active = _.any(args, (name) => {
			return Router.current() && Router.current().route.getName() === name;
		});
		return active && 'active';
	}
});