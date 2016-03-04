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