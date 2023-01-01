import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const getBooks = async (token) =>
  await axios.get(`${BASE_URL}/books`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getBookById = async (bookId, token) =>
  await axios.get(`${BASE_URL}/books/${bookId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createBook = async (book, token) =>
  await axios.post(`${BASE_URL}/books/`, book, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateBook = async (bookId, book, token) =>
  await axios.put(`${BASE_URL}/books/${bookId}`, book, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteBook = async (bookId, token) =>
  axios.delete(`${BASE_URL}/books/${bookId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
