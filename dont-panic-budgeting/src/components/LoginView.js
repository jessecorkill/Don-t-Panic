//Function Component for Login View
export function LoginView(props){
    return(
      <div id="loginView" >
        <form className="" onSubmit="">
          <label>
            Username:
            <input type="text" value=""></input>
          </label>
          <label>
            Password:
            <input type="password" value=""></input>
          </label>
          <input type="submit" value="Submit" />
        </form>
  
  
      </div>
    )
  }