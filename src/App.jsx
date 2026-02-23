import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then(res => res.json())
      .then(data => {
        const filtered = data.products
          .filter(prod => prod.price >= 10)
          .sort((a, b) => a.price - b.price)
          .map((prod, index) => ({ ...prod, displayId: index + 1 }))
        setProducts(filtered)
        setLoading(false)
      })
      .catch(err => {
        console.error('Fetch error:', err)
        setLoading(false)
      })
  }, [])

  const openImage = (thumbnail) => {
    window.open(thumbnail, '_blank', 'noopener,noreferrer')
  }

  if (loading) {
    return <div className="loading">Our Products</div>
  }

  return (
    <div className="app">
      <h1 className="main-title">Our Products</h1>
      
      <div className="products-container">
        <div className="products-grid">
          {products.map((prod) => (
            <div className="product-card" key={prod.id}>
              <div className="image-container">
                <img 
                  src={prod.thumbnail}
                  alt={prod.title}
                  onClick={() => openImage(prod.thumbnail)}
                  className="product-image"
                />
              </div>
              
              <div className="product-info">
                <h3 className="product-name">{prod.title}</h3>
                <div className="price-rating">
                  <span className="price">₹{prod.price}</span>
                  <span className="rating">{prod.rating ? `${prod.rating}★` : 'N/A'}</span>
                </div>
                
                <div className="policy-info">
                  <div className="policy-item">
                    <span className="policy-label">Return</span>
                    <span className="policy-value">
                      {prod.rating >= 4.3 ? '7 days' : '3 days'}
                    </span>
                  </div>
                  <div className="policy-item">
                    <span className="policy-label">Shipping</span>
                    <span className="policy-value">
                      {prod.price >= 500 ? 'Free' : '₹50'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App