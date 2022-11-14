import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import { yupResolver }from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';


const schema = yup.object().shape({
    "Company Name": yup.string().required(),
    "Company Code": yup.string().required(),
    "Company CEO": yup.string().required(),
    "Company Turnover": yup.number().min(10).required(),
    "Company Website": yup.string().url().required(),
    "Stock Exchange": yup.string().required()
});

export default function CompanyReg() {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const saveCompanyDetails = (data) => {
        console.log(data["Company Name"]);
       
        axios.post("http://localhost:8088/api/v1.0/market/register",{

        companyName : data["Company Name"],
        companyCode : parseInt(data["Company Code"]),
        companyCEO : data["Company CEO"],
        companyTurnover : parseInt(data["Company Turnover"]),
        companyWebsite : data["Company Website"],
        stockExchange: data["Stock Exchange"]
       


        })
            .then(res => {
                console.log(res);
                localStorage.isLoggedIn = true;
                window.location = "/listAllCompanies";
                alert("User Registation Successful");



            })
    .catch(e => {console.log(e)
    alert("You are not Authorized");}
            );
            
    };


    return(
        <div >
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(saveCompanyDetails)}>
                            <h2 className="companyReg">Company Registration</h2>
                                <div className="form-group">
                                    <label>Company Name: </label>
                                    <input placeholder="Enter Company Name" type="text" name="companyName" className="form-control" {...register('Company Name')} />
                                </div>
                                <p className="error-message">{ errors['Company Name']?.message }</p>

                                <div className="form-group">
                                    <label>Company Code: </label>
                                    <input placeholder="Enter Company Code"  type="number" name="companyCode" className="form-control" {...register('Company Code')} />
                                </div>
                                <p className="error-message">{ errors['Company Code']?.message }</p>

                                <div className="form-group">
                                    <label>Company CEO: </label>
                                    <input placeholder="Enter Company CEO" name="companyCeo" className="form-control" {...register('Company CEO')} />
                                </div>
                                <p className="error-message">{ errors['Company CEO']?.message }</p>

                                <div className="form-group">
                                    <label>Company Turnover (in Crore): </label>
                                    <input placeholder="Enter Company Turnover" type="number" name="companyTurnover" className="form-control" {...register('Company Turnover')} />
                                </div>
                                <p className="error-message">{ errors['Company Turnover']?.message }</p>

                                <div className="form-group">
                                    <label>Company Website: </label>
                                    <input placeholder="Enter Company Website" name="companyName" className="form-control" {...register('Company Website')} />
                                </div>
                                <p className="error-message">{ errors['Company Website']?.message }</p>

                                <div className="form-group">
                                    <label>Stock Exchange: </label>
                                    <input placeholder="Enter Stock Exchange" type="text" name="stockExchange" className="form-control" {...register('Stock Exchange')} />
                                </div>
                                <p className="error-message">{ errors['Stock Exchange']?.message }</p>

                                <div className="SubmitButton">
                                    <button className="success" type="submit">Register</button>
                                   
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <br/>
            </div>
        </div>
    );
}