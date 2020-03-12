export STATIC_DIR=/static 
export DB_FILE=keepclone.db
export COOKIE_STORE_KEY=$(uuidgen | base64)
export SESSION_STORE_KEY=$(uuidgen | base64)
./server