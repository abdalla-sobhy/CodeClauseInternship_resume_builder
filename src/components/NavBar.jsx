import NavBarCSS from '/public/styles/navBar.module.css'
import logo from '/public/assets/logo.jpeg'
import { UserContext } from './user_context/UserContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {

    const { user } = useContext(UserContext);

    return(
        <div className={NavBarCSS.navBar}>
            <div className={NavBarCSS.navBar_contents}>
                
                <div className={NavBarCSS.logoAndUsername}>
                    <div className={NavBarCSS.logo}>
                        <img src={logo} alt='logo image'></img>
                    </div>
                    <div className={NavBarCSS.username}><h1>{user}</h1></div>
                </div>

                <div className={NavBarCSS.rightContents}>
                    <div className={NavBarCSS.homeButton}>
                    <Link to='/HOME'> <button>HOME</button> </Link>
                    </div>
                    <div className={NavBarCSS.homeButton}>
                        <Link to='/NEW'> <button>NEW</button> </Link>
                    </div>
                    <div className={NavBarCSS.homeButton}>
                        <Link to='/SHOW'> <button>SHOW</button> </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}