import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL || "";

const database = () => {
  const connect = () => {
    // Connecting to the database
    mongoose
      .connect(MONGODB_URL)
      .then(() => {
        console.log(
          `🟢[${process.env.SNAME}] successfully connected to database`
        );
      })
      .catch((error) => {
        console.log(
          `🔴[${process.env.SNAME}] database connection failed. exiting now...`
        );
        console.error(error);
        process.exit(1);
      });
  };
  return { connect };
};

export default database;
