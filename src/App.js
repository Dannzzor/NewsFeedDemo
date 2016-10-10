import React from 'react';
import ReactDOM from 'react-dom';
import Moment from 'moment';
import Client from './Client';
import './App.css';

let App = React.createClass ({
  getInitialState() {
    return {
      articleOffset: 0,
      scrollPosition: 0,
      articles: []
    }
  },

  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    el.addEventListener('scroll', this.handleScroll);
    Client.load(this.state.articleOffset, (results) => {
      this.setState({articles: results.news});
    });
  },

  componentWillUnmount() {
    const el = ReactDOM.findDOMNode(this);
    el.removeEventListener('scroll', this.handleScroll);
  },

  handleScroll(e) {
    let el = ReactDOM.findDOMNode(this);
    if (el.scrollTop + el.offsetHeight === el.scrollHeight) {
      this.setState({articleOffset: this.state.articleOffset + 10});
      this.loadMore();
    }
  },

  loadMore() {
    Client.load(this.state.articleOffset, (results) => {
      this.setState({articles: this.state.articles.concat(results.news) });
    });
  },

  render() {
    return (
      <div className="app">
        {
          this.state.articles.map((article, i) => {
            return (
              <div className="ui raised very padded text container segment" key={i}>
                <h2 className="ui header">{article.title}</h2>
                <div className="description">
                  <p>Published: {Moment(article.published).format('MMMM Do, h:mm a')}</p>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
});

export default App;
