import './MainPage.css';

import Form from '../Form';
import Body from '../Body';
import Header from '../Header';
import Card from '../Card';

function MainPage() {
  return (
    <div className="MainPage">
      <Header/>
      <Body/>
      <Form/>
      <Card/>
    </div>
  );
}

export default MainPage;
