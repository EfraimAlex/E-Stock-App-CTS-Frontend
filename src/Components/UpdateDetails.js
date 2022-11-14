import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateDetails = () => {
  // const location = useLocation();
  // const navigate = useNavigate();

  // // console.log(location.state);

  // const [data, setData] = useState({
  //   companyName: location.state.companyName,
  //   companyCode: location.state.companyCode,
  //   companyCEO: location.state.companyCEO,
  //   companyTurnover: location.state.companyTurnover,
  //   companyWebsite: location.state.companyWebsite,
  //   stockExchange: location.state.stockExchange,
  // });

  // const handleChange = (e) => {
  //   let newData = { ...data };
  //   if (e.target.id === "companyTurnover" || e.target.id === "companyCode") {
  //     newData = {
  //       ...newData,
  //       [e.target.id]: parseInt(e.target.value),
  //     };
  //     setData(newData);
  //     console.log(data);
  //   } else {
  //     newData = {
  //       ...newData,
  //       [e.target.id]: e.target.value,
  //     };
  //     setData(newData);
  //     console.log(data);
  //   }
  // };
  // const handleSubmit = (e) => {
  //   axios
  //     .put(
  //       `http://localhost:8088/api/v1.0/market/updateUsers/${data.companyCode}`,
  //       { ...data }
  //     )
  //     .then((res) => {
  //       // if (res.status === 200) {
  //       // console.log(res);
  //       localStorage.isLoggedIn = true;
  //       alert("Updated Successfully!");
  //       window.location = "/companyDetails";
  //       // }
  //     })
  //     .catch((err) => {console.log(err)
  //       alert("You are not Authorized");
  //       window.location = "/companyDetails";
  //     }
  //     );
  // };
  return (
    <div>
      {/* <h1>Update Details</h1>
      <form className="d-flex flex-column align-items-center">
        <label className="m-2" htmlFor="companyName">
          Company Code&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input className="mx-2" id="companyName" value={data.companyCode} />
        </label>
        <label className="m-2" htmlFor="companyName">
          Company Name&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            className="mx-2"
            id="companyName"
            value={data.companyName}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label className="m-2" htmlFor="companyCEO">
          Company CEO&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            className="mx-2"
            id="companyCEO"
            value={data.companyCEO}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label className="m-2" htmlFor="companyTurnover">
          Company Turnover
          <input
            className="mx-2"
            id="companyTurnover"
            value={data.companyTurnover}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label className="m-2" htmlFor="companyWebsite">
          Company Website&nbsp;
          <input
            className="mx-2"
            id="companyWebsite"
            value={data.companyWebsite}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label className="m-2" htmlFor="stockExchange">
          Stock Exchange&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            className="mx-2"
            id="stockExchange"
            value={data.stockExchange}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <div className="text-center ">
          <br/>
          <button className="btn btn-primary" onClick={(e) => handleSubmit(e)}>
            Submit
          </button>
        </div>
      </form> */}
    </div>
  );
};

export default UpdateDetails;
