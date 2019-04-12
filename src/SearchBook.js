import React from "react";
import { Link } from "react-router-dom";

import Book from "./Book";
import { PropTypes } from "prop-types";

class SearchBook extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    moveTo: PropTypes.func.isRequired,
    searchBooks: PropTypes.func.isRequired
  };
  componentDidMount() {}
  handleSearchBook(query) {
    if (this.props.searchBooks) {
      this.props.searchBooks(query);
    }
  }
  update_book = (book, shelf) => {
    this.props.moveTo(book, shelf, true);
  };

  render() {
    const { books } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={event => this.handleSearchBook(event.target.value)}
              onKeyDown={event => {
                if (event.keyCode === 8)
                  this.handleSearchBook(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {console.log(books)}
            {//if(books.length > 0){

            books && books.length > 1 ? (
              books.map((book, index) => (
                <Book
                  book={book}
                  key={index}
                  onUpdate={shelf => {
                    this.update_book(book, shelf);
                  }}
                />
              ))
            ) : (
              <p>no books yet</p>
            )}
          </ol>
        </div>
      </div>
    );
  }
}
export default SearchBook;
