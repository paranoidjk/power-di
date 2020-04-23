import test from 'ava';
import * as React from 'react';
import { create } from 'react-test-renderer';
import { IocContext } from '../lib/IocContext';
import { IocProvider, Component, PureComponent } from '../lib/react';
import { inject, postConstruct } from '../lib';

test('react only react component.', t => {
  const context = IocContext.DefaultInstance;
  class NRServiceDI { }
  context.register(NRServiceDI);

  class TestComponent extends Component<{}, {}> {
    @inject()
    service: NRServiceDI;

    componentDidMount() {
      t.true(this.service instanceof NRServiceDI);
    }

    render(): any {
      return null;
    }
  }

  create(
    <TestComponent />
  );
});

test('react IocProvider.', t => {
  const context = IocContext.DefaultInstance;
  class NRServiceDI { }
  context.register(NRServiceDI);

  class TestComponent extends Component {
    @inject()
    service: NRServiceDI;

    componentDidMount() {
      t.true(this.service instanceof NRServiceDI);
    }

    render(): any {
      return null;
    }
  }

  create(
    <IocProvider>
      <TestComponent />
    </IocProvider>
  );
});

test('react IocProvider with context.', t => {
  const context = new IocContext;
  class NRService { }
  context.register(NRService);

  class TestComponent extends PureComponent {
    @inject()
    service: NRService;

    componentDidMount() {
      t.true(this.service instanceof NRService);
    }

    render(): any {
      return null;
    }
  }

  create(
    <IocProvider context={context}>
      <TestComponent />
    </IocProvider>
  );
});

test('react has componentWillMount.', t => {
  const context = new IocContext;
  class NRService { }
  context.register(NRService);

  class TestComponent extends Component {
    @inject()
    service: NRService;

    componentWillMount() {
      t.true(this.service instanceof NRService);
    }

    render(): any {
      return null;
    }
  }

  create(
    <IocProvider context={context}>
      <TestComponent />
    </IocProvider>
  );
});


test('react has componentWillMount, PureComponent.', t => {
  const context = new IocContext;
  class NRService { }
  context.register(NRService);

  class TestComponent extends PureComponent {
    @inject()
    service: NRService;

    componentWillMount() {
      t.true(this.service instanceof NRService);
    }

    render(): any {
      return null;
    }
  }

  create(
    <IocProvider context={context}>
      <TestComponent />
    </IocProvider>
  );
});

test('react postConstruct.', t => {
  const context = new IocContext;
  class NRService { }
  context.register(NRService);

  class TestComponent extends Component {
    @inject()
    service: NRService;

    @postConstruct()
    init() {
      t.true(this.service instanceof NRService);
    }

    render(): any {
      return null;
    }
  }

  create(
    <IocProvider context={context}>
      <TestComponent />
    </IocProvider>
  );
});
