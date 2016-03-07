FlowRouter.route('/', {
  name: 'Dashboard',
  action() {
    ReactLayout.render(App, {
      content: <Dashboard name="Dashboard" />,
      nav: <Nav />
    });
  }
});

FlowRouter.route('/request', {
  name: 'RequestForm',
  action() {
    ReactLayout.render(App, {
      content: <RequestForm name="Request" />
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

FlowRouter.route('/login', {
  name: 'Login',
  action() {
    ReactLayout.render(App, {
      content: <Login name="Login" />,
      nav: <Nav />
    });
  }
});

FlowRouter.route('/register', {
  name: 'Register',
  action(){
    ReactLayout.render(App, {
      content: <Register name="Register" />
    });
  }
});