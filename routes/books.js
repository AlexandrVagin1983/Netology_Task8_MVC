const express = require('express')
const router  =  express.Router()
const library = require('./../models/library')
const fileMulter = require('./../middleware/file')


router.get('/', (req, res) => {    
    const {book} = library.books

    res.render('books/index',{
        title: "Books",
        books: book,
    })
})

router.get('/create', (req, res) => {
    res.render("books/create", {
        title: "Создание книги:",
        book: {},
    })
})

router.post('/create', (req, res) => {
    const {book} = library.books
    const {title, description, authors, favorite, fileCover} = req.body
        
    newBook = new library.Book(title, description, authors, favorite, fileCover)
    book.push(newBook)

    res.redirect('/book')
})

router.get('/:id', (req, res) => {
    const {book} = library.books
    const {id} = req.params
    const idx = book.findIndex(el => el.id === id)

    if( idx !== -1) {
        res.render("books/view", {
            title: "Книга:",
            book: book[idx],
        });
    } else {
        res.status(404).redirect('/404')
    }

})

router.get('/update/:id', (req, res) => {
    const {book} = library.books
    const {id} = req.params
    const idx = book.findIndex(el => el.id === id)

    if (idx !== -1) {
        res.render("books/update", {
            title: "Изменение книги:",
            book: book[idx],
        });
    } else {
        res.status(404).redirect('/404');
    }
})

router.post('/update/:id', (req, res) => {
    const {book} = library.books
    const {title, description, authors, favorite, fileCover} = req.body
    const {id}     = req.params
    const idx = book.findIndex(el => el.id === id)
        
    if (idx !== -1){
        book[idx] = {
            ...book[idx],
            title,
            description,
            authors,
            favorite,
            fileCover
            }
        res.redirect(`/book/${id}`);
    } else {
        res.status(404).redirect('/404');
    }
})

router.post('/delete/:id', (req, res) => {
    const {book} = library.books
    const {id} = req.params
    const idx = book.findIndex(el => el.id === id)
     
    if(idx !== -1) {
        book.splice(idx, 1)
        res.redirect(`/book`)
    } else {
        res.status(404).redirect('/404')
    }
})

module.exports = router