import mongoose from "mongoose";
export class ConnectDatabase {
  static async connect() {
    const DB_URL = `mongodb+srv://phonghaobds:phonghaobds@fellox.m59cdld.mongodb.net/?retryWrites=true&w=majority`;

    mongoose.set("strictQuery", true);

    await mongoose
      .connect(DB_URL)

      .then(() => console.log("DB Connected!"))

      .catch((error) => console.log("DB connection error:", error.message));
  }
}
