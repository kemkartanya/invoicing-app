import { useState, useEffect } from "react";
import "./App.css";
import EditableTable from "./components/EditableTable";

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
          <div>
            <strong>Quantity</strong> <br />
            <input
              value={invoice.qty}
              onChange={handleInputChange}
              className="bg-black text-white border rounded p-1 w-full mt-1"
              type="number"
              name="qty"
              required
              placeholder="i.e. 10"
            />
          </div>
          <div>
            <strong>Price</strong> <br />
            <input
              value={invoice.price}
              onChange={handleInputChange}
              className="bg-black text-white border rounded p-1 w-full mt-1"
              type="number"
              placeholder="in Rs."
              required
              name="price"
            />
          </div>
          <div>
            <strong>Discount %</strong> <br />
            <input
              value={invoice.discountPercent}
              onChange={handleInputChange}
              className="bg-black text-white border rounded p-1 w-full mt-1"
              type="number"
              name="discountPercent"
              required
              placeholder="in %"
            />
          </div>

          <div>
            <strong>Discount</strong> <br />
            <input
              value={invoice.discount}
              onChange={handleInputChange}
              className="bg-black text-white border rounded p-1 w-full mt-1"
              type="number"
              name="discount"
              required
              placeholder="i.e. 100"
            />
          </div>

          <div>
            <strong>Tax %</strong> <br />
            <input
              value={invoice.taxPercent}
              onChange={handleInputChange}
              className="bg-black text-white border rounded p-1 w-full mt-1"
              type="number"
              name="taxPercent"
              required
              placeholder="in %"
            />
          </div>

          <div>
            <strong>Tax</strong> <br />
            <input
              value={invoice.tax}
              onChange={handleInputChange}
              className="bg-black text-white border rounded p-1 w-full mt-1"
              type="number"
              name="tax"
              required
              placeholder="i.e. 90"
            />
          </div>

          <div>
            <label>Total Price:</label>
            <input
              type="number"
              name="totalPrice"
              required
              className="bg-black text-white border rounded p-1 w-full mt-1"
              value={invoice.totalPrice}
              onChange={handleInputChange}
            />
          </div>
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
