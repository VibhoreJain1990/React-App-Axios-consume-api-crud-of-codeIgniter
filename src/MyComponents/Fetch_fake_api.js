import "./styles.css";
import { useState, useEffect } from "react";

export default function FetchApi() {
  const [title, setTitle] = useState("good");
  const [product, setProduct] = useState(null); // State to store fetched data

  const handleChange = (e) => setTitle(e.target.value);
/*
insert kare database mein using post methodd.. 
fetch('https://fakestoreapi.com/products',{
            method:"POST",
            body:JSON.stringify(
                {
                    title: 'test product',
                    price: 13.5,
                    description: 'lorem ipsum set',
                    image: 'https://i.pravatar.cc',
                    category: 'electronic'
                }
            )
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
            
put say update kare sare fields ek saath.. 
fetch('https://fakestoreapi.com/products/7',{
            method:"PUT",
            body:JSON.stringify(
                {
                    title: 'test product',
                    price: 13.5,
                    description: 'lorem ipsum set',
                    image: 'https://i.pravatar.cc',
                    category: 'electronic'
                }
            )
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
update ke liye - patch ek bandage ki terah hai , to update few columns .. 
fetch('https://fakestoreapi.com/products/7',{
                method:"PATCH",
                body:JSON.stringify(
                    {
                        title: 'test product',
                        price: 13.5,
                        description: 'lorem ipsum set',
                        image: 'https://i.pravatar.cc',
                        category: 'electronic'
                    }
                )
            })
                .then(res=>res.json())
                .then(json=>console.log(json))

                Delete ke liye
fetch('https://fakestoreapi.com/products/6',{
            method:"DELETE"
        })
            .then(res=>res.json())
            .then(json=>console.log(json))

      
                */

  useEffect(() => {
    // Fetch data when component mounts
    fetch("https://fakestoreapi.com/products/1")
      .then((res) => res.json())
      .then((json) => setProduct(json)) // Set the fetched data to state
      .catch((err) => console.error(err)); // Handle errors
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <>
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
      </div>
      <Vibhore title={title} product={product} />{" "}
      {/* Pass product to Vibhore */}
      <input type="text" value={title} onChange={handleChange} />
    </>
  );
}

function Vibhore({ title, product }) {
  return (
    <div>
      <div>vibhore is {title}</div>
      <div>
        {product ? (
          <>
            <pre>{JSON.stringify(product, null, 2)}</pre>&nbsp;Title:{" "}
            {product.title}
            <br />
            Price:{product.price}
            <br />
            Rating Rate is {product.rating.rate}
            <img src={product.image} height="110px" widht="70px" />
          </> // Display product as JSON
        ) : (
          <p>Loading product...</p> // Loading message while fetching
        )}
      </div>
    </div>
  );
}
