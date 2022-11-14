import axios from "axios";
import "../App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function CompanyDetails() {
  const [companyDetails, setCompanyDetails] = useState([]);
  const [stockDetails, setStockDetails] = useState([]);
  const [searchBy, setSearchBy] = useState("");
  const [searchFor, setSearchFor] = useState("");

  const [stockDetail, setStockDetail] = useState([]);
  const [extraStockDetail, setExtraStockDetail] = useState([]);
  const [companyDetail, setCompanyDetail] = useState([]);

  let navigate = useNavigate();

  let options = [
    { id: 1, value: "companyName", label: "Company Name" },
    { id: 2, value: "companyCode", label: "Company Code" },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:8088/api/v1.0/market/info")
      .then((res) => {
        setCompanyDetails(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });

    axios
      .get("http://localhost:8087/api/v1.0/market/stock/get")
      .then((res) => setStockDetails(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    let filteredStockDetails = stockDetails.filter((stockDetail) => {
      return stockDetail[searchBy] === searchFor;
    });

    if (filteredStockDetails.length > 0) {
      const prices = filteredStockDetails.map((element) => {
        return element.stock;
      });

      setStockDetail(filteredStockDetails);

      let min = Number.MAX_VALUE,
        max = Number.MIN_VALUE,
        sum = 0;
      prices.map((price) => {
        if (max < price) max = price;
        if (min > price) min = price;
        sum = sum + price;
      });

      setExtraStockDetail([min, max, sum / prices.length]);
    }

    let filteredCompanyDetails = companyDetails.filter((companyDetail) => {
      return companyDetail[searchBy] === searchFor;
    });

    if (filteredCompanyDetails.length > 0) {
      setCompanyDetail(filteredCompanyDetails);
    }
  };

  const handleDelete = (companyCode) => {
    console.log(stockDetails);
    axios
      .delete(`http://localhost:8088/api/v1.0/market/deletee/${companyCode}`, {
        data: { companyCode: parseInt(companyCode) },
      })
      .then((res) => {
        console.log(res.status);
        alert(res.data);
        window.location = "/companyDetails";
      })

      .catch((err) => {console.log(err)
        alert("You are not Authorized");}
  );

  };

  const handleUpdate = (ele) => {
    navigate("/updateDetails", {
      state: {
        companyName: ele.companyName,
        companyCode: ele.companyCode,
        companyCEO: ele.companyCEO,
        companyTurnover: ele.companyTurnover,
        companyWebsite: ele.companyWebsite,
        stockExchange: ele.stockExchange,
      },
    });
  };

  return (
    <div>
      <div>
        <div className="heading-primary">
          <h1>Search for a Company</h1>
        </div>
        <div className="search text-center">
          <div className="search-items ">
            <label className="mx-2"> Search By&nbsp;</label>
            <select
              onChange={(e) => {
                setSearchBy(e.target.value);
              }}
            >
              <option value="Search">Search</option>
              {options.map((element) => (
                <option key={element.id} value={element.value}>
                  {element.label}
                </option>
              ))}
            </select>
          </div>
          <br />
          <div className="search-items">
            <label className="mx-2"> Search For </label>
            <select
              onChange={(e) => {
                if (searchBy === "companyName") {
                  setSearchFor(e.target.value);
                } else {
                  setSearchFor(parseInt(e.target.value));
                }
              }}
            >
              <option value="">Search</option>
              {companyDetails.map((element) => (
                <option key={element.id} value={element[searchBy]}>
                  {element[searchBy]}
                </option>
              ))}
            </select>
          </div>
          <br />
          <div className="SubmitButton">
            <button
              className="success"
              onClick={handleSubmit}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="section">
        {stockDetail.length > 0 && (
          <div>
            <div className="heading-secondary">
              <h2>Stock Price Details</h2>
            </div>
            <div className="d-flex justify-content-center">
              <table className="table w-50 table-bordered table-striped text-center">
                <thead>
                  <tr className="table-row">
                    <th className="table-data">Company Code</th>
                    <th className="table-data">Stock Price</th>
                    <th className="table-data">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stockDetail.map((ele, key) => {
                    console.log(ele.CompanyCode);
                    return (
                      <tr key={key} className="table-row">
                        <td className="table-data">{ele.companyCode}</td>
                        <td className="table-data">{ele.stock}</td>
                        <td className="table-data">{ele.timeStamp}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div>
              <div className="d-flex justify-content-center">
                <table className="table w-50 table-bordered table-striped text-center">
                  <thead>
                    <tr className="table-row ">
                      <th className="table-data">MIN</th>
                      <th className="table-data">MAX</th>
                      <th className="table-data">AVG</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {extraStockDetail.map((ele, key) => {
                        return <td key={key}>{ele}</td>;
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="section">
        {companyDetail.length > 0 && (
          <div>
            <div className="heading-secondary">
              <h2>Company Details</h2>
            </div>
            <div className="d-flex justify-content-center">
              <table className="table w-75 table-bordered table-striped">
                <thead>
                  <tr className="table-row">
                    <th className="table-data">Company Name</th>
                    <th className="table-data">Company Code</th>
                    <th className="table-data">Company CEO</th>
                    <th className="table-data">Turnover (in Crore)</th>
                    <th className="table-data">Website</th>
                    <th className="table-data">StockExchange</th>
                  </tr>
                </thead>
                <tbody>
                  {companyDetail.map((ele) => {
                    return (
                      <tr key={ele.CompanyCode} className="table-row">
                        <td className="table-data">{ele.companyName}</td>
                        <td className="table-data">{ele.companyCode}</td>
                        <td className="table-data">{ele.companyCEO}</td>
                        <td className="table-data">{ele.companyTurnover}</td>
                        <td className="table-data">{ele.companyWebsite}</td>
                        <td className="table-data">{ele.stockExchange}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {companyDetail.map((ele) => {
              return (
                <div key={ele.id} className="text-center2">
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => handleDelete(ele.companyCode)}
                  >
                    Delete
                  </button>
                  
                  <button
                    className="btn btn-primary mx-2"
                    onClick={() => handleUpdate(ele)}
                  >
                    Update
                
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default CompanyDetails;
