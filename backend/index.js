const express = require("express");
const cors = require("cors");
const { faker } = require("@faker-js/faker");
const PORT = 5000;
const app = express();
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const uri = `mongodb+srv://ph-assign-11:50SP9EQFECJt7RHd@cluster0.nxpijbg.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const emberPostCollection = client.db("ember-project").collection("libraries");
const emberLibraries = client.db("ember-project").collection("libraries");

const emailInvitations = client
  .db("ember-project")
  .collection("emailInvitations");
const emberAuthors = client.db("ember-project").collection("authors");
const emberBooks = client.db("ember-project").collection("books");

app.post("/posts", async (req, res) => {
  const title = req.body.post.title;

  const result = await emberPostCollection.insertOne({ title });
  if (result?.acknowledged) {
    return res.send({ _id: result.insertedId.toString(), title });
  } else {
    return res.send({ success: false, message: "post added failed" });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const query = {};
    const cursor = emberPostCollection.find(query);
    const allPosts = await cursor.toArray();
    res.status(200).json(allPosts);
  } catch (error) {
    console.log(error);
  }
});
app.get("/blogs", async (req, res) => {
  try {
    const query = {};
    const cursor = emberPostCollection.find(query);
    const allPosts = await cursor.toArray();
    res.status(200).json({
      blogs: allPosts,
    });
  } catch (error) {
    console.log(error);
  }
});
app.get("/tasks", async (req, res) => {
  try {
    const query = {};
    const cursor = emberPostCollection.find(query);
    const allPosts = await cursor.toArray();
    res.status(200).json({
      tasks: allPosts,
    });
  } catch (error) {
    console.log(error);
  }
});
app.get("/bookLibraries", async (req, res) => {
  try {
    const query = {};
    const cursor = emberPostCollection.find(query);
    const allPosts = await cursor.toArray();
    res.status(200).json({
      bookLibrary: allPosts,
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await emberPostCollection.findOne(query);

  res.status(200).json({
    _id: req.params.id,
  });
});
app.put("/posts/:id", async (req, res) => {
  const newTitle = req.body.post.title;

  const id = req.params.id;
  const result = await emberPostCollection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        title: newTitle,
      },
    }
  );

  return res.status(200).json({
    _id: id,
    title: newTitle,
  });
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await emberPostCollection.deleteOne({ _id: new ObjectId(id) });
    return res.send({
      _id: id,
    });
  } catch (err) {
    console.log(err);
  }
});

// for ember books library project

// post email invitation

app.post("/emailInvitations", async (req, res) => {
  const email = req.body?.emailInvitation?.email;

  const result = await emailInvitations.insertOne({ email });
  if (result?.acknowledged) {
    return res.send({
      emailInvitation: { _id: result.insertedId.toString(), email },
    });
  } else {
    return res.send({ success: false, message: "email added failed" });
  }
});

// get all email invitations

app.get("/emailInvitations", async (req, res) => {
  try {
    const query = {};
    const cursor = emailInvitations.find(query);
    const allInvitations = await cursor.toArray();
    res.status(200).send({
      emailInvitation: allInvitations,
    });
  } catch (error) {
    console.log(error);
  }
});

// for libraries get

app.get("/libraries", async (req, res) => {
  try {
    const query = {};
    const cursor = emberLibraries.find(query);
    const allLibraries = await cursor.toArray();
    res.status(200).send({
      library: allLibraries,
    });
  } catch (error) {
    console.log(error);
  }
});

// for libraries post

app.post("/libraries", async (req, res) => {
  const libraryNumber = req.body?.library?.libraryNumber;
  const name = req.body?.library?.name;
  const address = req.body?.library?.address;
  const phone = req.body?.library?.phone;
  if (libraryNumber) {
    let allLibraryData = [];

    function generateFaakeData() {
      const name = faker.name.firstName();
      const address = faker.address.country();
      const phone = faker.phone.number();

      allLibraryData.push({ name, address, phone });
    }

    for (let i = 1; i <= libraryNumber; i++) {
      generateFaakeData();
    }
    const result = await emberLibraries.insertMany(allLibraryData);
    console.log(result);

    return res.send({ library: { _id: "feds", allLibraryData } });
  } else {
    const result = await emberLibraries.insertOne({ name, address, phone });
    if (result?.acknowledged) {
      return res.send({
        library: { _id: result.insertedId.toString(), name, address, phone },
      });
    } else {
      return res.send({ success: false, message: "library added failed" });
    }
  }
});

app.get("/libraries/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await emberLibraries.findOne(query);
  res.send({
    library: {
      _id: result._id.toString(),
      name: result.name,
      address: result.address,
      phone: result.phone,
    },
  });
});

// update

app.put("/libraries/:id", async (req, res) => {
  const body = req.body;

  const id = req.params.id;
  const name = req.body?.library?.name;
  const address = req.body?.library?.address;
  const phone = req.body?.library?.phone;
  const result = await emberLibraries.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        name,
        address,
        phone,
      },
    }
  );
  if (result?.acknowledged) {
    return res.send({ library: { _id: req.params.id, name, address, phone } });
  } else {
    return res.send({ success: false, message: "library updated failed" });
  }
});

app.delete("/libraries/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await emberLibraries.deleteOne({ _id: new ObjectId(id) });
    return res.send({
      library: { _id: id },
    });
  } catch (err) {
    console.log(err);
  }
});

// for author
// create author

app.post("/authors", async (req, res) => {
  const name = req.body?.author?.name;

  const result = await emberAuthors.insertOne({ name });
  if (result?.acknowledged) {
    return res.send({ author: { _id: result.insertedId.toString(), name } });
  } else {
    return res.send({
      author: { success: false, message: "author added failed" },
    });
  }
});

// get all author
app.get("/authors", async (req, res) => {
  try {
    const query = {};
    const cursor = emberAuthors.find(query);
    const allAuthors = await cursor.toArray();
    res.status(200).send({
      author: allAuthors,
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/authors/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await emberAuthors.findOne(query);
  return res.send(
    {author:{
    _id: result._id.toString(),
    name: result.name,
  }});
});

app.put("/authors/:id", async (req, res) => {
  const id = req.params.id;
  const name = req.body?.author?.name;

  const result = await emberAuthors.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        name,
      },
    }
  );
  if (result?.acknowledged) {
    return res.send({ author: { _id: req.params.id, name } });
  } else {
    return res.send({ success: false, message: "library updated failed" });
  }
});

app.delete("/authors/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await emberAuthors.deleteOne({ _id: new ObjectId(id) });
    return res.send({
      author: { _id: id },
    });
  } catch (err) {
    console.log(err);
  }
});


// for create books

app.post("/books", async (req, res) => {
  const title = req.body?.book?.title;
  const releaseYear = req.body?.book?.releaseYear;
  const author = req.body?.book?.author;
  const library = req.body?.book?.library;
  console.log(req.body);

  const result = await emberBooks.insertOne({
    title,
    releaseYear,
    author,
    library,
  });
  if (result?.acknowledged) {
    return res.send({
      book: {
        _id: result.insertedId.toString(),
        title,
        releaseYear,
        author,
        library,
      },
    });
  } else {
    return res.send({
      book: { success: false, message: "author added failed" },
    });
  }
});

// get all books

app.get("/books", async (req, res) => {
  try {
    const query = {};
    const cursor = emberBooks.find(query);
    const allBooks = await cursor.toArray();
    res.status(200).send({
      book: allBooks,
    });
  } catch (error) {
    console.log(error);
  }
});

// update book

app.put("/books/:id", async (req, res) => {
  const id = req.params.id;
  const author = req.body?.book?.author;
  const title = req.body?.book?.title;
  const library = req.body?.book?.library

 
  const result = await emberBooks.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        author,title,library
      },
    }
  );
  if (result?.acknowledged) {
    return res.send({ book: { _id: req.params.id, author,title,library } });
  } else {
    return res.send({
      book: { success: false, message: "library updated failed" },
    });
  }




  // if (result.author !== author) {

  //   const result = await emberBooks.updateOne(
  //     { _id: new ObjectId(id) },
  //     {
  //       $set: {
  //         author,
  //       },
  //     }
  //   );
  //   if (result?.acknowledged) {
  //     return res.send({ book: { _id: req.params.id, author } });
  //   } else {
  //     return res.send({
  //       book: { success: false, message: "library updated failed" },
  //     });
  //   }


  // } else {

  //   const result = await emberBooks.updateOne(
  //     { _id: new ObjectId(id) },
  //     {
  //       $set: {
  //         title,
  //       },
  //     }
  //   );
  //   if (result?.acknowledged) {
  //     return res.send({ book: { _id: req.params.id, title } });
  //   } else {
  //     return res.send({
  //       book: { success: false, message: "library updated failed" },
  //     });
  //   }
  // }

  
});

app.get("/books/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await emberBooks.findOne(query);
  return res.send(
    {book:{
    _id: result._id.toString(),
    title: result.title,
  }});
});

app.delete("/books/:id",async(req,res) => {
  try {
    const id = req.params.id;
    await emberBooks.deleteOne({ _id: new ObjectId(id) });
    return res.send({book:{
      _id: id,
    }});
  } catch (err) {
    console.log(err);
  }
})

app.listen(PORT, () => {
  console.log(`server listen on port ${PORT}`);
});
