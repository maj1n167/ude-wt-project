# WIP
# looking for a way to have one dev runner,
# who launches mongodb, server and client.
# backend and frontend should be hotswapping
# when finished, add to run configurations

# check current directory
current_dir=${PWD##*/}
current_dir=${current_dir:-/} # to correct for the case where PWD=/
if [[ "$current_dir" == "scripts" ]]; then
  echo "need to run the script from the project directory"
  exit 1
fi

# Step 1: Launch MongoDB with Docker
echo "Starting MongoDB..."
cd scripts/
docker-compose up -d mongo

# Step 2: Install dependencies (if needed)
# Optionally, you can check if node_modules exist before installing.
echo "Installing dependencies for server and client..."
cd ../server && npm install
cd ../client && npm install
cd ..

# Step 3: Start server and client with hot-reloading
echo "Starting server and client with hot-reloading..."
npx concurrently \
    "cd server && npx nodemon app.js" \
    "cd client && npm run dev"
