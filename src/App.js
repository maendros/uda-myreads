import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import SearchBook from "./SearchBook";
import { Route } from "react-router-dom";
import escapeRegExp from "escape-string-regexp";

import ListBooks from "./ListBooks";

class BooksApp extends React.Component {
  state = {
    books: [],
    searchBooks: []
  };
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  clearBooks() {
    this.setState({ searchBooks: [] });
  }
  moveTo = (bookUi, shelfUi, searchBookChoice) => {
    const { books } = this.state;
    if (searchBookChoice) {
      books.push(bookUi);
    }
    BooksAPI.update(bookUi, shelfUi).then(books => {
      console.log("ids updated");
    });
    const nextBookState = books.map(book => {
      if (book.id !== bookUi.id) return book;
      return {
        ...book,
        shelf: shelfUi
      };
    });
    this.setState({ books: nextBookState });
  };

  searchBooks = query => {
    if (query.length === "") {
      this.clearBooks();
    } else {
      BooksAPI.search(query)
        .then(records => {
          if (records.error || records === undefined) {
            this.clearBooks();
          } else {
            const match = new RegExp(escapeRegExp(query), "i");

            const searchBooks = records.filter(
              record => match.test(record.title) || match.test(record.author)
            );

            this.setState({ searchBooks });
          }
        })
        .catch(err => {
          this.clearBooks();
        });
    }
  };

  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={({ history }) => (
            <SearchBook
              moveTo={this.moveTo}
              books={this.state.searchBooks}
              searchBooks={book => {
                this.searchBooks(book);

              }}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks books={this.state.books} moveTo={this.moveTo} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
