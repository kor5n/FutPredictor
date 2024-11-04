import "../assets/header.css"

export default function Header(){
    return(
        <header className="site-header">
            <div className="site-identity">
                <h1><a href="/">Futpredictor</a></h1>
            </div>  
        <nav className="site-navigation">
        <ul className="nav">
            <li><a className="link-page" href="/predict">Predictor</a></li> 
            <li><a className="link-page" href="/ratings">Database</a></li> 
        </ul>
        </nav>
        </header>
    )
}