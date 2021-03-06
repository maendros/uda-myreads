import React from "react";

import PropTypes from "prop-types";
//import BookShelfChanger from "./BookShelfChanger";

//import sortBy from "sort-by";


class Book extends React.Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired
  };



  change_bookShelf = (e) => {
    this.props.onUpdate(e.target.value);
    console.log(this.props);
  }


  render() {
    const { book } = this.props;


    return (
      <div>
        <li>
          <div className="book">
            <div className="book-top">
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 193,
                  backgroundImage: `url(${book.imageLinks? book.imageLinks.thumbnail :'' })`
                }}
              />
              <div className="book-shelf-changer">
                <select  onChange={this.change_bookShelf} value={book.shelf}>
                  <option value="move" disabled>
                    Move to...
                  </option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors? book.authors[0] :'' }</div>
          </div>
        </li>
      </div>
    );
  }
}

export default Book;
