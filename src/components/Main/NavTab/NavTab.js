import './NavTab.css';

function NavTab() {
  return(
    <div className='navtab'>
      <a className='navtab__button' href='#project'>О проекте</a>
      <a className='navtab__button' href='#techs'>Технологии</a>
      <a className='navtab__button' href='#aboutme'>Студент</a>
    </div>
  );
}

export default NavTab;
