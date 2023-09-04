import Logo from './logo/Logo';
import Nav from './nav/Nav';
import UserMenu from './userMenu/UserMenu';

const Header = () => {
  return (
    <header>
      <div
        className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'
        aria-label='Global'
      >
        <Logo />
        <Nav />
        <UserMenu />
      </div>
    </header>
  );
};

export default Header;
