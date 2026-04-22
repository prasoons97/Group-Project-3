function Btn(props) {


    return (

        <div>
        <button 
            style={props.style}
            className={props.btnClassName}
			onClick={props.onClick}
			type={props.type}
			id={props.id}>
        <span className={props.spanClassName}>{props.spanText}</span>
        
          {props.children}
        </button>
        </div>
       
    )
    
}

export default Btn