const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const User = require("../models/user-model");
const Stack = require("../models/stack-model");
const Card = require("../models/card-model");

// Admin password
const ADMIN_PASSWORD = "supersecurepassword";

// Reset Database: Deletes all collections
const resetDatabase = async () => {
  try {
    await mongoose.connection.db.dropDatabase();
    console.log("All User data has been removed.");
  } catch (err) {
    console.error("Error resetting database:", err);
    throw err;
  }
};

const users = [
  {
    username: "admin",
    email: "admin",
    password: "admin",
  },
  {
    username: "test_creator",
    email: "test_creator",
    password: "test_creator",
  },
];

const stacks = [
  {
    name: "General Knowledge",
    description: "A collection of general knowledge trivia cards.",
    cards: [
      { front: "What is the capital of France?", back: "Paris" },
      { front: "Who wrote 'Romeo and Juliet'?", back: "William Shakespeare" },
      {
        front: "What is the boiling point of water at sea level?",
        back: "100°C",
      },
      { front: "How many continents are there on Earth?", back: "Seven" },
      { front: "What is the largest mammal in the world?", back: "Blue Whale" },
      { front: "Which planet is known as the Red Planet?", back: "Mars" },
      { front: "What is the chemical symbol for gold?", back: "Au" },
      { front: "How many colors are in a rainbow?", back: "Seven" },
      { front: "Who painted the Mona Lisa?", back: "Leonardo da Vinci" },
      { front: "What is the smallest prime number?", back: "2" },
      { front: "What is the longest river in the world?", back: "Nile" },
      {
        front: "Who is known as the father of computing?",
        back: "Charles Babbage",
      },
      {
        front: "What is the national flower of Japan?",
        back: "Cherry Blossom",
      },
      { front: "How many sides does a hexagon have?", back: "Six" },
      {
        front: "What is the hardest natural substance on Earth?",
        back: "Diamond",
      },
      { front: "Who discovered gravity?", back: "Isaac Newton" },
      {
        front: "What is the name of the largest ocean on Earth?",
        back: "Pacific Ocean",
      },
      { front: "What is the main ingredient in guacamole?", back: "Avocado" },
      {
        front: "Which country gifted the Statue of Liberty to the USA?",
        back: "France",
      },
      { front: "What is the currency of Japan?", back: "Yen" },
      { front: "Who is the author of 'Harry Potter'?", back: "J.K. Rowling" },
      { front: "How many teeth does an adult human have?", back: "32" },
      { front: "What is the capital city of Australia?", back: "Canberra" },
      {
        front: "What is the smallest planet in our solar system?",
        back: "Mercury",
      },
      { front: "What is the chemical symbol for water?", back: "H₂O" },
      { front: "Who invented the light bulb?", back: "Thomas Edison" },
      { front: "How many legs does a spider have?", back: "Eight" },
      { front: "What is the national language of China?", back: "Mandarin" },
      { front: "What year did the first man land on the Moon?", back: "1969" },
      { front: "What is the largest desert in the world?", back: "Sahara" },
    ],
  },
  {
    name: "Science and Technology",
    description: "Questions about science and technology advancements.",
    cards: [
      { front: "What is the powerhouse of the cell?", back: "Mitochondria" },
      { front: "Who invented the telephone?", back: "Alexander Graham Bell" },
      {
        front: "What does HTTP stand for?",
        back: "Hypertext Transfer Protocol",
      },
      { front: "What is the speed of light?", back: "299,792 km/s" },
      {
        front: "What gas do plants absorb during photosynthesis?",
        back: "Carbon Dioxide",
      },
      {
        front: "What is the most abundant gas in Earth's atmosphere?",
        back: "Nitrogen",
      },
      {
        front: "Who is known as the father of modern physics?",
        back: "Albert Einstein",
      },
      { front: "What does DNA stand for?", back: "Deoxyribonucleic Acid" },
      { front: "What is the unit of electric current?", back: "Ampere" },
      { front: "What is the main component of the Sun?", back: "Hydrogen" },
      {
        front: "What is the symbol for potassium in the periodic table?",
        back: "K",
      },
      {
        front: "What is the device used to measure temperature?",
        back: "Thermometer",
      },
      {
        front: "Who developed the theory of evolution?",
        back: "Charles Darwin",
      },
      { front: "What does AI stand for?", back: "Artificial Intelligence" },
      { front: "What is the chemical formula for table salt?", back: "NaCl" },
      { front: "What is the primary gas used in a neon light?", back: "Neon" },
      {
        front: "What organ in the human body produces insulin?",
        back: "Pancreas",
      },
      { front: "Who invented the World Wide Web?", back: "Tim Berners-Lee" },
      { front: "What is the name of our galaxy?", back: "Milky Way" },
      {
        front: "What does RAM stand for in computers?",
        back: "Random Access Memory",
      },
      { front: "What does MRI stand for?", back: "Magnetic Resonance Imaging" },
      { front: "What is the SI unit of force?", back: "Newton" },
      { front: "Who discovered penicillin?", back: "Alexander Fleming" },
      {
        front: "What is the most common element in the universe?",
        back: "Hydrogen",
      },
      { front: "What is the study of fossils called?", back: "Paleontology" },
      { front: "What does USB stand for?", back: "Universal Serial Bus" },
      {
        front: "Which part of the brain is responsible for balance?",
        back: "Cerebellum",
      },
      { front: "What is the atomic number of oxygen?", back: "8" },
      { front: "What is a group of stars called?", back: "Constellation" },
      {
        front: "Who is known as the father of the internet?",
        back: "Vint Cerf",
      },
    ],
  },
  {
    name: "History and Geography",
    description: "Historical events and geographical wonders.",
    cards: [
      {
        front: "Who was the first President of the United States?",
        back: "George Washington",
      },
      { front: "In which year did World War II end?", back: "1945" },
      {
        front: "What is the tallest mountain in the world?",
        back: "Mount Everest",
      },
      {
        front: "Which ancient civilization built the pyramids?",
        back: "Egyptians",
      },
      { front: "What river flows through London?", back: "Thames" },
      {
        front: "Who discovered America in 1492?",
        back: "Christopher Columbus",
      },
      { front: "What country has the largest land area?", back: "Russia" },
      { front: "In which year did the Titanic sink?", back: "1912" },
      {
        front: "What is the smallest country in the world?",
        back: "Vatican City",
      },
      {
        front: "What is the Great Wall of China primarily made of?",
        back: "Stone and brick",
      },
      { front: "What year did the Berlin Wall fall?", back: "1989" },
      { front: "What is the capital city of Canada?", back: "Ottawa" },
      {
        front: "What is the largest lake in the world by surface area?",
        back: "Caspian Sea",
      },
      {
        front: "Which US state was the last to join the Union?",
        back: "Hawaii",
      },
      {
        front: "Who was the first female Prime Minister of the UK?",
        back: "Margaret Thatcher",
      },
      {
        front: "What is the longest wall in the world?",
        back: "Great Wall of China",
      },
      { front: "What year did man first fly in an airplane?", back: "1903" },
      {
        front: "Who was the last emperor of Rome?",
        back: "Romulus Augustulus",
      },
      {
        front: "Which African country was formerly known as Abyssinia?",
        back: "Ethiopia",
      },
      {
        front: "What is the southernmost continent called?",
        back: "Antarctica",
      },
      {
        front: "Who was the first man to circumnavigate the globe?",
        back: "Ferdinand Magellan",
      },
      { front: "What is the largest island in the world?", back: "Greenland" },
      {
        front: "Which ancient city is known for its hanging gardens?",
        back: "Babylon",
      },
      {
        front: "Who was the first person to sail solo around the world?",
        back: "Joshua Slocum",
      },
      { front: "What country has the most volcanoes?", back: "Indonesia" },
      { front: "Who was known as the Iron Lady?", back: "Margaret Thatcher" },
      {
        front: "What is the largest country in South America?",
        back: "Brazil",
      },
      { front: "What year did the American Civil War begin?", back: "1861" },
      {
        front: "Who signed the Magna Carta in 1215?",
        back: "King John of England",
      },
      { front: "Which country is home to the Andes mountains?", back: "Chile" },
    ],
  },
];

const initializeData = async () => {
  try {
    // Initialize users
    for (const user of users) {
      const hashed_pw = await bcrypt.hash(user.password, 10);
      await User.create({
        username: user.username,
        email: user.email,
        password: hashed_pw,
      });
    }

    // Initialize stacks
    const test_creator = await User.findOne({ username: "test_creator" });
    if (!test_creator) {
      throw new Error(
        "test_creator user not found. Cannot proceed with stack initialization.",
      );
    }

    for (const stack of stacks) {
      const newStack = await Stack.create({
        name: stack.name,
        description: stack.description,
        published: true,
        creator: test_creator,
      });

      for (const card of stack.cards) {
        await Card.create({
          front: card.front,
          back: card.back,
          stack: newStack,
        });
      }
    }

    console.log("Database has been successfully initialized.");
  } catch (error) {
    console.error("Error during database initialization:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

// Serve Admin Page
exports.getAdminPage = (req, res) => {
  const adminPageHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Admin Panel</title>
    </head>
    <body>
        <h1>Admin Panel</h1>
        <form method="POST" action="/admin">
            <label for="password">Admin Password:</label>
            <input type="password" id="password" name="password" required>
            <br><br>
            <button type="submit" name="action" value="reset">Reset Database</button>
            <button type="submit" name="action" value="initialize">Initialize Data</button>
        </form>
    </body>
    </html>
    `;
  res.send(adminPageHTML);
};

// Handle Admin Actions
exports.handleAdminAction = async (req, res) => {
  const { password, action } = req.body;
  if (password !== ADMIN_PASSWORD) {
    return res.status(403).send("<h1>Access Denied: Incorrect Password</h1>");
  }

  try {
    if (action === "reset") {
      await resetDatabase();
      res.send(
        '<h1>Database has been reset!</h1><a href="/admin">Back to Admin</a>',
      );
    } else if (action === "initialize") {
      await initializeData();
      res.send(
        '<h1>Database has been initialized!</h1><a href="/admin">Back to Admin</a>',
      );
    } else {
      res
        .status(400)
        .send('<h1>Invalid action</h1><a href="/admin">Back to Admin</a>');
    }
  } catch (err) {
    res
      .status(500)
      .send('<h1>Internal Server Error</h1><a href="/admin">Back to Admin</a>');
  }
};
