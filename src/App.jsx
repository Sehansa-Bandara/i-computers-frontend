

import './App.css'
import ProductCard from './components/productCard'
import { FaHome } from "react-icons/fa";

function App() {
  

  return (
    <div>

      <ProductCard name="Apple iPhone 16" price="$100" image="https://cdn.mos.cms.futurecdn.net/9NBkv3aU32TaXbPobku4hS-1920-80.jpg"></ProductCard>
      <ProductCard name="Apple macbook pro " price="$200" image="https://www.techspot.com/images/products/2023/laptops/org/2023-03-27-product-j_1100.webp"></ProductCard>
      <ProductCard name="Apple watch series 11" price="$250" image="https://lamanzanamordida.net/app/uploads-lamanzanamordida.net/2025/09/Apple-Watch-Series-11.jpg"></ProductCard>
      <FaHome className="text-4xl" />
    </div>
  )
}

export default App
