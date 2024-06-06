const { MongoClient, Db } = require('mongodb');

const MongoScript = async () => {
  const uri = 'mongodb+srv://harjinder07:sunnysingh123@cluster0.mvfmzda.mongodb.net/'
  const client = new MongoClient(uri); 

  try {
    await client.connect(); // connect to MongoDB
    console.log('[Connected to MongoDB]');

    const db = client.db('knowlegde-cove'); // create or access a db in cluster
    const collections = {}

    const dbCollectionsList = ['users', 'usersInfo', 'books', 'rooms', 'libBranches', 'booksStock', 'cart', 'booksIssd' ]
    
    for (let collectionName of dbCollectionsList) {
      collections[collectionName] = db.collection(collectionName); // create or access employees collections
      collections[collectionName].deleteMany({}); // delete existing documents
    }

    await collections['users'].createIndex({user_id: 1});
    await collections['users'].createIndex({membership_number: 1});
    await collections['users'].createIndex({username: 1});
    await collections['users'].createIndex({password: 1});

    await collections['usersInfo'].createIndex({user_id: 1});
    await collections['usersInfo'].createIndex({name: 1});
    await collections['usersInfo'].createIndex({phone: 1});
    await collections['usersInfo'].createIndex({address: 1});
    await collections['usersInfo'].createIndex({dob: 1});

    await collections['books'].createIndex({book_id: 1});
    await collections['books'].createIndex({book_name: 1});
    await collections['books'].createIndex({book_title: 1});
    await collections['books'].createIndex({book_author: 1});
    await collections['books'].createIndex({book_genre: 1});


    await collections['rooms'].createIndex({room_num: 1});
    await collections['rooms'].createIndex({room_booked: 1});
    await collections['rooms'].createIndex({date_time: 1});
    await collections['rooms'].createIndex({booked_by: 1});

    await collections['libBranches'].createIndex({branch_id: 1});
    await collections['libBranches'].createIndex({branch_location: 1});
    
    await collections['cart'].createIndex({membership_number: 1});
    await collections['cart'].createIndex({book_id: 1});
    
    await collections['booksStock'].createIndex({book_id: 1});
    await collections['booksStock'].createIndex({branch_id: 1});
    await collections['booksStock'].createIndex({avail_quantity: 1});

    await collections['booksIssd'].createIndex({book_id: 1});
    await collections['booksIssd'].createIndex({membership_number: 1});
    await collections['booksIssd'].createIndex({issue_date: 1});
    await collections['booksIssd'].createIndex({exp_date: 1});
    
    
  } catch (error) {
    console.log(error);
    
  } finally {
    client.close();
  }
}

MongoScript();