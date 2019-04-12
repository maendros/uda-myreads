import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";

class BookShelf extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelfTitle: PropTypes.string.isRequired,
    moveTo: PropTypes.func.isRequired
  };
  update_book = (book, shelf) => {
    this.props.moveTo(book, shelf);
  };

  render() {
    const { books } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book, index) => (
              <Book
                book={book}
                key={index}
                onUpdate={shelf => {
                  this.update_book(book, shelf);
                }}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
