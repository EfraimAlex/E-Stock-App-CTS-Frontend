import { useEffect, useState } from "react";
import axios from "axios";

export const SearchCompany = () => {
  const [companyDetails, setCompanyDetails] = useState([]);
  const [stockDetails, setStockDetails] = useState([]);
  const [searchBy, setSearchBy] = useState("");
  const [searchFor, setSearchFor] = useState("");

  let filteredStockDetails = [];
  let searchBys = [
    { id: 1, value: "CompanyName" },
    { id: 2, value: "CompanyCode" },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:8080/company")
      .then(function (response) {
        setCompanyDetails(response.data.json());
      })
      .catch(function (error) {
        console.log(error.message);
      });

    axios
      .get("http://localhost:8080/stock")
      .then(function (response) {
        setStockDetails(response.data.json());
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }, []);

  return (
    <div>
      <div>
        <div>
          <h1>Search for a Company</h1>
        </div>
        <div>
          <select onChange={(e) => setSearchBy(e.target.value)}>
            <option value="Search">Search</option>
            {searchBys.map((searchBy) => (
              <option key={searchBy.id} value={searchBy.value}>
                {searchBy.value}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => {
              setSearchFor(e.target.value);
              filteredStockDetails = stockDetails.filter((stockDetail) => {
                return stockDetail.searchBy == searchFor;
              });
            }}
          >
            <option value="Search">Search</option>
            {companyDetails.map((companyDetail) => (
              <option key={companyDetail.id} value={companyDetail.searchBy}>
                {companyDetail.searchBy}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <div>
          <h2>Stock Price Details</h2>
        </div>
        <div>
          {filteredStockDetails == 0 ? (
            <p>Select a Company</p>
          ) : (
            <table className="table-bordered">
              <thead>
                <tr>
                  <td>Company Code</td>
                  <td>Stock price</td>
                  <td>Date</td>
                  <td>Time</td>
                </tr>
              </thead>
              <tbody>
                {filteredStockDetails.map((element) => {
                  <tr>
                    <td>element.CompanyCode</td>
                    <td>element.Stock</td>
                    <td>element.Date</td>
                    <td>element.Time</td>
                  </tr>;
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
