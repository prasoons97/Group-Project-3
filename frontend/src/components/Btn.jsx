function Btn(props) {


    return (

        <div>
        <button 
            className={props.btnClassName}
			onClick={props.onClick}
			type={props.type}
			id={props.id}>
        <span className={props.spanClassName}>{props.spanText}</span>
        
        </button>
        </div>
       
    )
    
}

export default Btn