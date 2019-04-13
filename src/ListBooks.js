import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import BookShelf from "./BookShelf";
//import sortBy from "sort-by";

class ListBooks extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    moveTo: PropTypes.func.isRequired
  };

  componentDidMount() {}



  render() {
    const { books } = this.props;
    const wantToRead = books.filter(
      shelfBook => shelfBook.shelf === "wantToRead"
    );
    const currentlyReading = books.filter(
      shelfBook => shelfBook.shelf === "currentlyReading"
    );
    const read = books.filter(shelfBook => shelfBook.shelf === "read");

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
          <p>info about the app Can be found<Link to="https://github.com/maendros/uda-myreads"><button>here</button></Link></p>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf shelfTitle="Currently Reading" books={currentlyReading} moveTo={this.props.moveTo}/>
            <BookShelf shelfTitle="Want to Read" books={wantToRead} moveTo={this.props.moveTo}/>
            <BookShelf shelfTitle="Read" books={read} moveTo={this.props.moveTo}/>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ListBooks;
