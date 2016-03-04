FlowRouter.route('/', {
  name: 'Dashboard',
  action() {
    ReactLayout.render(App, {
      content: <Dashboard />,
      nav: <Nav />
    });
  }
});

FlowRouter.route('/request', {
  name: 'RequestForm',
  action() {
    ReactLayout.render(RequestForm, {
      content: <RequestForm />,
      nav: ''
    });
  }
});

FlowRouter.route('/new-ninja', {
  name: 'NewNinja',
    action() {
      ReactLayout.render(App, {
        content: <NewNinja />,
        nav: <Nav />
      });
  }
});

FlowRouter.route('/ninjas', {
  name: 'NinjasList',
  action() {
    ReactLayout.render(App, {
      content: <NinjasList />,
      nav: <Nav />
    });
  }
});