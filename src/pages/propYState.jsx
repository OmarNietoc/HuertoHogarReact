import {useState} from 'react';

function Contador({valorInicial}){
    const [count,setCount] = useState(valorInicial);
    return (
        <div>
            <h2>Contador: {count}</h2>
            <button onClick={()=> setCount(count - 1)}>-</button>
            <button onClick={()=> setCount(count + 1)}>+</button>
        </div>
    );
}


export default function PropYState() {
    return <Contador valorInicial={0} />;
}
