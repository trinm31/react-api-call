import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const getBooks = async () => await axios.get(`${BASE_URL}/books`);

export const getBookById = async (bookId) =>
  await axios.get(`${BASE_URL}/books/${bookId}`);

export const createBook = async (book) =>
  await axios.post(`${BASE_URL}/books/`, book);

export const updateBook = async (bookId, book) =>
  await axios.put(`${BASE_URL}/books/${bookId}`, book);

export const deleteBook = async (bookId) =>
  axios.delete(`${BASE_URL}/books/${bookId}`);
