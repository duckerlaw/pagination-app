import { useEffect, useState } from 'react';
import './App.css';
import FoodComponent from './components/FoodComponent';
import MenuData from "./data/MenuData";

function App() {

  const [foodData, setFoodData] = useState(MenuData)
  const [dataInPage,setDataInPage] = useState([])
  const [page,setPage] = useState(0)

    // จำนวนเลขหน้า = ข้อมูลทั้งหมด / จำนวนรายการแต่ละหน้า
    // 14 รายการ 14/3 ได้ 5 หน้า
    // 1 = [1-3], 2 = [4-6], 3 = [7-9], 4 = [10-12], 5 = [13-14]

  const pagination = ()=> {
    const foodPerPage = 3 //แสดงรายการอาหาร 3 รายการต่อหน้า
    const pages = Math.ceil(MenuData.length / foodPerPage)
    
    const newFood = Array.from({length:pages},(data,index)=>{
      const start = index * foodPerPage // 0-2
      return MenuData.slice(start,start+foodPerPage)
    })
    return newFood
  }

  const handlePage = (index)=>{
    setPage(index)
  }

  useEffect(()=>{
    const paginate = pagination()
    setDataInPage(paginate)
    setFoodData(paginate[page])
  },[page])

  return (
    <div className="App">
      <h1>FoodCard | Pagination</h1>
      <div className="container">
        {foodData.map((data, index) => {
          return <FoodComponent key={index} {...data} />
        })}
      </div>
      <div className="pagination-container">
        {dataInPage.map((data,index)=>{
          return (
            <button 
            key={index} 
            onClick={()=>handlePage(index)} 
            className={`page-btn ${index === page ? "active-btn" : null}`}
            >{index+1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
