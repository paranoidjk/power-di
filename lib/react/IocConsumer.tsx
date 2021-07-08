import * as React from 'react';
import { Context, ContextSymbol } from './context';
import { createConsumerComponent } from './BaseComponent';

export interface IocConsumerOpt {
  /** manual extends BaseClass: BaseConsumerComponent */
  manualExtendsBaseClass?: boolean;
  /** should be pure component */
  pureComponent?: boolean;
}

export function iocConsumer(opt: IocConsumerOpt = {}): ClassDecorator {
  opt = Object.assign({ useBaseClass: false }, opt);

  return function (Comp: any): any {
    const NewComp: any = opt.manualExtendsBaseClass ? Comp : createConsumerComponent(Comp);

    class IoCPureComponent extends React.PureComponent {
      static displayName = `IoCComponent(${getDisplayName(Comp)})`;

      render() {
        return (
          <Context.Consumer>
            {ctx => (
              <NewComp
                {...Object.assign({}, this.props, {
                  [ContextSymbol]: ctx,
                })}
              />
            )}
          </Context.Consumer>
        );
      }
    }

    class IoCComponent extends React.Component {
      static displayName = `IoCComponent(${getDisplayName(Comp)})`;

      render() {
        return (
          <Context.Consumer>
            {ctx => (
              <NewComp
                {...Object.assign({}, this.props, {
                  [ContextSymbol]: ctx,
                })}
              />
            )}
          </Context.Consumer>
        );
      }
    }

    return opt.pureComponent ? IoCPureComponent : IoCComponent;
  };
}

function getDisplayName(WrappedComponent: any) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
