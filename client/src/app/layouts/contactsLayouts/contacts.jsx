import React from "react";
import Breadcrumb from "../../components/pageUi/breadcrumb";
import ContactsPage from "../../page/contactsPage/contactsPage";
const Contacts = () => {
    return (
        <div>
            <Breadcrumb header="Контакты" />
            <ContactsPage />
        </div>
    );
};
export default Contacts;
