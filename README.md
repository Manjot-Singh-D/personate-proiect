# Getting Started with Create React App

## 1. Go to the root directory and run `npm install` - This will create a `node_modules` folder in the root directory.

## 2. Create a `.env` file in root directory and paste next 5 lines into the file:

        REACT_APP_AWS_BUCKET_NAME=YOUR_BUCKET_NAME
        REACT_APP_REGION=YOUR_BUCKET_REGION
        REACT_APP_ACCESS_KEY_ID=YOUR_ACCESS_KEY_ID
        REACT_APP_SECRET_ACCESS_KEY=YOUR_SECRET_ACCESS_KEY
        REACT_APP_OBJECT_URL=https://${REACT_APP_AWS_BUCKET_NAME}.s3.${REACT_APP_REGION}.amazonaws.com/

## 3. Run the project by `npm run start`
