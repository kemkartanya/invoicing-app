import { useState, useEffect } from "react";
import "./App.css";
import EditableTable from "./components/EditableTable";

export const inputs = [
  { label: "Quantity", value: "qty" },
  { label: "Price", value: "price" },
  { label: "Discount %", value: "discountPercent" },
  { label: "Discount", value: "discount" },
  { label: "Tax %", value: "taxPercent" },
  { label: "Tax", value: "tax" },
  { label: "Total Price", value: "totalPrice" },
];

function App() {
  const [invoice, setInvoice] = useState({
    qty: "",
    price: "",
    discount: "",
    discountPercent: "",
    tax: "",
    taxPercent: "",
    totalPrice: "",
  });
  const [data, setData] = useState([
    {
      id: 1,
      qty: 2,
      price: 100,
      discountPercent: 10,
      discount: 100,
      taxPercent: 5,
      tax: 50,
      totalPrice: 200,
    },
    {
      id: 2,
      qty: 2,
      price: 100,
      discountPercent: 10,
      discount: 100,
      taxPercent: 5,
      tax: 50,
      totalPrice: 200,
    },
    {
      id: 3,
      qty: 2,
      price: 100,
      discountPercent: 10,
      discount: 100,
      taxPercent: 5,
      tax: 50,
      totalPrice: 200,
    },
  ]);

  const addNewInvoice = (e) => {
    e.preventDefault();

    setData([...data, { ...invoice, id: data.length + 1 }]);
    setInvoice({
      qty: "",
      price: "",
      discount: "",
      discountPercent: "",
      tax: "",
      taxPercent: "",
      totalPrice: "",
    });
  };

  const calculateValues = (field, value) => {
    let newInvoice = { ...invoice, [field]: value };

    const subtotal = newInvoice.qty * newInvoice.price;
    newInvoice.discount = subtotal * (newInvoice.discountPercent / 100);
    const afterDiscount = subtotal - newInvoice.discount;
    newInvoice.tax = afterDiscount * (newInvoice.taxPercent / 100);
    newInvoice.totalPrice = afterDiscount + newInvoice.tax;

    return newInvoice;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newInvoice = calculateValues(name, parseFloat(value) || 0);
    setInvoice(newInvoice);
  };

  useEffect(() => {
    const newInvoice = calculateValues("qty", invoice.qty);
    setInvoice(newInvoice);
  }, []);

  return (
    <>
      <div className="text-2xl text-blue-600 font-bold m-3">
        Create your invoice
      </div>

      <form onSubmit={addNewInvoice} className="flex flex-col gap-5 m-12">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
          {inputs.map((input, index) => (
            <div key={index}>
              <strong>{input.label}</strong> <br />
              <input
                value={invoice[input.value]}
                onChange={handleInputChange}
                className="bg-black text-white border rounded p-1 w-full mt-1"
                type="number"
                name={input.value}
                required
                placeholder={`i.e. ${input.label}`}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 py-2 px-6 text-lg rounded-xl"
          >
            Create Invoice
          </button>
        </div>
      </form>

      <EditableTable data={data} setData={setData} />
    </>
  );
}

export default App;
