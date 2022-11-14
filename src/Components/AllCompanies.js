import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function AllCompanies() {
  
  const [stock, setStock] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const [companyData, setCompanyData] = useState([]);
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8088/api/v1.0/market/info")
      .then((res) => {console.log(res.data);
        setCompanyData(res.data)})
      .catch((e) => console.log(e.message));

    axios
      .get("http://localhost:8087/api/v1.0/market/stock/get")
      .then((res) => {console.log(res.data);
        setStockData(res.data)})
      .catch((e) => console.log(e.message));
  }, []);

  
  const handleChange = (e) => {
    if (e.target.id === "stock") {
      setStock(e.target.value);
    } else if (e.target.id === "companyName") {
      setCompanyName(e.target.value);
    } else {
      setCompanyCode(parseInt(e.target.value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      companyData.find((ele) => {
        return ele.companyName === companyName;
      }).companyCode !== companyCode
    ) {
      alert("Wrong Company Code");
    } else {
      axios
        .post("http://localhost:8087/api/v1.0/market/stock/add", {
          stock: parseFloat(stock),
          companyName: companyName,
          companyCode: companyCode,
        })
        .then((res) => {
          console.log(res.status)
        if(res.status===200){
          alert("Stock Price added Successfully");
          setCompanyCode("");
          setCompanyName("");
          setStock("");
          window.location="/listAllCompanies"
        }
      })
        .catch((err) => console.log(err));
      console.log({
        companyName: companyName,
        companyCode: companyCode,
        stock: stock,
      });
    }
  };

  return (
    <div className="App">
      <h1>All Companies</h1>
      {companyData.length > 0 ? (
        <div>
          <div>
            <table className="table table-bordered w-75 mx-auto">
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Company CEO</th>
                  <th>Compnay Code</th>
                  <th>Turnover (in Crore)</th>
                  <th>Website</th>
                  <th>Stock Exchange</th>
                  <th>Stock Price</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {companyData.map((ele1) => {
                  return (
                    <tr key={ele1.id}>
                      <td>{ele1.companyName}</td>
                      <td>{ele1.companyCEO}</td>
                      <td>{ele1.companyCode}</td>
                      <td>{ele1.companyTurnover}</td>
                      <td>{ele1.companyWebsite}</td>
                      <td>{ele1.stockExchange}</td>
                      <td>
                        {
                          stockData.findLast((ele2) => {
                            return ele2.companyCode === ele1.companyCode;
                          }) && stockData.findLast((ele2) => {
                            return ele2.companyCode === ele1.companyCode;
                          }).stock
                        }
                      </td>
                      <td>
                      {
                          stockData.findLast((ele2) => {
                            return ele2.companyCode === ele1.companyCode;
                          }) && stockData.findLast((ele2) => {
                            return ele2.companyCode === ele1.companyCode;
                          }).timeStamp
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
        </div>
      ) : (
        <p className="text-center">No Stocks To Display</p>
      )}
      <div>
            <h2>Add Stock Price</h2>
            <div className="d-flex flex-row justify-content-center align-items-center w-100 mx-auto ">
              <div className="px-2">
                <label className="px-2" htmlFor="companyName">
                  Company Name
                </label>
                <select
                  className="px-2"
                  id="companyName"
                  onChange={handleChange}
                >
                  <option value="">Search</option>
                  {companyData.map((element) => (
                    <option key={element.id} value={element.companyName}>
                      {element.companyName}
                    </option>
                  ))}
                </select>
              </div>
              <div >
                <label className="px-2" htmlFor="companyCodex">
                  Company Code
                </label>
                <select
                  className="px-2"
                  id="companyCode"
                  onChange={handleChange}
                >
                  <option value="">Search</option>
                  {companyData.map((element) => (
                    <option key={element.id} value={element.companyCode}>
                      {element.companyCode}
                    </option>
                  ))}
                </select>
              </div>
              <div className="px-2">
                <label className="px-2" htmlFor="stock">
                  Stock Price
                </label>
                <input
                  className="px-2"
                  id="stock"
                  value={stock}
                  onChange={handleChange}
                ></input>
              </div>
              
            </div>
            &nbsp;&nbsp;
            <div className="SubmitButton">
                <button className="success" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
          </div>
    </div>
  );
}

export default AllCompanies;
