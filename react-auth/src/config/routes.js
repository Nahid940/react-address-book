
import Login from "../components/Login";
import Register from "../components/Register";
import AddressSave from "../components/AddressSave";
import AddressBook from "../components/address-book/AddressBook";
import Edit from "../components/address-book/Edit";
import View from "../components/address-book/View";

const routes = [
    {
      path: '/login',
      component: Login,
      isPrivate: false,
    },
    {
        path: '/register',
        component: Register,
        isPrivate: false,
    },
    {
      path: '/',
      component: AddressBook,
      isPrivate: true,
    },
    {
        path: '/save-address',
        component: AddressSave,
        isPrivate: true,
    },
    {
      path: '/view/:id',
      component: View,
      isPrivate: true,
    },
    {
        path: '/edit/:id',
        component: Edit,
        isPrivate: true,
    },
  ];
   
   
  export default routes;