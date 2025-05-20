import React from "react";
import "./App.css";

const AddProduct: React.FC = () => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [image, setImage] = React.useState<File | null>(null);

  async function submitForm() {
    if (!name || !description || !price) {
      alert("Please fill all fields");
      return;
    }

    const data = {
      name,
      description,
      price,
    };

    console.log("Data to be sent:", data);

    await fetch(
      "https://7kat3yi6ui.execute-api.eu-west-1.amazonaws.com/product",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          mode: "cors",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("Product added successfully");
        } else {
          alert("Error adding product");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error adding product");
      });
  }

  return (
    <div>
      <h1>Add Product</h1>
      <form>
        <div className="form-group">
          <label>Product Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = function (ev) {
                  const img = document.getElementById(
                    "preview-img"
                  ) as HTMLImageElement;
                  if (img && ev.target?.result) {
                    img.src = ev.target.result as string;
                    img.style.display = "block";
                  }
                };
                reader.readAsDataURL(file);
              } else {
                const img = document.getElementById(
                  "preview-img"
                ) as HTMLImageElement;
                if (img) {
                  img.src = "";
                  img.style.display = "none";
                }
              }
            }}
          />
          <div>
            <img
              id="preview-img"
              alt="Preview"
              style={{ maxWidth: "200px", marginTop: "10px", display: "none" }}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            name="productName"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            required
            rows={5}
            cols={40}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            min="0"
            step="0.01"
            required
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <button onClick={(e) => {
            e.preventDefault();
            submitForm();
        }}>Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
