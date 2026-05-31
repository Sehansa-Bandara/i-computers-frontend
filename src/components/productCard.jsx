

export default function ProductCard( props){

    console.log("props");

    
    return (
        <div className="bg-blue-300 w-48 h-[330,5px]">
            <img src={props.image}></img>
            <h1>{props.name}</h1>
            <p>Price:{props.price}</p>
            
       
        </div>
    );
}