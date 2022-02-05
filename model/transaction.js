import mongoose from "mongoose";
const { Schema, SchemaTypes, model } = mongoose;

const transactionSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for transaction"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

const Transaction = model("transaction", transactionSchema);
export default Transaction;
