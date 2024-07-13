import React, { useState, useEffect } from "react";
import { FaEdit, FaSave, FaPlus } from "react-icons/fa";

const EditableTable = ({ data, setData }) => {
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleEdit = (id) => {
    setEditingRow(id);
    setEditedData(data.find((row) => row.id === id));
  };

  const handleSave = () => {
    const newData = data.map((row) =>
      row.id === editingRow ? { ...row, ...editedData } : row
    );
    setData(newData);
    setEditingRow(null);
    setEditedData({});
  };

  const calculateValues = (field, value) => {
    let newInvoice = { ...editedData, [field]: value };

    const subtotal = newInvoice.qty * newInvoice.price;
    newInvoice.discount = subtotal * (newInvoice.discountPercent / 100);
    const afterDiscount = subtotal - newInvoice.discount;
    newInvoice.tax = afterDiscount * (newInvoice.taxPercent / 100);
    newInvoice.totalPrice = afterDiscount + newInvoice.tax;

    return newInvoice;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const newInvoice = calculateValues(name, parseFloat(value) || 0);
    setEditedData(newInvoice);
  };

  useEffect(() => {
    const newInvoice = calculateValues("qty", editedData.qty);
    setEditedData(newInvoice);
  }, []);

  return (
    <div className="container mx-auto mt-8 px-4">
      <div className="text-xl my-2 text-left">Recent Invoices</div>
      <div className="hidden sm:block">
        <table className="min-w-full bg-white border border-gray-300 text-black">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">S. No.</th>
              <th className="px-4 py-2 border-b">Quantity</th>
              <th className="px-4 py-2 border-b">Price</th>
              <th className="px-4 py-2 border-b">Discount %</th>
              <th className="px-4 py-2 border-b">Discount</th>
              <th className="px-4 py-2 border-b">Tax %</th>
              <th className="px-4 py-2 border-b">Tax</th>
              <th className="px-4 py-2 border-b">Total Price</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td className="px-4 py-2 border-b">{row.id}</td>
                <td className="px-4 py-2 border-b">
                  {editingRow === row.id ? (
                    <input
                      type="number"
                      value={editedData.qty || row.qty}
                      onChange={handleInputChange}
                      className="w-full p-1 border rounded"
                      name="qty"
                    />
                  ) : (
                    row.qty
                  )}
                </td>
                <td className="px-4 py-2 border-b">
                  {editingRow === row.id ? (
                    <input
                      type="text"
                      value={editedData.price || row.price}
                      onChange={handleInputChange}
                      className="w-full p-1 border rounded"
                      name="price"
                    />
                  ) : (
                    row.price
                  )}
                </td>
                <td className="px-4 py-2 border-b">
                  {editingRow === row.id ? (
                    <input
                      type="text"
                      value={editedData.discountPercent || row.discountPercent}
                      onChange={handleInputChange}
                      className="w-full p-1 border rounded"
                      name="discountPercent"
                    />
                  ) : (
                    row.discountPercent
                  )}
                </td>
                <td className="px-4 py-2 border-b">
                  {editingRow === row.id ? (
                    <input
                      type="text"
                      value={editedData.discount || row.discount}
                      onChange={handleInputChange}
                      className="w-full p-1 border rounded"
                      name="discount"
                    />
                  ) : (
                    row.discount
                  )}
                </td>

                <td className="px-4 py-2 border-b">
                  {editingRow === row.id ? (
                    <input
                      type="text"
                      value={editedData.taxPercent || row.taxPercent}
                      onChange={handleInputChange}
                      className="w-full p-1 border rounded"
                      name="taxPercent"
                    />
                  ) : (
                    row.taxPercent
                  )}
                </td>

                <td className="px-4 py-2 border-b">
                  {editingRow === row.id ? (
                    <input
                      type="text"
                      value={editedData.tax || row.tax}
                      onChange={handleInputChange}
                      className="w-full p-1 border rounded"
                      name="tax"
                    />
                  ) : (
                    row.tax
                  )}
                </td>

                <td className="px-4 py-2 border-b">
                  {editingRow === row.id ? (
                    <input
                      type="text"
                      value={editedData.totalPrice || row.totalPrice}
                      onChange={handleInputChange}
                      className="w-full p-1 border rounded"
                      name="totalPrice"
                    />
                  ) : (
                    row.totalPrice
                  )}
                </td>

                <td className="px-4 py-2 border-b">
                  {editingRow === row.id ? (
                    <button
                      onClick={handleSave}
                      className="text-green-600 hover:text-green-800 mr-2"
                    >
                      <FaSave />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(row.id)}
                      className="text-blue-600 hover:text-blue-800 mr-2"
                    >
                      <FaEdit />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for mobile screens */}
      <div className="sm:hidden">
        {data.map((row) => (
          <div key={row.id} className={`mb-4 p-4 border rounded text-white`}>
            <div className="flex justify-between items-center mb-2">
              <span>S. No.: {row.id}</span>
              {editingRow === row.id ? (
                <button
                  onClick={handleSave}
                  className="text-green-600 hover:text-green-800"
                >
                  <FaSave />
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(row.id)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit />
                </button>
              )}
            </div>
            <div className="mb-2">
              <strong>Quantity:</strong>{" "}
              {editingRow === row.id ? (
                <input
                  type="text"
                  value={editedData.qty || row.qty}
                  onChange={handleInputChange}
                  className="w-full p-1 border rounded mt-1 bg-black text-white"
                  name="qty"
                />
              ) : (
                row.qty
              )}
            </div>
            <div>
              <strong>Price:</strong>{" "}
              {editingRow === row.id ? (
                <input
                  type="text"
                  value={editedData.price || row.price}
                  onChange={handleInputChange}
                  className="w-full p-1 border rounded mt-1 bg-black text-white"
                  name="price"
                />
              ) : (
                row.price
              )}
            </div>
            <div>
              <strong>Discount Percent:</strong>{" "}
              {editingRow === row.id ? (
                <input
                  type="text"
                  value={editedData.discountPercent || row.discountPercent}
                  onChange={handleInputChange}
                  className="w-full p-1 border rounded mt-1 bg-black text-white"
                  name="discountPercent"
                />
              ) : (
                row.discountPercent
              )}
            </div>
            <div>
              <strong>Discount:</strong>{" "}
              {editingRow === row.id ? (
                <input
                  type="text"
                  value={editedData.discount || row.discount}
                  onChange={handleInputChange}
                  className="w-full p-1 border rounded mt-1 bg-black text-white"
                  name="discount"
                />
              ) : (
                row.discount
              )}
            </div>
            <div>
              <strong>Tax Percent:</strong>{" "}
              {editingRow === row.id ? (
                <input
                  type="text"
                  value={editedData.taxPercent || row.taxPercent}
                  onChange={handleInputChange}
                  className="w-full p-1 border rounded mt-1 bg-black text-white"
                  name="taxPercent"
                />
              ) : (
                row.taxPercent
              )}
            </div>
            <div>
              <strong>Tax:</strong>{" "}
              {editingRow === row.id ? (
                <input
                  type="text"
                  value={editedData.tax || row.tax}
                  onChange={handleInputChange}
                  className="w-full p-1 border rounded mt-1 bg-black text-white"
                  name="tax"
                />
              ) : (
                row.tax
              )}
            </div>
            <div>
              <strong>Total Price:</strong>{" "}
              {editingRow === row.id ? (
                <input
                  type="text"
                  value={editedData.totalPrice || row.totalPrice}
                  onChange={handleInputChange}
                  className="w-full p-1 border rounded mt-1 bg-black text-white"
                  name="totalPrice"
                />
              ) : (
                row.totalPrice
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditableTable;
