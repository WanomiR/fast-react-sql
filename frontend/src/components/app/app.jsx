import React, {useState, useEffect} from "react";
import styles from './app.module.scss';
import '../../main.scss';

import api from "../utils/api";

const App = () => {

    const defaultFormDataState = {
        amount: "",
        category: "",
        description: "",
        is_income: false,
        date: ""
    }

    const [transactions, setTransactions] = useState(null)
    const [formData, setFormData] = useState(defaultFormDataState);

    const fetchTransactions = async () => {
        const response = await api.get("/transactions/");
        setTransactions(response.data)
    }

    useEffect(() => {
        fetchTransactions();
    }, []);

    // @ts-ignore
    const handleInputChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value,
        });
    };

    // @ts-ignore
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        await api.post("/transactions/", formData);
        fetchTransactions();
        setFormData(defaultFormDataState);
    }

    return (
        <div>
            <nav className={"navbar navbar-dark bg-primary"}>
                <div className={"container-fluid"}>
                    <a className={"navbar-brand"} href={"#"}>
                        Finance App
                    </a>
                </div>

            </nav>
            <div className={"container"}>
                <form onSubmit={handleFormSubmit}>
                    <div className={"mb-3 mt-3"}>
                        <label htmlFor={"amount"} className={"form-label"}>
                            Amount
                        </label>
                        <input type={"text"} className={"form-control"} id={"amount"} name={"amount"}
                               onChange={handleInputChange} value={formData.amount}/>
                    </div>

                    <div className={"mb-3"}>
                        <label htmlFor={"category"} className={"form-label"}>
                            Category
                        </label>
                        <input type={"text"} className={"form-control"} id={"category"} name={"category"}
                               onChange={handleInputChange} value={formData.category}/>
                    </div>

                    <div className={"mb-3"}>
                        <label htmlFor={"description"} className={"form-label"}>
                            Description
                        </label>
                        <input type={"text"} className={"form-control"} id={"description"} name={"description"}
                               onChange={handleInputChange} value={formData.description}/>
                    </div>

                    <div className={"mb-3"}>
                        <label htmlFor={"is_income"} className={"form-label"}>
                            Income?
                        </label>
                        <input type={"checkbox"} id={"is_income"} name={"is_income"}
                               onChange={handleInputChange} checked={formData.is_income}/>
                    </div>

                    <div className={"mb-3"}>
                        <label htmlFor={"date"} className={"form-label"}>
                            Date
                        </label>
                        <input type={"text"} className={"form-control"} id={"date"} name={"date"}
                               onChange={handleInputChange} value={formData.date}/>
                    </div>

                    <button type={"submit"} className={"btn btn-primary"}>Submit</button>

                </form>


                <table className={"table table-striped table-bordered table-hover"}>
                    <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Income?</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        transactions &&
                        // @ts-ignore
                        transactions.map((t) => (
                            <tr key={t.id}>
                                <td>{t.amount}</td>
                                <td>{t.category}</td>
                                <td>{t.description}</td>
                                <td>{t.is_income ? "Yes" : "No"}</td>
                                <td>{t.date}</td>
                            </tr>
                        ))
                    }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default App;
