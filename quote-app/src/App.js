import React from "react";
import "./App.css";

let quoteArr = [
  {
    quo:
      '"There is only one way to happiness and that is to cease worrying about things which are beyond the power of our will."',
    auth: "-Epictetus",
  },
  {
    quo:
      '"Happiness is not something ready-made. It comes from your own actions."',
    auth: "-Dalai Lama",
  },
  {
    quo: '"To be happy, we must not be too concerned with others."',
    auth: "-Albert Camus",
  },
  {
    quo: '"All limitations are self-imposed."',
    auth: "-Oliver Wendell Holmes",
  },
  {
    quo: '"When words fail, music speaks."',
    auth: "-Shakespeare",
  },
  {
    quo: '"If you tell the truth you don’t have to remember anything."',
    auth: "-Mark Twain",
  },
  {
    quo: '"Oh, the things you can find, if you don’t stay behind."',
    auth: "-Dr. Seuss",
  },
  {
    quo: '"To live will be an awfully big adventure."',
    auth: "-Peter Pan",
  },
  {
    quo: '"Wanting to be someone else is a waste of who you are"',
    auth: "-Kurt Cobain",
  },
];

let randIndex = (arr = quoteArr) => {
  let quoteInd = Math.floor(Math.random() * arr.length);
  return quoteInd;
};

class QuotesApp extends React.Component {
  constructor(props) {
    super(props);

    this.btnNewQuote = this.btnNewQuote.bind(this);

    this.state = {
      quotes: [...quoteArr],
      ind: randIndex(),
    };
  }

  btnNewQuote() {
    this.setState({
      ind: randIndex(),
    });

    //This code increments the array indice for the quote array
    // this.state.ind >= this.state.quotes.length - 1
    //   ? this.setState({ ind: 0 })
    //   : this.setState({ ind: this.state.ind + 1 });
  }

  render() {
    return (
      <div className="App" id="quote-box">
        <div className="quote-container center">
          <p className="quote-text" id="text">
            {this.state.quotes[this.state.ind].quo}
          </p>
        </div>
        <div className="author-container center">
          <p className="quote-author" id="author">
            {this.state.quotes[this.state.ind].auth}
          </p>
        </div>
        <div className="btn-container center">
          <button
            onClick={this.btnNewQuote}
            className="btn-quote"
            id="new-quote"
          >
            New Quote
          </button>
        </div>
        <div className="link-container center">
          <a
            className="link-twitter"
            id="tweet-quote"
            href="twitter.com/intent/tweet"
          >
            Tweet It!
          </a>
        </div>
      </div>
    );
  }
}

export default QuotesApp;
