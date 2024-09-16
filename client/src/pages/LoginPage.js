export default function LoginPage(){
    return (<>
        <div>
            <form className="login">
                <input type="text" placeholder="Username"/>
                <input type="password" placeholder="Password"/>
                <button className="btn-login">Login</button>           
            </form>
        </div>
    </>);
}