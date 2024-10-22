
# check current directory
current_dir=${PWD##*/}
current_dir=${current_dir:-/} # to correct for the case where PWD=/
if [[ "$current_dir" == "scripts" ]]; then
  echo "need to run the script from the project directory"
  exit 1
fi

# Step 1: Launch MongoDB with Podman
echo "Starting MongoDB..."
cd scripts/
podman-compose up -d mongo

# Step 2: Install dependencies (if needed)
echo "Installing dependencies for server and client..."
cd ../server && npm install --include=dev
cd ../client && npm install --include=dev
cd ..

# Step 3: Start server and client with hot-reloading
echo "Starting server and client with hot-reloading..."
npx concurrently \
    "cd server && npx nodemon app.js" \
    "cd client && npm start"
