const { MongoClient, Db } = require("mongodb");

const MongoScript = async () => {
  const uri =
    "mongodb+srv://baldeepsharma:fullstack@cluster0.nw8eqzz.mongodb.net/";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
  try {
    await client.connect(); // connect to MongoDB
    console.log("[Connected to MongoDB]");


    const db = client.db("knowlegde-cove"); // create or access a db in cluster
    const collections = {};
    const counterCollection=db.collection('counters'); // create or access counters collections
await counterCollection.deleteMany({_id: 'books'}); // delete all documents with _id

    const dbCollectionsList = [
      "users",
      "usersInfo",
      "books",
      "rooms",
      "libBranches",
      "booksStock",
      "cart",
      "booksIssd",
    ];

    for (let collectionName of dbCollectionsList) {
      collections[collectionName] = db.collection(collectionName); // create or access employees collections
      collections[collectionName].deleteMany({}); // delete existing documents
    }
    const bookDB = [
      {
        book_id: 1,
        book_name: "This summer will be different",
        book_author: "Jane Smith",
        book_genre: "Romance",
        book_shortDescription: "A summer romance that changes everything.",
        book_longDescription:
          "In This Summer Will Be Different,Jane Smith weaves a tale of love, growth, and self-discovery. Follow the journey of a young woman as she navigates the complexities of relationships and finds herself in the process. This summer, love isn't just a fleeting affair; it's a transformative experience.",
          book_image_url:'/Images/book.jpg',
        
        },
      {
        book_id: 2,
        book_name: "Not Without My sister",
        book_author: "Sarah McDonald",
        book_genre: "Biography",
        book_shortDescription:
          "A heartfelt story of sibling bonds and resilience.",
        book_longDescription:
          "Sarah McDonald’s Not Without My Sister is a poignant biography that delves into the unbreakable bond between sisters. Chronicling their struggles and triumphs, this book is a testament to the enduring power of family and the strength found in unity. A deeply personal and inspiring read, it highlights the importance of perseverance and love",
          book_image_url: "/Images/book2.jpg",  
        },
      {
        book_id: 3,
        book_name: "You Like It Darker",
        book_author: "Leonard Cohen",
        book_genre: "Mystery",

        book_shortDescription: "A gripping mystery shrouded in darkness.",
        book_longDescription:
          "You Like It Darker is Leonard Cohen's enigmatic mystery novel that draws readers into a world of suspense and intrigue. With complex characters and a plot full of twists and turns, this book explores the darker aspects of human nature and the secrets that lie hidden in the shadows. It's a thrilling journey that keeps readers guessing until the very end.",
          book_image_url: "/Images/book3.jpg",  
        },
      {
        book_id: 4,
        book_name: "The Mountain is You",
        book_author: "Brianna Wiest",
        book_genre: "Self-help",

        book_shortDescription:
          "Overcoming obstacles and embracing personal growth.",
        book_longDescription:
          "Brianna Wiest’s The Mountain is You is a self-help guide that empowers readers to face their internal challenges head-on. Through insightful advice and practical strategies, Wiest encourages readers to transform their struggles into opportunities for growth. This book is a motivational companion for anyone looking to conquer their personal mountains and achieve lasting change.",
          book_image_url: "/Images/book4.jpg",  
        },
      {
        book_id: 5,
        book_name: "SkyShade",
        book_author: "Aiden Ross",
        book_genre: "Fantasy",

        book_shortDescription:
          "An epic fantasy adventure across mystical realms",
        book_longDescription:
          "SkyShade by Aiden Ross is an enthralling fantasy novel that transports readers to a world filled with magic and wonder. Follow the protagonist as they embark on a perilous journey to save their kingdom from a looming threat. With richly detailed landscapes and a cast of unforgettable characters, this book is a must-read for fantasy enthusiasts seeking an epic adventure",
          book_image_url: "/Images/book5.jpg",  
        },
      {
        book_id: 6,
        book_name: "Destination Happiness",
        book_author: "Samantha Ford",
        book_genre: "Self-help",

        book_shortDescription:
          " Your guide to finding true happiness and fulfillment.",
        book_longDescription:
          "In Destination Happiness,Samantha Ford provides a comprehensive roadmap to achieving a joyful and fulfilling life. Through a blend of scientific research and personal anecdotes, Ford explores the key factors that contribute to happiness. This self-help book offers practical tips and exercises to help readers cultivate positivity and well-being in their everyday lives.",
          book_image_url: "/Images/book6.jpg",  
        },
      {
        book_id: 7,
        book_name: "Things we never get over",
        book_author: "Lucy Score",
        book_genre: "Romance",

        book_shortDescription: "A heartfelt romance about love and healing",
        book_longDescription:
          "Things We Never Get Over by Lucy Score is a touching romance novel that delves into themes of love, loss, and healing. The story follows two individuals who, despite their past heartbreaks, find solace and love in each other. Score’s emotive storytelling and relatable characters make this a compelling read for anyone who believes in second chances and the power of love.",
          book_image_url: "/Images/book7.jpg",  
        },
      {
        book_id: 8,
        book_name: "Fear your last breath",
        book_author: "Alex North",
        book_genre: "Thriller",

        book_shortDescription:
          "A chilling thriller that will leave you breathless.",
        book_longDescription:
          "Alex North's Fear Your Last Breath is a spine-tingling thriller that keeps readers on the edge of their seats. The narrative follows a series of mysterious and deadly events that unravel in a small town, with suspense building to a heart-pounding climax. North’s masterful writing and unpredictable plot twists make this a must-read for fans of the thriller genre.",
          book_image_url: "/Images/book8.jpg",  
        },
      {
        book_id: 9,
        book_name: "Fourth Wing",
        book_author: "Rebecca Yarros",
        book_genre: "Fantasy",

        book_shortDescription: "A fantastical tale of courage and destiny.",
        book_longDescription:
          "Fourth Wing by Rebecca Yarros is a captivating fantasy novel that tells the story of a young hero destined for greatness. Set in a world where mythical creatures and powerful magic reign supreme, the protagonist must navigate a path filled with danger and destiny. Yarros's imaginative world-building and dynamic characters make this an enthralling read for fantasy lovers.",
          book_image_url: "/Images/book9.jpg",  
        },
        {
          book_id: 10,
          book_name: "Shattered Memories",
          book_author: "Nicole Snow",
          book_genre: "Romantic",
          book_shortDescription: "A love story entangled with suspense and danger.",
          book_longDescription:
            "Nicole Snow’s Shattered Memories is a romantic thriller that blends love with suspense. The protagonist grapples with haunting memories and a new romantic interest, leading to a journey filled with danger and passion. Snow’s narrative weaves an intricate tale that keeps readers hooked from start to finish.",
          book_image_url: "/Images/book10.jpg",
        },
        {
          book_id: 11,
          book_name: "Echoes of the Past",
          book_author: "Mark Edwards",
          book_genre: "Horror",
          book_shortDescription: "A chilling tale of haunted secrets.",
          book_longDescription:
            "Echoes of the Past by Mark Edwards is a horror novel that delves into the terrifying secrets of a small town. The protagonist uncovers hidden truths that should have remained buried, leading to a series of horrifying events. Edwards's eerie storytelling and atmospheric writing make this a spine-chilling read.",
          book_image_url: "/Images/book11.jpg",
        },
        {
          book_id: 12,
          book_name: "Rising Tides",
          book_author: "Katherine Quinn",
          book_genre: "Fiction",
          book_shortDescription: "A historical saga of love and resilience.",
          book_longDescription:
            "Rising Tides by Katherine Quinn is a historical fiction novel set against the backdrop of World War II. The story follows a courageous woman navigating the challenges of war and love. Quinn’s rich historical detail and compelling characters create an immersive reading experience.",
          book_image_url: "/Images/book12.jpg",
        },  
    ];
    await collections["books"].insertMany(bookDB); // Insert books data
    const count = await collections["books"].countDocuments();
    console.log(`Inserted ${count} documents into 'books' collection.`);
    await collections["users"].createIndex({ user_id: 1 });
    await collections["users"].createIndex({ membership_number: 1 });
    await collections["users"].createIndex({ username: 1 });
    await collections["users"].createIndex({ password: 1 });

    await collections["usersInfo"].createIndex({ user_id: 1 });
    await collections["usersInfo"].createIndex({ name: 1 });
    await collections["usersInfo"].createIndex({ phone: 1 });
    await collections["usersInfo"].createIndex({ address: 1 });
    await collections["usersInfo"].createIndex({ dob: 1 });
    await collections["usersInfo"].createIndex({ email: 1 });

    await collections["books"].createIndex({ book_id: 1});
    await collections["books"].createIndex({ book_name: 1 });
    await collections["books"].createIndex({ book_shortDescription: 1 });
    await collections["books"].createIndex({ book_longDescription: 1 });
    await collections["books"].createIndex({ book_author: 1 });
    await collections["books"].createIndex({ book_genre: 1 });
    await collections["books"].createIndex({ book_image_url: 1 });

    await counterCollection.insertOne({ _id: 'books', current: count });
    await collections["rooms"].createIndex({ room_num: 1 });
    await collections["rooms"].createIndex({ room_booked: 1 });
    await collections["rooms"].createIndex({ date_time: 1 });
    await collections["rooms"].createIndex({ booked_by: 1 });

    await collections["libBranches"].createIndex({ branch_id: 1 });
    await collections["libBranches"].createIndex({ branch_location: 1 });

    await collections["cart"].createIndex({ membership_number: 1 });
    await collections["cart"].createIndex({ book_id: 1 });

    await collections["booksStock"].createIndex({ book_id: 1 });
    await collections["booksStock"].createIndex({ branch_id: 1 });
    await collections["booksStock"].createIndex({ avail_quantity: 1 });

    await collections["booksIssd"].createIndex({ book_id: 1 });
    await collections["booksIssd"].createIndex({ membership_number: 1 });
    await collections["booksIssd"].createIndex({ issue_date: 1 });
    await collections["booksIssd"].createIndex({ exp_date: 1 });

  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
};

MongoScript();
