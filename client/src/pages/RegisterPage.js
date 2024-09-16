export default function RegisterPage(){
        return (<>
            <div>
                <form className="register">
                    <input type="text" placeholder="Username"/>
                    <input type="password" placeholder="Password"/>
                    <button className="btn-register">Register</button>           
                </form>
            </div>
        </>);
}