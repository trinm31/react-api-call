import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateBook, getBookById } from "../functions/book";
import DateTimePicker from "react-datetime-picker";
import { useSelector } from "react-redux";

const initialBook = {
  name: "",
  author: "",
  pageNumber: 0,
  publishDate: new Date(),
};

const initialError = {
  name: "",
  author: "",
  pageNumber: "",
  publishDate: "",
};

const EditComponent = () => {
  const [book, setBook] = useState(initialBook);
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState(initialError);
  const user = useSelector((state) => state.user);
  const params = useParams();
  const navigation = useNavigate();
  const id = params.id;

  useEffect(() => {
    getBookById(id, user.token)
      .then((res) => {
        setBook(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });

    if (e.target.name === "name")
      error.name = e.target.value.length === 0 ? "Name is required" : "";
    if (e.target.name === "author")
      error.author = e.target.value.length === 0 ? "Author is required" : "";
    if (e.target.name === "pageNumber")
      error.pageNumber = e.target.value == 0 ? "Page Number is required" : "";
    if (e.target.name === "publishDate")
      error.publishDate =
        e.target.value.length === 0 ? "Publish Date is required" : "";

    setError({ ...error });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (validateInput()) {
      book.publishDate = date;
      // call api
      updateBook(id, book, user.token)
        .then((res) => {
          // reset state book
          setBook(initialBook);
          navigation("/");
        })
        .catch((err) => console.log(err));
    }
  };

  const validateInput = () => {
    let validate = true;

    error.name = book.name.length === 0 ? "Name is required" : "";
    error.author = book.author.length === 0 ? "Author is required" : "";
    error.pageNumber = book.pageNumber === 0 ? "Page Number is required" : "";
    error.publishDate =
      book.publishDate.length === 0 ? "Publish Date is required" : "";

    setError({ ...error });
    validate = Object.values(error).every((o) => o === "");

    return validate;
  };

  return (
    <div className="container">
      <h2>Add Edit Book</h2>
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
          {error.name && (
            <small className="form-text text-danger">{error.name}</small>
          )}
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
          {error.author && (
            <small className="form-text text-danger">{error.author}</small>
          )}
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
          {error.pageNumber && (
            <small className="form-text text-danger">{error.pageNumber}</small>
          )}
        </div>
        <div className="form-group">
          <label>Publish Day</label>
          <DateTimePicker
            onChange={setDate}
            value={date}
            className="form-control"
          />
          {error.publishDate && (
            <small className="form-text text-danger">{error.publishDate}</small>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditComponent;
