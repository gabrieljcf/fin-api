import express, { NextFunction, Request, Response } from "express";
import { v4 as uuid } from "uuid"

const app = express();
app.use(express.json());

interface Customers {
  id: string
  name: string
  cpf: string
  statement: []
}

const customers: Customers[] = [];

const verifyIfExistsAccount = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const { cpf } = request.headers;

  const customer = customers.find(customer => customer.cpf === cpf);

  if (!customer)
    return response.status(404).json({ error: "Customer not found!" });

  request.customer = customer
  return next();
}

app.post("/count", (request, response) => {
  const { cpf, name } = request.body;
  const customerAlreadyExists = customers.some(customer => customer.cpf === cpf)

  if (customerAlreadyExists)
    return response.status(400).json({ error: "Customer already exists!" });

  customers.push({
    id: uuid(),
    name,
    cpf,
    statement: []
  });

  return response.status(201).send();
});

app.get("/statement", verifyIfExistsAccount, (request, response) => {
  const { customer } = request;

  return response.json(customer?.statement)
});

app.listen(3333, () => console.log("Server start on PORT 3333"));