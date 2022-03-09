import express from "express";
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

app.post("/count", (request, response) => {
  const { cpf, name } = request.body;
  const customerAlreadyExists = customers.some(customer => customer.cpf === cpf)

  if (customerAlreadyExists) {
    return response.status(400).json({ error: "Customer already exists!" });
  }

  customers.push({
    id: uuid(),
    name,
    cpf,
    statement: []
  });
  return response.status(201).send()
})

app.listen(3333, () => console.log("Server start on PORT 3333"));