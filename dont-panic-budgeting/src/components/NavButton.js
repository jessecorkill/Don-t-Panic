//Function Component for Top Navigation
export function NavButton(props){
    return(
      <div id="nav_menu">
        <button onClick={props.onClick}>Navigation Toggle</button>
        <div className={props.navState}>
          <div className="profile">
            <h5>Your Name Here</h5>
            <p>Not you?</p><button onClick={props.loginNav}>Sign out!</button>
          </div>
          <ul>
            <li><button onClick={props.editNav}>Edit Budget</button></li>
            <li><button onClick={props.budgetNav}>Budget Outlook</button></li>
          </ul>
        </div>
  
      </div>
    )
  } 