require("dotenv").config();
const express=require("express");

const  mongoose =require("mongoose");

//database
const database=require("./Database");

//models
const BookModel=require("./book");

const AuthorModel=require("./author");

const PublicationModel=require("./publication");



//initialize
const booky=express();

booky.use(express.json());

//establish database connection
mongoose.connect(process.env.MONGO_URL,
{ useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true}).then(()=>console.log("connection established"));
/*
route         /
description  get all books
access         no
parameter      none
methods        get
*/

booky.get("/",async(req,res)=>{
    const getAllBooks=await BookModel.find();
     return res.json({books:getAllBooks});
     
});

/*
route         /is
description  get specific books based on isbn
access         public
parameter     isbn
methods        get
*/


booky.get("/is/:isbn",async(req,res)=>{
    const getSpecificBooks=await BookModel.findOne({isbn:req.params.isbn})
   // const getSpecificBook=database.books.filter((book)=>book.isbn===req.params.isbn);


    if(!getSpecificBook.length===0){
        return res.json({error:`no books found ${req.params.isbn}`});
    }

    return res.json({book:getSpecificBook}); 
    
});


/*
route         /c
description  get specific books based on category
access         public
parameter     category
methods        get
*/

booky.get("/c/:category",async(req,res)=>{const getSpecificBooks = await BookModel.findOne({
    category: req.params.category,
  });
    //const getSpecificBook=database.books.filter((book)=>book.category.includes(req.params.category))

    if(!getSpecificBook.length===0){
        return res.json({error:`no books found for the category of ${req.params.category}`});
    }

    return res.json({book:getSpecificBook});

})


/*
route         /L
description  get specific books based on language
access         public
parameter     language
methods        get
*/


booky.get("/L/:language",(req,res)=>{

   const getSpecificLanguage=database.books.filter((book)=>book.language.includes(req.params.language))

   if(getSpecificLanguage.length===0){
    return res.json({error:`no books found for the language of ${req.params.language}`});
}

return res.json({book:getSpecificLanguage});


})



/*
route         /author
description  to get all authors
access         public
parameter    none
methods        get
*/

booky.get("/author",(req,res)=>{
    const getAllAuthors = await AuthorModel.find();
   return res.json({author:getAllAuthors});
}
 )


 /*
route         /author
description  to get  authors by name
access         public
parameter   name
methods        get
*/

booky.get("/author/:name",(req,res)=>{
    const getSpecificAuthor=database.author.filter((author)=>author.name===req.params.name);


    if(getSpecificAuthor.length===0){
        return res.json({error:`no author found  ${req.params.name}`});
    }

    return res.json({author:getSpecificAuthor}); 
    
});

/*
route         /author/book/:isbn
description  to get all authors based on books isbn
access         public
parameter    isbn
methods        get
*/


booky.get("/:isbn", async (req, res)=>{
    try {
        const getSpecificAuthors = database.authors.filter((author) =>
          author.books.includes(req.params.isbn)
        );
    
        if (getSpecificAuthors.length === 0) {
          return res.json({
            error: `No author found for the book ${req.params.isbn}`,
          });
        }
    
        return res.json({ authors: getSpecificAuthors });
      } catch (error) {
        return res.json({ error: error.message });
      }
    });

    /*
Route           /author/new
Description     add new author
Access          PUBLIC
Parameters      NONE
Method          POST
*/
Router.post("/new", (req, res) => {
    const { newAuthor } = req.body;
  
    AuthorModel.create(newAuthor);
  
    return res.json({ message: "author was added!" });
  });
  

/*
route         /pub
description  to get all publications
access         public
parameter    none
methods        get
*/

booky.get("/pub",(req,res)=>{
    return res.json({publications:database.publications});
    
});

/*
route         /pub
description  get specific publications based on id
access         public
parameter    id
methods        get
*/
booky.get("/pub/:id",(req,res)=>{
    const getSpecificPublications=database.publications.filter((publications)=>publications.id.includes(req.params.id))

    if(getSpecificPublications.length===0){
        return res.json({error:`no books found for the category of ${req.params.category}`});
    }

    return res.json({book:getSpecificPublications});

})


/*
route         /book/add
description  add new book
access         public
parameter     none
methods        post
*/
booky.post("/book/add",(req,res)=>{
  const {newBook}=req.body;

  database.books.push(newBook);
  return res.json({books:database.books});



})

/*
route         /author/add
description  add new author
access         public
parameter     none
methods        post
*/
booky.post("/author/add",(req,res)=>{
    const {newAuthor}=req.body;
  
    database.author.push(newAuthor);
    return res.json({authors:database.author});
  
  
  
  })

  /*
route         /publications/add
description  add new publications
access         public
parameter     none
methods        post
*/
booky.post("/publications/add",(req,res)=>{
    const {newPublications}=req.body;
  
    database.publications.push(newPublications);
    return res.json({publications:database.publications});
  
  
  
  })

  /*
route         /book/update/title
description  update book title
access         public
parameter     isbn
methods        put
*/
booky.put("/book/update/title/:isbn",(req,res)=>{
    database.books.forEach((book)=>{
        if(book.isbn===req.params.isbn){
            book.title=req.body.newBookTitle;
            return;
        }
    });

   return res.json({books:database.books})  ;
  })


  /*
route         /book/update/title
description  update book title
access         public
parameter     isbn
methods        put
*/
//update book database
booky.put("/book/update/author/:isbn/:authorId",(req,res)=>{
    database.books.forEach((book)=>{
        if(book.isbn===req.params.isbn){
          return  book.title=req.body.authorId;
            
        }
    });
     //update author database
      database.author.forEach((author)=>{
          if(author.id===req.params.authorId)return author.books.push(req.params.isbn);
      })
     return res.json({books:database.books,author:database.author});
  })

  /*
route         /publications/update/book
description  update/add new book to a publications
access         public
parameter    isbn
methods        put
*/

 booky.put("/publications/update/book/:isbn",(req,res)=>{
     //update the publication database
     database.publications.forEach((publication)=>{
         if(publication.id===req.body.pubId){
          return publication.books.push(req.params.isbn);
         }
     });
     //update the book database
 database.books.forEach((book)=>{
    if(book.ISBN===req.params.isbn){
       book.publication=req.body.pubId;
       return;

    }
})
return res.json({books:database.books,publications:database.publications,
    message:"succesfully updated the publications"})
 })
  /*
route         /book/delete
description  delete a book 
access         public
parameter    isbn
methods        delete
*/
 booky.delete("/book/delete/:isbn",(req,res)=>{
        const updatedBookDatabase=database.books.filter((book)=>book.isbn!==req.params.isbn)
        database.books=updatedBookDatabase;
        return res.json({book:database.books});
 });
  /*
route         /book/delete/author
description  to detele an author from a book
access         public
parameter    isbn,authorId
methods        delete
*/
booky.delete("/book/delete/author/:isbn/:authorId",(req,res)=>{
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){
            const newAuthorList=book.authors.filter((author)=>{
                author!==parseInt(req.params.authorId)
            });
            book.authors=newAuthorList;
            return;
        }
    });
    //update the author database
    database.authors.forEach((author)=>{
        if(author.id===parseInt(req.params.authorId)){
            const newBookList =author.books.filter((book)=>book.ISBN!==req.params.isbn);
            author.books=newBookList;
            return;
        }
    })
    return res.json({book:database.books,author:database.authors,message:"author was deleted"});
});
/*
route         /pub/delete
description  delete a publication
access         public
parameter    id
methods        delete
*/
booky.delete("/pub/delete/:id",(req,res)=>{
    const updatedPublicationDatabase=database.publications.filter((publication)=>publication.ID!==req.params.id)
    database.publications=updatedPublicationDatabase;
    return res.json({publication:database.publications});
});
/*
route         /publication/delete/book
description delete a book from publications
access         public,pub id
parameter   isbn,pub id
methods        delete
*/
booky.delete("/publication/delete/book/:isbn/:pubId"),(req,res)=>{
    database.publications.forEach((publication)=>{
        if(publications.id===parseInt(req.params.pubId)){
            const newBookList=publication.books.filter((book)=>book!==req.params.isbn);
            publication.books=newBookList;
            return;
        }
    });
    //update book database
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){
            book.publications=0;
            return;
        }
    })
    return res.json({books:database.books,publication:database.publications})
}
booky.listen(1000,()=>console.log("hey raghul server is running"));