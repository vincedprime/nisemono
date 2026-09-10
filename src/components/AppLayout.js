import { Link } from 'react-router-dom';

const AppLayout = ({ children }) => {
    return (
        <>
            <header className='p-3'>
                <Link to="/">
                    <img src="/assets/images/home.png" alt='home' width="48"/>
                </Link>
            </header>
            {children}
        </>
    );
}

export default AppLayout;