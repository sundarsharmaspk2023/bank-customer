import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerList from "./page/CustomerList";
import CustomerForm from "./page/CustomerForm";
import CustomerBeneficiaryList from "./page/CustomerBeneficiary";
import CustomerBeneficiaryForm from "./page/CustomerBeneficiaryForm";
import NotFound from "./page/NotFound";
import ViewBeneficiary from "./page/ViewBeneficiary";
import EditBeneficiary from "./page/EditBeneficiary";
// import BeneficiaryList from "./components/BeneficiaryList";
// import AddBeneficiaryForm from "./components/AddBeneficiaryForm";
// import EditBeneficiaryForm from "./components/EditBeneficiaryForm";
// import ViewBeneficiaryDetails from "./components/ViewBeneficiaryDetails";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/bank-customer" element={<CustomerList />}></Route>
          <Route path="/customerForm" element={<CustomerForm />}></Route>
           <Route path="/beneficiaries" element={<CustomerBeneficiaryList />} />
           <Route path="/beneficiariesForm" element={<CustomerBeneficiaryForm />} />
           <Route path="/viewBeneficiaries" element={<ViewBeneficiary />} />
           <Route path="/editBeneficiaries" element={<EditBeneficiary />} />
           <Route path="*" element={<NotFound />} />
          {/* <Route path="/beneficiaries/add" element={<AddBeneficiaryForm />} /> */}
          {/* <Route path="/beneficiaries/edit/:id" element={<EditBeneficiaryForm />} />
          <Route path="/beneficiaries/view/:id" element={<ViewBeneficiaryDetails />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;