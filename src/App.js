import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// import * as Sentry from '@sentry/browser';
const Sentry = window.Sentry;
if (Sentry) {

  console.log('window.Sentry: ', window.Sentry);
  Sentry.init({ 
    dsn: 'https://76e2c15e78dd47bda3f0a84965160ed2@sentry.io/1301884',
    release: 'IssuesReportReact@0.1.0'
  });
  
  // 在全局抛出的异常将被处理
  // Sentry.configureScope(scope => {
  //   scope.addEventProcessor(async (event, hint) => {
  //     console.log('event: ', event);
  //     console.log('hint: ', hint);
  //     // return event;
  //     return null;
  //   });
  // });

  // 在该作用域内抛出的异常被处理
  // Sentry.withScope(scope => {
  //   scope.addEventProcessor(async (event, hint) => {
  //     return event;
  //   });
  //   Sentry.captureMessage('Test');
  // });
}


class App extends Component {

  error = undefined;

  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidMount() {
    Sentry.configureScope(scope => {
        scope.addEventProcessor(async (event, hint) => {
          console.log('Sentry catch a error...');
          this.error = {};
          this.setState({ error: true });
          return null;
        });
      });
  }

  render() {

    console.log('this.state.error: ', this.state.error);
    if (this.state.error) {
      return (
        <div onClick={() => {
          console.log('点击反馈');
          Sentry.showReportDialog();
        }}>Report feedback</div>
      );
    }

    console.log('throw a exception in delay...');
    
    if (!this.state.error) {
      setTimeout(() => {
        // throw new Error('I crashed!')
        // console.log(this.error.notExistAttr)
      }, 2000);
    }
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
