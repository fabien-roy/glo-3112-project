import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'router/Router';
import { routes } from 'router/Config';
import MainLayout from './layouts/MainLayout';
// import withS3 from './hoc/withEditableAvatar';
import { EditUserAvatar } from './components/users/EditUserAvatar';

function App() {
  // const ConnectedEditUserAvatar = withEditableAvatar(EditUserAvatar);

  return (
    <BrowserRouter>
      <MainLayout>
        <Router routes={routes} />
      </MainLayout>
      <EditUserAvatar
        src="https://test--omar.s3.ca-central-1.amazonaws.com/avatars/4742873-fc20-7f3-8048-f8d63cdeaf.jpg"
        username="Test"
      />
    </BrowserRouter>
  );
}

export default App;
