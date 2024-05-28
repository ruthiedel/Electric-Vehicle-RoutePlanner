import {Provider} from 'react-redux'
import { store } from './car/redux/store/store'
import { RouterProvider } from 'react-router-dom';
import {router} from './car/router/Router'
import InitializeAuth from './car/auth/InitializeAuth';
function App  ()  {


  return (
    <>
     <Provider store={store}>
        <InitializeAuth>
          <RouterProvider router={router} />
        </InitializeAuth>
      </Provider> 
   
    
    </>
  );
};


export default App;
 