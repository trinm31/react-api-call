import React, { useState, useEffect } from "react";
import { getBooks, deleteBook } from "../functions/book";
import { Link } from "react-router-dom";
//import { useSelector, useDispatch } from "react-redux";
//import { increment, decrement } from "../redux/actions/counter";

const IndexComponent = () => {
  const [books, setBooks] = useState([]);
  // const counter = useSelector((state) => state.counter);
  // const dispatch = useDispatch();

  useEffect(() => {
    onInit();
  }, []);

  const onInit = () => {
    getBooks()
      .then((res) => {
        setBooks(res.data);
        console.log(books);
      })
      .catch((err) => console.log(err));
  };

  const onDelete = (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you want to delete")) {
      deleteBook(id)
        .then(() => {
          onInit();
        })
        .catch((err) => console.log(err));
    }
  };

  const RowTable = () => {
    return books.map((book, i) => (
      <tr key={i}>
        <th>{book.id}</th>
        <th>{book.name}</th>
        <th>{book.author}</th>
        <th>{book.pageNumber}</th>
        <th>{book.publishDate}</th>
        <th>
          <div className="d-flex justify-content-around">
            <button
              onClick={() => onDelete(book.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
            <Link to={"/edit/" + book.id} className="btn btn-warning">
              Edit
            </Link>
          </div>
        </th>
      </tr>
    ));
  };

  return (
    <div className="container">
      {/* <div>
        <h1>Counter {counter}</h1>
        <button onClick={() => dispatch(increment(5))}>Increment</button>
        <button onClick={() => dispatch(decrement(5))}>Decrement</button>
      </div> */}
      <h1 align="center">Book Lists</h1>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Author</th>
            <th>Page Number</th>
            <th>Publish Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <RowTable />
        </tbody>
      </table>
    </div>
  );
};

export default IndexComponent;
