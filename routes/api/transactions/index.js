import express from "express";

import {
  addTransactionValidation,
  patchingTransactionValidation,
  patchingTransactionFavoriteValidation,
  idValidation,
  queryValidations,
} from "./validation";
import {
  getTransactions,
  getTransactionById,
  createTransaction,
  removeTransaction,
  updateTransaction,
} from "../../../controllers/transactions/index";
import { guard } from "../../../middlewares/guard";

const transactionsRouter = express.Router();

transactionsRouter.get("/", [guard, queryValidations], getTransactions);

transactionsRouter.get("/:id", [guard, idValidation], getTransactionById);

transactionsRouter.post(
  "/",
  [guard, addTransactionValidation],
  createTransaction
);

transactionsRouter.delete("/:id", [guard, idValidation], removeTransaction);

transactionsRouter.put(
  "/:id",
  [guard, idValidation, patchingTransactionValidation],
  updateTransaction
);

transactionsRouter.patch(
  "/:id/favorite",
  [guard, idValidation, patchingTransactionFavoriteValidation],
  updateTransaction
);

export default transactionsRouter;
