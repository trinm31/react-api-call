import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBook } from "../functions/book";
import DateTimePicker from "react-datetime-picker";
import { useSelector } from "react-redux";

const initialBook = {
  name: "",
  author: "",
  pageNumber: 0,
  publishDate: new Date(),
};

const CreateComponent = () => {
  const [book, setBook] = useState(initialBook);
  const [date, setDate] = useState(new Date());
  const counter = useSelector((state) => state.counter);
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(book);
  }, [book]);

  const onChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    book.publishDate = date;
    // call api
    createBook(book, user.token)
      .then((res) => {
        // reset state book
        setBook(initialBook);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <h1>Counter {counter}</h1>
      <h2>Add New Book</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            name="name"
            type="text"
            value={book.name}
            onChange={(e) => onChange(e)}
            className="form-control"
          ></input>
        </div>
        <div className="form-group">
          <label>Author</label>
          <input
            name="author"
            type="text"
            value={book.author}
            onChange={(e) => onChange(e)}
            className="form-control"
          ></input>
        </div>
        <div className="form-group">
          <label>Page Number</label>
          <input
            name="pageNumber"
            type="text"
            value={book.pageNumber}
            onChange={(e) => onChange(e)}
            className="form-control"
          ></input>
        </div>
        <div className="form-group">
          <label>Publish Day</label>
          <DateTimePicker
            onChange={setDate}
            value={date}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateComponent;
